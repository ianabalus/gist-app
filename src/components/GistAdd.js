import React from 'react';
import PropTypes from 'prop-types';
import File from './File';
import { getFieldset, convertFieldsetDataToJSON } from '../helpers/forms';

class GistAdd extends React.Component {
  state = {
    no_of_files: 0, // set default value to 1
    files: [],
    disabled: false
  };

  // Reference creation
  descriptionRef = React.createRef();

  static propTypes = {
    createGist: PropTypes.func,
    toggleGist: PropTypes.func
  };

  componentWillMount() {
    this.addFile();
  }

  addFile = () => {
    this.setState(prevState => ({
      no_of_files: parseInt(prevState.no_of_files)+1,
      files: [...this.state.files, (parseInt(prevState.no_of_files))]
    }));
  }

  removeFile = (id) => {
    const files = this.state.files.filter(index =>  index !== id);
    this.setState({ files, no_of_files: this.state.no_of_files - 1 });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    e.persist();

    this.setState({ disabled: !this.state.disabled });

    const fieldsets = getFieldset(e.target.elements);
    const files = convertFieldsetDataToJSON(fieldsets);
    const gist = {
      public: true,
      description: this.descriptionRef.current.value,
      files
    };

    this.props.createGist(gist, () => {
      this.setState({ disabled: !this.state.disabled });
    })
  }

  render() {
    return (
      <section className="gist-new">
        <h1 className="title">Create gist</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="field">
            <div className="control">
              <input className="input" ref={this.descriptionRef} type="text" placeholder="Gist description..." />
            </div>
          </div>
          <div className="field">
            {this.state.files.map(key =>
              <File key={key} index={key} removeFile={this.removeFile} length={this.state.no_of_files} />
            )}
          </div>
          <div className="field is-grouped is-grouped-right">
            <p className="control control-left">
              <button className="button" type="button" onClick={this.addFile} disabled={this.state.disabled}>Add file</button>
            </p>
            <p className="control">
              <button className="button" type="button" onClick={this.props.toggleGist} disabled={this.state.disabled}>Cancel</button>
            </p>
            <p className="control">
              <button className="button is-link" type="submit" disabled={this.state.disabled}>Create public gist</button>
            </p>
          </div>
        </form>
      </section>
    );
  }
}

export default GistAdd;
