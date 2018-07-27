import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {

  static propTypes = {
    show: PropTypes.bool,
    children: PropTypes.element,
    closeModal: PropTypes.func
  };

  render() {
    const is_active = this.props.show ? 'is-active' : 'is-show';

    return (
      <div className={`modal ${is_active}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            {this.props.children}
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={this.props.closeModal}></button>
      </div>
    );
  }
}

export default Modal;
