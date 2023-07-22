import React from "react";
import ModalPortal from "./components/modal.portal";

const ConfirmDeleteEventModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <ModalPortal wrapperId="confirm-delete-event-modal">
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Видалити це змагання?</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <p>Ви впевнені що хочете видалити дане змагання?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Ні, я передумав
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onConfirm}
              >
                Так, я впевнений
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ConfirmDeleteEventModal;
