import { Button, Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { modal as ModalActions } from '../../../services/Modal/ModalActions';

export const AlertMessage = () => {

  const { modals: { alertMessage }, params: { alertMessage: params }} = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(ModalActions.setModal('alertMessage', false, undefined))
  };

  return (
    <Modal
      className="alert-message"
      visible={alertMessage}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={handleClose}
      closable={false}
      centered
    >
      <h1 className="alert-message__title">{params?.title}</h1>
      <div className="alert-message__actions">
        <Button type="link" onClick={handleClose}  block>
          Volver
        </Button>
        <Button type="primary" onClick={params?.onClick} block>
          Si, continuar
        </Button>
      </div>
    </Modal>
  );
};
