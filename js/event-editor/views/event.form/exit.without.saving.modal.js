import React from "react";
import ModalPortal from "./components/modal.portal";

const ExitWithoutSavingModal = ({
  isOpen,
  onCloseWindow,
  onExitWithoutSaving,
  onSave,
}) => {
  if (!isOpen) return null;
  return (
    <ModalPortal wrapperId="exit-without-saving-modal">
      <div
        className="modal fade show"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Зберегти зміни?</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onCloseWindow}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Схоже Ви маєте не збережені зміни в цій формі. Якщо ви закриєте
                форму ці зміни будуть втрачені!
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onExitWithoutSaving}
              >
                Закрити
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSave}
              >
                Зберегти
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ExitWithoutSavingModal;
