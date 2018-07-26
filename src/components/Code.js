import React from 'react';
import Prism from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-java';
import 'prismjs/themes/prism.css';

class Code extends React.Component {

  // Element Reference
  codeRef = React.createRef();

  componentDidMount() {
    console.log(this);
  }

  componentWillMount() {
    console.log(this, this.codeRef);
    this.highlight();
  }

  componentDidUpdate() {
    this.highlight();
  }

  highlight = () => {
    const lang = this.props.language.toLowerCase();
    // Prism.highlight(this.codeRef, Prism.language[lang], lang);
  }

  render() {
    return (
      <code>{this.props.content}</code>
    );
  }
}

export default Code;
