import React from 'react';
import firebase from 'firebase';
import Axios from 'axios';
// import GitHub from 'github-api';
import { firebaseApp } from './helpers/firebase';
import Profile from './components/Profile';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    detail: null
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ isLoaded: true })
        this.authHandler({user});
      }
    })
  }


  /**
   * Github Authentication
   * @return {void}
  */
  authenticate = () => {
    // 1. Create an insance of the Github provider
    const provider = new firebase.auth.GithubAuthProvider();
    // 2. Set Persistence to SESSSION
    // Indicates that state persist in the current or session or tab
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    // 2. Set scopes that you want to request from Github
    provider.addScope('user gist');
    // 3. Authenticate with Firebase using the Githubprovider
    firebaseApp.auth().signInWithPopup(provider)
      .then(this.authHandler)
      .catch(error => { console.error(error.code, error.message); });
  };


  /**
   * Handle Authenticate response
   * @return {void}
   */
  authHandler = async (data) => {
    const { user, credential } = data;

    if (data.credential) {
      const { accessToken } = credential;
      const keyname = `firebase:authUser:${user.l}:STORAGE`;
      localStorage.setItem(keyname, JSON.stringify(credential));
    }

    this.setState({ user });

    await this.handleUser();
  };


  /**
   * Handle Authenticate response
   * @return {void}
   */
  handleUser = () => {
    const { l } = this.state.user;
    const key = `firebase:authUser:${l}:STORAGE`;
    const { accessToken } = JSON.parse(localStorage.getItem(key));

    Axios.get(`https://api.github.com/user`, {
      params: { access_token: accessToken }
    }).then(async ({ data }) => {
      await this.setState({ detail: data, isLoggedIn: true, isLoaded: false });
    });
  }

  logOut = async () => {
    const { l } = this.state.user;
    const key = `firebase:authUser:${l}:STORAGE`;

    await firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem(key);

        this.setState({
          isLoggedIn: false,
          user: null,
          detail: null
        });
      });
  }

  render() {

    if (!this.state.isLoggedIn) {
      return (
        <aside className="welcome">
          <div className="logo">
            <span className="icon">
              <i className="fas fa-code fas-3x"></i>
            </span>
          </div>
          <button className="button is-medium is-dark has-icons-left" onClick={this.authenticate}>
            <span className="icon is-medium is-left">
              <i className="fab fa-github"></i>
            </span>
            <span>Login with Github</span>
          </button>
        </aside>
      );
    }

    return <Profile {...this.state} logout={this.logOut} />;
  }
}

export default App;
