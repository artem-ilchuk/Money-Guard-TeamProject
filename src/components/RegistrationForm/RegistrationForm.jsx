import css from "./RegistrationForm.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/auth/operations";
import { registerSchema } from "../../schemas/schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordStrengthBar from "react-password-strength-bar-with-style-item";
import clsx from "clsx";
import FormButton from "../FormButton/FormButton";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (values) => {
    let data = { ...values };
    delete data.confirmPassword;
    dispatch(registerThunk(data))
      .unwrap()
      .then(() => navigate("/dashboard"));
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.logoThumb}>
          <svg className={css.iconLogo}>
            <use href={"/icons.svg#icon-logo"}></use>
          </svg>
          <p className={css.title}>Money Guard</p>
        </div>

        <div className={css.fieldThumb}>
          <div className={css.iconThumb}>
            <svg className={css.icon}>
              <use href={"/icons.svg#icon-user"}></use>
            </svg>
            <input
              {...register("name")}
              className={css.field}
              placeholder="Name"
            ></input>
          </div>
          <div className={css.errorThumb}>
            <div className={css.error}>{errors.name?.message}</div>
          </div>
        </div>

        <div className={css.fieldThumb}>
          <div className={css.iconThumb}>
            <svg className={css.icon}>
              <use href={"/icons.svg#icon-email"}></use>
            </svg>
            <input
              {...register("email")}
              type="email"
              className={css.field}
              placeholder="E-mail"
            ></input>
          </div>
          <div className={css.errorThumb}>
            <div className={css.error}>{errors.email?.message}</div>
          </div>
        </div>

        <div className={css.fieldThumb}>
          <div className={css.iconThumb}>
            <svg className={css.icon}>
              <use href={"/icons.svg#icon-lock"}></use>
            </svg>
            <input
              {...register("password")}
              type="password"
              className={css.field}
              placeholder="Password"
            ></input>
          </div>
          <div className={css.errorThumb}>
            <div className={css.error}>{errors.password?.message}</div>
          </div>
        </div>

        <div className={css.fieldThumb}>
          <div className={css.iconThumb}>
            <svg className={css.icon}>
              <use href={"/icons.svg#icon-lock"}></use>
            </svg>
            <input
              {...register("confirmPassword")}
              type="password"
              className={css.field}
              placeholder="Confirm password"
            ></input>
          </div>
          <div className={clsx(css.errorThumb, css.marginErrorThumb)}>
            <div className={css.error}>{errors.confirmPassword?.message}</div>
          </div>
          <div className={css.passwordStrengthBarThumb}>
            <PasswordStrengthBar
              password={watch("password")}
              className={css.passwordStrengthBar}
              scoreWordClassName={css.scoreWordClassName}
              minLength={8}
              minScore={1}
              barColors={["#ddd", "#FFB627", "#f6b44d", "#2b90ef", "#25c281"]}
              scoreWords={["weak", "weak", "okay", "good", "strong"]}
            />
          </div>
        </div>

        <div className={css.buttonThumb}>
          {/* <FormButton text="Register" type="submit" /> */}
          <button type="submit" className={clsx(css.button, css.regButton)}>
            Register
          </button>
          {/* <FormButton text="Log in" variant="whiteButton" /> */}
          <NavLink to="/login" className={clsx(css.button, css.logButton)}>
            Log in
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
