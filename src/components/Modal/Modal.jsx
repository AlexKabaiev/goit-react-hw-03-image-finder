import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }
  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };
  render() {
    const { url, close } = this.props;
    const { closeModal } = this;
    return (
      <div className={css.overlay} onClick={closeModal}>
        <div className={css.modal}>
          <button onClick={close} className={css.close} type="button">
            X
          </button>
          <img src={url} alt="img" />
        </div>
      </div>
    );
  }
}
export default Modal;
Modal.propTypes = {
  url: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};
