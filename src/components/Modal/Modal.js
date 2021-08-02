import { Component } from "react";
import PropTypes from "prop-types";

import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  state = {};

  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };
  componentDidMount() {
    window.addEventListener("keydown", this.handleEscape);
  }

  handleEscape = (event) => {
    if (event.code === "Escape") {
      this.props.toggleModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEscape);
  }

  handleBackdrop = (event) => {
    if (event.target === event.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    return createPortal(
      <div className={styles.backdrop} onClick={this.handleBackdrop}>
        <div className={styles.content}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
