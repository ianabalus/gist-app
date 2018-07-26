import React from 'react';
import GistPanel from './GistPanel';

class GistFile extends React.Component {
  render() {
    const { title, description, files, gist, deleteGist, editGist } = this.props;

    return (
      <section className="gist-file">
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">{title}</h1>
              <h2 className="subtitle">{description}</h2>
            </div>
            <div className="field is-grouped">
              <p className="control">
                <button className="button" onClick={() => editGist(gist.id)}>
                  {/* <span className="icon is-small">
                    <i className="far fa-edit"></i>
                  </span> */}
                  <span>Edit</span>
                </button>
              </p>
              <p className="control">
                <button className="button is-danger" onClick={() => deleteGist(gist.id)}>
                  {/* <span className="icon is-small">
                    <i className="far fa-trash-alt"></i>
                  </span> */}
                  <span>Delete</span>
                </button>
              </p>
            </div>
          </div>
        </section>
        {Object.keys(files).map((key, index) => <GistPanel key={index} {...files[key]} />)}
      </section>
    );
  }
}

export default GistFile;
