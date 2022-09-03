import React, { useEffect } from "react";
import { Form, Button, Input, message, Select } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { InputCustom } from "../../components/atoms/InputCustom/InputCustom";
import { CustomButton } from "../../components/atoms/CustomButton/CustomButton";
import { user as UserActions } from "../../services/User/UserActions";

const MAX_LENGTH_PHONE = 10;

export const Profile = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { profile, loading, success, error } = useSelector(
    (state) => state.user
  );
  const { categories } = useSelector((state) => state.utils);

  useEffect(() => {
    if (error.updateProfile) {
      message.error(error.updateProfile.detail);
      dispatch(UserActions.setError("updateProfile", undefined));
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success.updateProfile) {
      message.success("Actualización exitosa!");
      dispatch(UserActions.setSuccess("updateProfile", undefined));
    }
  }, [success.updateProfile, dispatch]);

  useEffect(() => {
    if (profile)
      form.setFieldsValue({
        name: profile?.person.name,
        lastname: profile?.person.lastname,
        phone: profile?.person.phone,
        email: profile?.email,
        categoryId: profile?.category?.id,
      });
  }, [profile, form]);

  const onFinish = (values) => {
    values.categoryId = parseInt(values.categoryId);
    dispatch(UserActions.updateProfile(values));
  };

  const isChange = () => {
    const { name, lastname, phone, email, categoryId } = form.getFieldsValue();
    return (
      name !== profile?.person?.name ||
      lastname !== profile?.person?.lastname ||
      phone !== profile?.person.phone ||
      email !== profile?.email ||
      categoryId !== profile?.category?.id
    );
  };

  const validatorMinPhone = ({ getFieldValue }) => ({
    validator(rule, value) {
      if (
        !value ||
        getFieldValue("phone").toString().length === MAX_LENGTH_PHONE
      )
        return Promise.resolve();

      //No borrar el catch, evita que los errores de consola pongan lenta los selects
      return Promise.reject("El teléfono debe ser valido").catch();
    },
  });

  return (
    <div className="profile">
      <div className="profile__info">
        <Form onFinish={onFinish} form={form}>
          <h1 className="profile__title">Información personal</h1>
          <label className="profile__label">
            Nombres
            <strong>*</strong>
          </label>
          <Form.Item name="name" rules={[{ required: true, message: "" }]}>
            <InputCustom />
          </Form.Item>
          <label className="profile__label">
            Apellidos
            <strong>*</strong>
          </label>
          <Form.Item name="lastname" rules={[{ required: true, message: "" }]}>
            <InputCustom />
          </Form.Item>
          <label className="profile__label">
            Celular
            <strong>*</strong>
          </label>
          <Form.Item name="phone" rules={[{ required: true, message: "" },  validatorMinPhone]}>
            <InputCustom type="tel" keyboardtype="number-pad" maxLength={10} />
          </Form.Item>
          <label className="profile__label">
            Correo
            <strong>*</strong>
          </label>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "" },
              { type: "email", message: "El correo no es valido  " },
            ]}
          >
            <InputCustom placeholder="example@tucorreo.com" />
          </Form.Item>
          <label className="signup__label">
            Tipo de actividad
            <strong>*</strong>
          </label>
          <Form.Item
            name="categoryId"
            rules={[{ required: true, message: "" }]}
          >
            <Select
              className="signup__options"
              placeholder="Selecciona una opción"
            >
              {categories?.map((busines, index) => (
                <Select.Option key={index} value={busines.id}>
                  {busines.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <label className="profile__label">
            Contraseña
            <strong>*</strong>
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
          <br />
          <Form.Item shouldUpdate noStyle>
            {() => (
              <CustomButton
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
              </CustomButton>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
