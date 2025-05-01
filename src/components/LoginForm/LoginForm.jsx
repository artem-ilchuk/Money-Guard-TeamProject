import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { loginThunk } from "../../redux/auth/operations.js";
import { loginSchema } from "../../schemas/schemas.js";

import s from "./LoginForm.module.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useState } from "react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const data = await dispatch(loginThunk(values)).unwrap();
      toast.success("Welcome, ${data.user.username}!");
      navigate("/dashboard");
      resetForm();
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <div className={s.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <div className={s.iconBox}>
              <svg className={s.iconLogo}>
                <use href={"/icons.svg#icon-logo"}></use>
              </svg>
              <h3 className={s.title}>Money Guard</h3>
            </div>

            <div className={s.inputs}>
              <div className={s.label}>
                <div className={s.iconWrapper}>
                  <FaEnvelope className={s.icon} />
                </div>
                <Field
                  className={s.field}
                  type="email"
                  name="email"
                  placeholder="E-mail"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.label}>
                <div className={s.iconWrapper}>
                  <FaLock className={s.icon} />
                </div>
                <Field
                  className={s.field}
                  type={passwordVisibility ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                />
                {passwordVisibility ? (
              <svg className={s.eyeButton} onClick={handlePasswordVisibility}>
                <use href={"/icons.svg#icon-eye"}></use>
              </svg>
            ) : (
              <svg className={s.eyeButton} onClick={handlePasswordVisibility}>
                <use href={"/icons.svg#icon-eye-blocked"}></use>
              </svg>
            )}
                <ErrorMessage
                  name="password"
                  component="div"
                  className={s.error}
                />
              </div>
            </div>
            <div className={s.buttonBox}>
              <button
                type="submit"
                className={s.button_log}
                disabled={isSubmitting}
              >
                {isSubmitting ? <div className={s.loader}></div> : "LOG IN"}
              </button>
              <NavLink to="/register" className={s.button_reg}>
                REGISTER
              </NavLink>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
