import { Component } from "react";

import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  state = {};

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
