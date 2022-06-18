import React, { useEffect } from "react";
import { Form, Button, Input, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { InputCustom } from "../../components/atoms/InputCustom/InputCustom";
import { user as UserActions } from "../../services/User/UserActions";

export const Profile = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { profile, loading, success } = useSelector((state) => state.user);

  useEffect(() => {
    if (success.updateProfile) {
      message.success('Actualizacion exitosa!')
      dispatch(UserActions.setSuccess('updateProfile', undefined))
    }
  }, [success.updateProfile, dispatch]);

  useEffect(() => {
    if (profile)
      form.setFieldsValue({
        name: profile.person.name,
        lastname: profile.person.lastname,
        phone: profile.person.phone,
        email: profile.email,
      });
  }, [profile, form]);

  const onFinish = (values) => {
    dispatch(UserActions.updateProfile(values));
  };

  const isChange = () => {
    const { name, lastname, phone, email } = form.getFieldsValue();
    return (
      name !== profile?.person.name ||
      lastname !== profile?.person.lastname ||
      phone !== profile?.person.phone ||
      email !== profile?.email
    );
  };

  return (
    <div className="profile">
      <div className="profile__info">
        <Form onFinish={onFinish} form={form}>
          <h1 className="profile__titlep">Información personal</h1>
          <label className="profile__title">
            Nombres
            <strong className="profile__title profile__title--s">*</strong>
          </label>
          <Form.Item name="name" rules={[{ required: true, message: "" }]}>
            <InputCustom />
          </Form.Item>
          <label className="profile__title">
            Apellidos
            <strong className="profile__title profile__title--s">*</strong>
          </label>
          <Form.Item name="lastname" rules={[{ required: true, message: "" }]}>
            <InputCustom />
          </Form.Item>
          <label className="profile__title">
            Celular
            <strong className="profile__title profile__title--s">*</strong>
          </label>
          <Form.Item name="phone" rules={[{ required: true, message: "" }]}>
            <Input className="profile__input" maxLength={10} />
          </Form.Item>
          <label className="profile__title">
            Correo
            <strong className="profile__title profile__title--s">*</strong>
          </label>
          <Form.Item name="email" rules={[{ required: true, message: "" }]}>
            <InputCustom placeholder="example@tucorreo.com" />
          </Form.Item>
          <label className="profile__title">
            Contraseña
            <strong className="profile__title profile__title--s">*</strong>
          </label>
          <Form.Item name="password">
            <Input.Password
              className="profile__input"
              placeholder="********"
              disabled
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() => (
              <Button
                className="profile__button"
                type="primary"
                htmlType="submit"
                disabled={
                  !isChange() ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length > 0
                }
                block
              >
                {loading.updateProfile && <LoadingOutlined />}
                {!loading.updateProfile && "Actualizar datos"}
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
