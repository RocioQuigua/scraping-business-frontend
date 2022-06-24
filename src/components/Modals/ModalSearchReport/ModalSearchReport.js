import { Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { modal as ModalActions } from "../../../services/Modal/ModalActions";
import { BardChart } from "./Charts/BardChart";
import { DoughnutChart } from "./Charts/DoughnutChart";

export const ModalSearchReport = () => {
  const { filters } = useSelector((state) => state.search);

  const {
    modals: { modalSearchReport },
  } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(ModalActions.setModal("modalSearchReport", false, undefined));
  };

  return (
    <Modal
      className="modal-search-report"
      wrapClassName="modal-search-report__wrap"
      visible={modalSearchReport}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={handleClose}
      closable={false}
      centered
    >
      <h1>📊 Reporte de resultados</h1>
      <div className="modal-search-report__content">
        <BardChart
          className="modal-search-report__bard"
          labelName="Publicaciones"
          labels={filters?.years.map((item) => item.name)}
          values={filters?.years.map((item) => item.value)}
        />
        <div className="modal-search-report__row">
          <DoughnutChart
            className="modal-search-report__bard"
            labelName="Publicaciones"
            labels={filters?.languages.map((item) => item.name)}
            values={filters?.languages.map((item) => item.value)}
          />
        </div>
      </div>
    </Modal>
  );
};
