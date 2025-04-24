import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./RegistrationForm.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/auth/operations";
import { registerSchema } from "../../schemas/schemas";

const RegistrationForm = () => {
  const initialValues = {
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, options) => {
    options.resetForm();
    dispatch(registerThunk(values))
      .unwrap()
      .then(() => navigate("/dashboard"));
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.logoThumb}>
            <svg className={css.iconLogo}>
              <use href={"/icons.svg#icon-logo"}></use>
            </svg>
            <p className={css.title}>Money Guard</p>
          </div>

          <div>
            <div className={css.iconThumb}>
              <svg className={css.icon}>
                <use href={"/icons.svg#icon-user"}></use>
              </svg>
              <Field
                name="name"
                className={css.field}
                placeholder="Name"
              ></Field>
            </div>
            <div className={css.errorThumb}>
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>
          </div>

          <div>
            <div className={css.iconThumb}>
              <svg className={css.icon}>
                <use href={"/icons.svg#icon-email"}></use>
              </svg>
              <Field
                name="email"
                type="email"
                className={css.field}
                placeholder="E-mail"
              ></Field>
            </div>
            <div className={css.errorThumb}>
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>
          </div>

          <div>
            <div className={css.iconThumb}>
              <svg className={css.icon}>
                <use href={"/icons.svg#icon-lock"}></use>
              </svg>
              <Field
                name="password"
                type="password"
                className={css.field}
                placeholder="Password"
              ></Field>
            </div>
            <div className={css.errorThumb}>
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>
          </div>

          <div>
            <div className={css.iconThumb}>
              <svg className={css.icon}>
                <use href={"/icons.svg#icon-lock"}></use>
              </svg>
              <Field
                name="confirmPassword"
                type="password"
                className={css.field}
                placeholder="Confirm password"
              ></Field>
            </div>
            <div className={css.errorThumb}>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={css.error}
              />
            </div>
          </div>

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
