import { Field, Form, Formik } from "formik";
import css from "./RegistrationForm.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/auth/operations";

const RegistrationForm = () => {
  const initialValues = {
    email: "",
    password: "",
    name: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, options) => {
    options.resetForm();
    dispatch(registerThunk(values))
      .unwrap()
      .then(() => navigate("/"));
  };
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <div className={css.logoThumb}>
            <svg className={css.iconLogo}>
              <use href={"/icons.svg#icon-logo"}></use>
            </svg>
            <p className={css.title}>Money Guard</p>
          </div>

          <div className={css.iconThumb}>
            <svg className={css.icon}>
              <use href={"/icons.svg#icon-user"}></use>
            </svg>
            <Field
              name="name"
              className={css.field}
              placeholder="Name"
              required
            ></Field>
          </div>

          <div className={css.iconThumb}>
            <svg className={css.icon}>
              <use href={"/icons.svg#icon-email"}></use>
            </svg>
            <Field
              name="email"
              type="email"
              className={css.field}
              placeholder="E-mail"
              required
            ></Field>
          </div>

          <div className={css.iconThumb}>
            <svg className={css.icon}>
              <use href={"/icons.svg#icon-lock"}></use>
            </svg>
            <Field
              name="password"
              type="password"
              className={css.field}
              placeholder="Password"
              required
            ></Field>
          </div>

          {/* <Field
            name="confirmPassword"
            type="password"
            className={css.field}
            placeholder="Confirm password"
            required
          ></Field> */}
          <div className={css.buttonThumb}>
            <button type="submit" className={css.regButton}>
              Register
            </button>
            <NavLink to="/login" className={css.logButton}>
              <button className={css.logButton}>Log in</button>
            </NavLink>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default RegistrationForm;
