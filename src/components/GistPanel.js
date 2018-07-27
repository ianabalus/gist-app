import React from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight';

class GistFile extends React.Component {

  static propTypes = {
    filename: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
    raw_url: PropTypes.string
  };

  render() {
    // language should be added
    const { filename, type, content, raw_url } = this.props;
    const file_type = type !== null ? `${type.toLowerCase()}` : 'text/html';

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
          <Highlight className={file_type}>
            {content}
          </Highlight>
        </div>
      </nav>
    );
  }
}

export default GistFile;
