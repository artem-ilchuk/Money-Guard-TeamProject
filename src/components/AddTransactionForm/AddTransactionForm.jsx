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
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { customStyles } from "./customStyles";
import { addTransaction } from "../../redux/transactions/operations";
import { closeAddModal } from "../../redux/modal/slice";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { RiCloseLargeLine } from "react-icons/ri";

function AddTransactionForm() {
  //! const categories = useSelector(selectCategories);
  const categories = [
    { id: "1", name: "Main expenses" },
    { id: "2", name: "Car" },
    { id: "3", name: "Food" },
    { id: "4", name: "Entertainment" },
    { id: "5", name: "Other" },
    { id: "6", name: "Income" },
  ];

  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const datePickerRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateIsMobile = (e) => setIsMobile(e.matches);

    updateIsMobile(mediaQuery);
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  //! const categoriesForSelect = categories.map((category) => ({
  //   value: category.id,
  //   label: category.name,
  // }));

  const categoriesForSelect = [
    { value: "1", label: "Main expenses" },
    { value: "2", label: "Car" },
    { value: "3", label: "Food" },
    { value: "4", label: "Entertainment" },
    { value: "5", label: "Other" },
  ];

  //! const selectDefaultValue = categoriesForSelect.find(
  //   (item) => item.label === "Main expenses"
  // );

  const selectDefaultValue =
    categoriesForSelect &&
    categoriesForSelect.find((item) => item.label === "Main expenses");

  const schema = yup.object().shape({
    amount: yup.number().typeError("Must be a number").required("Required"),
    transactionDate: yup
      .date()
      .required("Required")
      .default(() => new Date()),
    switch: yup.boolean(),
    category: yup.string().nullable(),
    comment: yup.string().required("Required"),
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
      amount: "",
      transactionDate: new Date(),
      comment: "",
      category: null,
    },
  });

  const onSubmit = async (data) => {
    if (!isChecked) {
      const incomeCat = categories.find((el) => el.name === "Income");
      data.categoryId = incomeCat?.id || "";
      data.type = "INCOME";
      data.amount = Math.abs(data.amount);
    } else if (selectedOption) {
      data.categoryId = selectedOption.value;
      data.type = "EXPENSE";
      data.amount = -Math.abs(data.amount);
    } else {
      const defaultCat = categories.find((el) => el.name === "Main expenses");
      data.categoryId = defaultCat?.id || "";
      data.type = "EXPENSE";
      data.amount = -Math.abs(data.amount);
    }

    data.transactionDate = format(new Date(data.transactionDate), "yyyy-MM-dd");
    delete data.switch;

    try {
      await dispatch(addTransaction(data)).unwrap();
      dispatch(closeAddModal());
    } catch (error) {
      // error toast already handled in redux thunk
    }
  };

  // Sync Select value to form state
  useEffect(() => {
    if (selectedOption) {
      setValue("category", selectedOption.value);
    }
  }, [selectedOption, setValue]);

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
              {...register("switch")}
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
              defaultValue={selectDefaultValue}
              onChange={setSelectedOption}
              options={categoriesForSelect}
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
              {...register("amount")}
              type="number"
              autoComplete="off"
              placeholder="0.00"
              className={s.sum}
            />
            {errors.amount && (
              <span className={s.comment_err}>{errors.amount.message}</span>
            )}
          </div>

          <div
            className={s.data_wrap}
            onClick={() => datePickerRef.current?.setFocus()}
          >
            <Controller
              name="transactionDate"
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
