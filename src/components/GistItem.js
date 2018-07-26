import React from 'react';

class GistItem extends React.Component {
  state = {
    activeIndex: 0
  }

  loadGist = (e) => {
    e.preventDefault();

    this.props.loadGist(this.props.index);
  }

  render() {
    const { description, files } = this.props.gist;
    const first_title = Object.keys(files)[0];

    return (
      <a href="javascript:;"
        className={`panel-block panel-block--gists ${this.is_active}`}
        onClick={this.loadGist}
      >
        <span className="panel-icon">
          <i className="far fa-file-code" aria-hidden="true"></i>
        </span>
        <span className="panel-block__text">
          <strong>{first_title}</strong>
          <span className="has-text-grey-light is-truncated">{description}</span>
        </span>
      </a>
    );
  }
}

export default GistItem;
