import React from 'react';
import PropTypes from 'prop-types';
import File from './File';

class GistEdit extends React.Component {

  states = {
    no_of_files: 1
  };

  static propTypes = {
    description: PropTypes.string,
    files: PropTypes.object,
    toggleGist: PropTypes.func
  };

  render() {
    const { description, files, toggleGist } = this.props.gist;

    return (
      <section className="gist-new">
        <h1 className="title">Edit Gist</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="field">
            <div className="control">
              <input className="input" type="text" placeholder="Gist description..." value={description} onChange={e => console.log(e)} />
            </div>
          </div>
          <div className="field">
            {Object.keys(files).map((key, index) => (
              <File key={index} index={index} filename={key} content={files[key].content} />
            ))}
          </div>
          <div className="field is-grouped is-grouped-right">
            <p className="control control-left">
              <button className="button" type="button">Add File</button>
            </p>
            <p className="control">
              <button className="button" type="button" onClick={toggleGist}>Cancel</button>
            </p>
            <p className="control">
              <button className="button is-link" type="submit">Update public gist</button>
            </p>
          </div>
        </form>
      </section>
    );
  }
}

export default GistEdit;
