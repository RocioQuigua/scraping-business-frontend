import React from "react";

import { Form, Button, Input, Select } from "antd";

import { InputCustom } from "../../components/atoms/InputCustom/InputCustom";

export const Business = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.error("Values", values);
  };

  const business = [
    "Seleccionar una opcion",
    "Lacteos",
    "Agropecuario",
    "Pesquero",
    "Turismo",
  ];

  return (
    <div className="business">
      <div className="business__info">
        <Form onFinish={onFinish} form={form}>
          <h1 className="business__titlep">Información empresarial</h1>
          <label className="business__title">
            Nombre de la empresa
            <strong className="business__title business__title--s">*</strong>
          </label>
          <Form.Item name="nameBusiness">
            <InputCustom className="business__input" />
          </Form.Item>
          <label className="business__title">Nit</label>
          <Form.Item name="nitBusiness">
            <Input className="business__input" maxLength={10} />
          </Form.Item>
          <label className="business__title">
            Tipo de negocio
            <strong className="business__title business__title--s">*</strong>
          </label>
          <Form.Item name="typeBusiness">
            <Select className="business__options" defaultValue={business[0]}>
              {business.map((busines, index) => (
                <Select.Option key={index}>{busines}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() => (
              <Button
                className="business__button"
                type="primary"
                htmlType="submit"
                block
              >
                Actualizar datos
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
