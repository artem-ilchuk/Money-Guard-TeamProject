import { Field, Form, Formik } from "formik";
import css from "./RegistrationForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/auth/operations";

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
      .then(() => navigate("/"));
  };
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <h3 className={css.title}>Money Guard</h3>
          <Field
            name="name"
            className={css.field}
            placeholder="Name"
            required
          ></Field>

          <Field
            name="email"
            type="email"
            className={css.field}
            placeholder="E-mail"
            required
          ></Field>

          <Field
            name="password"
            type="password"
            className={css.field}
            placeholder="Password"
            required
          ></Field>

          <button type="submit" className={css.regButton}>
            Register
          </button>

          <Link to="/login" className={css.logButton}>
            <button className={css.logButton}>Log in</button>
          </Link>
        </Form>
      </Formik>
    </>
  );
};

export default RegistrationForm;
