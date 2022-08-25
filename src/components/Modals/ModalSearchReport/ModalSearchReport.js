import { Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { modal as ModalActions } from "../../../services/Modal/ModalActions";
import { BardChart } from "./Charts/BardChart";
import { DoughnutChart } from "./Charts/DoughnutChart";

export const ModalSearchReport = () => {
  const { filters, publications } = useSelector((state) => state.search);

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
      //closable={false}
      centered
    >
      <h1>📊 Graficos</h1>
      <div className="modal-search-report__content">
        <BardChart
          className="modal-search-report__bard"
          labelName={`Publicaciones (${publications?.length})`}
          labels={filters?.years.map((item) => item.name)}
          values={filters?.years.map((item) => item.value)}
        />
        <div className="modal-search-report__row">
          <DoughnutChart
            className="modal-search-report__bard"
            labels={filters?.languages.filter(item => item.name !== 'undefined').map((item) => `${item.name} (${item.value})`)}
            values={filters?.languages.filter(item => item.name !== 'undefined').map((item) => item.value)}
          />
          <DoughnutChart
            className="modal-search-report__bard"
            labels={filters?.origins.filter(item => item.name !== 'undefined').map((item) => `${item.name} (${item.value})`)}
            values={filters?.origins.filter(item => item.name !== 'undefined').map((item) => item.value)}
          />
        </div>
      </div>
    </Modal>
  );
};
