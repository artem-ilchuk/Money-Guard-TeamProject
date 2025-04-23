import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email  is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(12, "Password cannot exceed 12 characters")
    .required("Password  is required"),
});
