import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import { loginThunk } from "../../redux/auth/operations.js";
import { loginSchema } from "../../schemas/schemas.js";

import s from "./LoginForm.module.css";

import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const data = await dispatch(loginThunk(values)).unwrap();
      toast.success("Welcome, ${data.user.username}!");
      resetForm();
      navigate("/Dashboard");
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={s.form}>
          <svg className={s.iconLogo}>
            <use href={"../../../public/icons.svg#icon-logo"}></use>
          </svg>
          <h3 className={s.title}>Money Guard</h3>

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
            <ErrorMessage name="email" component="div" className={s.error} />
          </div>
          <div className={s.label}>
            <div className={s.iconWrapper}>
              <FaLock className={s.icon} />
            </div>
            <Field
              className={s.field}
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage name="password" component="div" className={s.error} />
          </div>

          <button
            type="submit"
            className={s.button_reg}
            disabled={isSubmitting}
          >
            {isSubmitting ? <div className={s.loader}></div> : "LOG IN"}
          </button>

          <Link className={s.link} to="/register">
            <button type="button" className={s.button_log}>
              REGISTER
            </button>
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
