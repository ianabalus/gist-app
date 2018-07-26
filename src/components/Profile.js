import React from 'react';
import GitHub from 'github-api';
import Card from './Card';
import Gists from './Gists';
import GistFile from './GistFile';
import GistAdd from './GistAdd';
import GistEdit from './GistEdit';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    const { l } = this.props.user;
    const key = `firebase:authUser:${l}:STORAGE`;
    const { accessToken } = JSON.parse(localStorage.getItem(key));

    this.GH = new GitHub({ token: accessToken });
    this.USER = this.GH.getUser();
    this.GIST = this.GH.getGist();
  }

  state = {
    accessToken: null,
    gists: [],
    gist: {},
    activeIndex: 0,
    isList: true,
    isEditing: false
  };


  /**
   * Load all gists before mounting the component
   * @return {void}
   */
  componentWillMount() {
    this.loadAllGists();
  }


  /**
   * Get all user's Gist
   * 1. Will fetch all gists from Github's API
   * 2. Pass its data to gists state
   * 3. Load the first gist
   * @return {Object}
   */
  loadAllGists = () => {
    this.USER.listGists()
      .then(async ({data}) => {
        this.setState({ gists: data });
        await this.loadGist();
      });
  };


  /**
   * Fetch a single gist
   * @return {Object}
   */
  loadGist = (index = this.state.activeIndex) => {
    const _id = this.state.gists[index].id;

    fetch(`https://api.github.com/gists/${_id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ gist: data, activeIndex: index, isList: true, isEditing: false });
        this.GIST.__id = _id;
      });
  };


  /**
   * Create a new gist.
   * 1. New gist should have one or more file
   * 2. Will load the newly created gist
   * @return {Object}
   */
  createGist = (gist = {}) => {
    // Format data
    gist = {
       public: true,
       description: 'Two files',
       files: {
          "hello.test": {
             content: "// Test comment\nbody { background-color: white; }",
           },
          "norman-is-in.love": {
             content: "// Norman is in love ❤️\nbody { background-color: white; }"
          }
       }
    };

    // Send request to GitHub API
    this.GIST.create(gist)
      .then(({data}) => {
        console.log(data);
        // Make sure the created gist will be added to the beginning of the array
        this.setState({ gists: [data, ...this.state.gists]});
        // Load the created gist
        this.loadGist(0);
      });
  };


  /**
   * Edit a gist.
   * @return {void}
   */
  editGist = (id) => {
    this.setState({ isEditing: true });
    // console.log(id);
  };


  /**
   * Delete a gist.
   * Once the current gist is deleted,
   * will automatically load the previous gist.
   * @return {void}
   */
  deleteGist = () => {
    this.GIST.delete()
      .then(() => {
        const gists = this.state.gists.filter(gist => gist.id !== this.GIST.__id);
        const index = this.state.activeIndex > 0 ? this.state.activeIndex - 1 : 0;
        // Remove the deleted gist from the gist's state
        // This will pass the new array without the deleted gist
        this.setState({ gists });
        // Load the previous gist from the array
        this.loadGist(index);
      });
  };


  /**
   * Enabled/disabled the add new button
   * @return {void}
   */
  toggleGist = () => {
    this.setState({ isList: true, isEditing: false })
  }


  render() {
    let view = null;
    if (this.state.gist !== null && this.state.isList) {
      const { files, description } = this.state.gist;
      const title = files ? Object.keys(files)[0] : null;
      const _files = files ? files : {};

      if (this.state.gists.length > 0) {
        view = <GistFile files={_files} title={title} description={description} gist={this.state.gist} editGist={this.editGist} deleteGist={this.deleteGist} />
      } else {
        view = <div><h2 className="title">No gists yet.</h2></div>
      }
    }

    if (!this.state.isList) {
      view = <GistAdd toggleGist={this.toggleGist} createGist={this.createGist} gists={this.state.gists} />
    }

    if (this.state.isList && this.state.isEditing) {
      view = <GistEdit toggleGist={this.toggleGist} gist={this.state.gist} />
    }

    return (
      <React.Fragment>
        <div className="navbar has-background-grey-darker" role="navigation" aria-label="main navigation">
          <div className="container is-widescreen">
            <div className="navbar-brand">
              <span className="icon">
                <i className="fas fa-code fa-2x has-text-white" aria-hidden="true"></i>
              </span>
            </div>
            <div className="field is-grouped is-grouped-right">
              <p className="control">
                <button className="button" onClick={() => this.setState({ isList: false })} disabled={!this.state.isList}>Add New Gist</button>
              </p>
              <p className="control">
                <button className="button is-danger" onClick={this.props.logout}>Log out</button>
              </p>
            </div>
          </div>
        </div>
        <div className="main container is-widescreen">
          <div className="columns">
            <div className="column is-4">
              <div className="column">
                <Card detail={this.props.detail} />
              </div>
              <div className="column is-sticky">
                <Gists gists={this.state.gists} loadGist={this.loadGist} />
              </div>
            </div>
            <div className="column is-8">
              <div className="column">
                {view}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
