import React, { useEffect } from "react";
import { Form, Button, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { InputCustom } from "../../components/atoms/InputCustom/InputCustom";
import { user as UserActions } from "../../services/User/UserActions";
import { LoadingOutlined } from "@ant-design/icons";

export const Business = () => {
  const dispatch = useDispatch();
  const { loading, business, success } = useSelector((state) => state.user);
  const [form] = Form.useForm();

  useEffect(() => {
    if (success.updateBusiness) {
      message.success("Actualización exitosa!");
      dispatch(UserActions.setSuccess("updateBusiness", undefined));
    }
  }, [success.updateBusiness, dispatch]);

  useEffect(() => {
    if (business)
      form.setFieldsValue({
        name: business.name,
        nit: business.nit,
      });
  }, [business, form]);

  const onFinish = (values) => {
    dispatch(UserActions.updateBusiness(values));
  };

  return (
    <div className="business">
      <div className="business__info">
        <Form onFinish={onFinish} form={form}>
          <h1 className="business__titlep">Información empresarial</h1>
          <label className="business__title">Nombre de la empresa</label>
          <Form.Item name="name">
            <InputCustom className="business__input" />
          </Form.Item>
          <label className="business__title">Nit</label>
          <Form.Item name="nit">
            <Input className="business__input" maxLength={10} />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() => (
              <Button
                className="business__button"
                type="primary"
                htmlType="submit"
                block
              >
                {!loading.updateBusiness && "Actualizar datos"}
                {loading.updateBusiness && <LoadingOutlined />}
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
