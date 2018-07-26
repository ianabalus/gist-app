import React from 'react';
import PropTypes from 'prop-types';
// import Prism from 'prismjs';

class GistFile extends React.Component {
  codeRef = React.createRef();

  static propTypes = {
    filename: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
    raw_url: PropTypes.string
  };

  render() {
    // language should be added
    const { filename, type, content, raw_url } = this.props;
    const file_type = `language-${type.toLowerCase()}`;

    return (
      <nav className="panel">
        <div className="panel-heading is-sticky">
          <span className="panel-icon">
            <i className="fas fa-code" aria-hidden="true"></i>
          </span>
          <strong>{filename}</strong>
          <a href={raw_url} target="_blank" className="button is-small">RAW</a>
        </div>
        <div className="panel-block">
          <pre className={file_type}>
            <code ref={this.codeRef}>{content}</code>
          </pre>
        </div>
      </nav>
    );
  }
}

export default GistFile;
