import React from 'react';
import PropTypes from 'prop-types';
import GistPanel from './GistPanel';

const GistFile = (props) => {
  const { title, description, files, gist, deleteGist, editGist } = props;

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
              <button className="button" onClick={() => editGist(gist.id)}>Edit</button>
            </p>
            <p className="control">
              <button className="button is-danger" onClick={() => deleteGist(gist.id)}>Delete</button>
            </p>
          </div>
        </div>
      </section>
      {Object.keys(files).map((key, index) => <GistPanel key={index} {...files[key]} />)}
    </section>
  );
};

GistFile.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  files: PropTypes.object,
  gist: PropTypes.object,
  deleteGist: PropTypes.func,
  editGist: PropTypes.func
};

export default GistFile;
