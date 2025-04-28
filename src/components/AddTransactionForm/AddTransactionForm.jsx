import s from "./AddTransactionForm.module.css";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
// import { selectCategories } from "../../redux/statistics/selectors";
// import { useSelector, useDispatch } from "react-redux";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { customStyles } from "./customStyles";
import { addTransaction } from "../../redux/transactions/operations";
import { closeAddModal } from "../../redux/modal/slice";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { RiCloseLargeLine } from "react-icons/ri";

function AddTransactionForm() {
  const dispatch = useDispatch();

  const categories = [
    { value: "Main expenses", label: "Main expenses" },
    { value: "Products", label: "Products" },
    { value: "Car", label: "Car" },
    { value: "Self care", label: "Self care" },
    { value: "Child care", label: "Child care" },
    { value: "Household products", label: "Household products" },
    { value: "Education", label: "Education" },
    { value: "Leisure", label: "Leisure" },
    { value: "Other expenses", label: "Other expenses" },
    { value: "Entertaiment", label: "Entertaiment" },
  ];

  const [isChecked, setIsChecked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const datePickerRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateIsMobile = (e) => setIsMobile(e.matches);

    updateIsMobile(mediaQuery);
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  const schema = yup.object().shape({
    sum: yup
      .number()
      .typeError("Must be a number")
      .positive("Must be positive number")
      .required("Required"),
    date: yup
      .date()
      .max(new Date(), "Future date is not allowed")
      .required("Required"),
    comment: yup.string().required("Required"),
    category: yup.string().oneOf(categories.map((cat) => cat.value)),
    type: yup.string().oneOf(["INCOME", "EXPENSE"]).required(),
  });

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sum: "",
      date: new Date(),
      comment: "",
      category: categories[0].value,
      type: "EXPENSE",
    },
  });

  useEffect(() => {
    if (selectedOption) {
      setValue("category", selectedOption.value);
    }
  }, [selectedOption, setValue]);

  const onSubmit = async (data) => {
    const formattedDate = format(new Date(data.date), "dd-MM-yyyy"); // формат "22-12-2025"

    const formData = {
      sum: Math.abs(data.sum), // завжди позитивне
      date: formattedDate,
      comment: data.comment,
      category: data.category,
      type: isChecked ? "-" : "+", // "-" якщо витрата, "+" якщо дохід
    };

    // console.log(formData); // для перевірки

    try {
      await dispatch(addTransaction(formData)).unwrap();
      dispatch(closeAddModal());
    } catch (error) {
      // error toast вже повинен бути з бекенду
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <div className={s.formContainer}>
        <button
          type="button"
          className={isMobile ? s.hiden : s.modalCloseBtn}
          onClick={() => dispatch(closeAddModal())}
        >
          <RiCloseLargeLine
            className={s.closeIcon}
            style={{ width: "20px", height: "20px" }}
          />
        </button>

        <h1 className={s.title}>Add transaction</h1>

        <div className={s.switch__wrapper}>
          <span className={clsx(s.span_text, !isChecked && s.income_active)}>
            Income
          </span>
          <label htmlFor="switch" className={s.switch}>
            <input
              type="checkbox"
              id="switch"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className={s.switch__input}
            />
            <span className={s.switch__slider}>
              {!isChecked ? (
                <svg width="74" height="74" viewBox="0 0 74 74" fill="none">
                  <g filter="url(#filter0_d_60_139)">
                    <circle cx="37" cy="31" r="22" fill="#FFB627" />
                  </g>
                  <path d="M37 21V41" stroke="#FBFBFB" strokeWidth="2" />
                  <path d="M27 31L47 31" stroke="#FBFBFB" strokeWidth="2" />
                </svg>
              ) : (
                <svg width="74" height="74" viewBox="0 0 74 74" fill="none">
                  <g filter="url(#filter0_d_61_794)">
                    <circle cx="37" cy="31" r="22" fill="#FF868D" />
                  </g>
                  <path d="M27 31L47 31" stroke="white" strokeWidth="2" />
                </svg>
              )}
            </span>
          </label>
          <span className={clsx(s.span_text, isChecked && s.expense_active)}>
            Expense
          </span>
        </div>

        {isChecked && (
          <div className={s.comment}>
            <Select
              classNamePrefix="react-select"
              styles={customStyles}
              className={s.select_form}
              value={selectedOption}
              onChange={setSelectedOption}
              options={categories}
              placeholder="Select a category"
              onMenuOpen={() => setMenuIsOpen(true)}
              onMenuClose={() => setMenuIsOpen(false)}
              components={{
                DropdownIndicator: () =>
                  menuIsOpen ? (
                    <GoChevronUp
                      className={s.iconSelect}
                      style={{ fontSize: "20px", color: "white" }}
                    />
                  ) : (
                    <GoChevronDown
                      className={s.iconSelect}
                      style={{ fontSize: "20px", color: "white" }}
                    />
                  ),
              }}
            />
          </div>
        )}

        <div className={s.sum_data_wrap}>
          <div className={s.sum_wrap}>
            <input
              {...register("sum")}
              type="number"
              autoComplete="off"
              placeholder="0.00"
              className={s.sum}
            />
            {errors.sum && (
              <span className={s.comment_err}>{errors.sum.message}</span>
            )}
          </div>

          <div
            className={s.data_wrap}
            onClick={() => datePickerRef.current?.setFocus()}
          >
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  ref={datePickerRef}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd.MM.yyyy"
                  className={s.customDatePicker}
                  calendarClassName={s.calendarClassName}
                  maxDate={new Date()}
                />
              )}
            />
            <div className={s.svg_wrap}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 11H7V13H9V11ZM13 11H11V13H13V11ZM17 11H15V13H17V11ZM19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z"
                  fill="#734AEF"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className={clsx(s.comment_bottom)}>
          <input
            {...register("comment")}
            type="text"
            className={s.input}
            placeholder="Comment"
            autoComplete="off"
          />
          {errors.comment && (
            <span className={s.comment_err}>{errors.comment.message}</span>
          )}
        </div>

        <button className={clsx(s.btn, s.btn_add)} type="submit">
          Add
        </button>
        <button
          className={clsx(s.btn, s.btn_cancel)}
          type="button"
          onClick={() => dispatch(closeAddModal())}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddTransactionForm;
