import { Modal } from "react-bootstrap";
import React from "react";

interface IBlurredModalProps {
  handleClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const BlurredModal: React.FC<IBlurredModalProps> = ({
  handleClose,
  title,
  children,
}) => {
  return (
    <Modal
      show={true}
      onHide={handleClose}
      centered
      dialogClassName="blurred-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title ? title : "Заголовок модального окна"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default BlurredModal;
