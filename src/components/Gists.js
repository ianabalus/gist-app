import React from 'react';
import GistItem from './GistItem';

class Gists extends React.Component {
  render() {
    let button = null;

    /**
     * Show button if gists is more than 5 items
     * This will change the styling of the container to scroll
     *
     * By default, the public gists are displayed;
    */
    if (this.props.gists.length > 5) {
      button = <div className="panel-block">
        <button className="button is-dark is-fullwidth">show all gists</button>
      </div>
    }

    return (
      <nav className="panel has-background-white">
        <p className="panel-heading">your gists</p>
        {this.props.gists.map((gist, index) => (
          <GistItem key={index} index={index} activeIndex={this.props.activeIndex} gist={gist} loadGist={this.props.loadGist} />
        ))}
        {button}
      </nav>
    );
  }
}

export default Gists;
