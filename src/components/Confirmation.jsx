/* eslint-disable no-unused-vars */
// ConfirmationModal.jsx
import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types'

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Confirmation</h2>
      <p>{message}</p>
      <div className="modal-actions">
        <button onClick={onConfirm} className="confirm-button">Confirm</button>
        <button onClick={onRequestClose} className="cancel-button">Cancel</button>
      </div>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
  };

export default ConfirmationModal;
