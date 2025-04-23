
// AddTransactionForm.jsx

import s from "./AddTransactionForm.module.css";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { selectCategories } from "../../redux/statistics/selectors";
import { logoutThunk } from "../../redux/auth/operations";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { customStyles } from "./customStyles";
import { addTransaction } from "../../redux/transactions/operations";
import { closeAddModal } from "../../redux/modal/slice";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { Link } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { RiCloseLargeLine } from "react-icons/ri";
import { toast } from "react-toastify";

function AddTransactionForm() {
  const categories = useSelector(selectCategories);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const isLogged = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateIsMobile = (e) => setIsMobile(e.matches);
    updateIsMobile(mediaQuery);
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        dispatch(closeAddModal());
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [dispatch]);

  const categoriesForSelect = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const selectDefaultValue = categoriesForSelect.find(
    (item) => item.label === "Main expenses"
  );

  const [selectedOption, setSelectedOption] = useState(null);

  const schema = yup.object().shape({
    amount: yup.number().typeError("Enter a valid number").required("Amount is required"),
    transactionDate: yup
      .date()
      .required("Date is required")
      .default(() => new Date()),
    switch: yup.boolean(),
    category: yup.string().when("switch", {
      is: true,
      then: yup.string().required("Category is required for expenses"),
      otherwise: yup.string().notRequired(),
    }),
    comment: yup.string().required("Enter a comment"),
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      if (!isChecked) {
        const incomeCategory = categories.find((el) => el.name === "Income");
        data.categoryId = incomeCategory?.id;
        data.type = "INCOME";
        data.amount = Math.abs(data.amount);
      } else if (selectedOption) {
        data.categoryId = selectedOption.value;
        data.type = "EXPENSE";
        data.amount = -Math.abs(data.amount);
      } else {
        const defaultExpense = categories.find((el) => el.name === "Main expenses");
        data.categoryId = defaultExpense?.id;
        data.type = "EXPENSE";
        data.amount = -Math.abs(data.amount);
      }

      const formattedDate = format(new Date(data.transactionDate), "yyyy-MM-dd");
      data.transactionDate = formattedDate;
      delete data.switch;

      await dispatch(addTransaction(data)).unwrap();
      dispatch(closeAddModal());
    } catch (error) {
      toast.error("Something went wrong. Please check your input and try again.");
    }
  };

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  const datePickerRef = useRef(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <div className={s.backdrop} onClick={() => dispatch(closeAddModal())}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={s.form}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={isMobile ? s.headerMob : s.hiden}>
          <Link to="/" className={s.icon_wrap}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">{/* logo SVG */}</svg>
            <p className={s.logoText}>Money Guard</p>
          </Link>
          <div className={s.useLog}>
            <p className={s.helloUser}>
              {isLogged ? user.name : "Hello, Anonymous"}
            </p>
            <button className={s.btnLogout} onClick={handleLogout}>
              <TbLogout className={s.exitIcon} />
            </button>
          </div>
        </header>

        <div className={s.formContainer}>
          <button
            type="button"
            className={isMobile ? s.hiden : s.modalCloseBtn}
            onClick={() => dispatch(closeAddModal())}
          >
            <RiCloseLargeLine className={s.closeIcon} />
          </button>

          <h1 className={s.title}>Add transaction</h1>

          {/* Switcher */}
          <div className={s.switch__wrapper}>
            <span className={clsx(s.span_text, !isChecked && s.income_active)}>Income</span>
            <label htmlFor="switch" className={s.switch}>
              <input
                {...register("switch")}
                type="checkbox"
                id="switch"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className={s.switch__input}
              />
              <span className={s.switch__slider}>{/* SVG icons */}</span>
            </label>
            <span className={clsx(s.span_text, isChecked && s.expense_active)}>Expense</span>
          </div>

          {/* Category */}
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
                      <GoChevronUp className={s.iconSelect} />
                    ) : (
                      <GoChevronDown className={s.iconSelect} />
                    ),
                }}
              />
              {errors.category && <span className={s.comment_err}>{errors.category.message}</span>}
            </div>
          )}

          {/* Amount + Date */}
          <div className={s.sum_data_wrap}>
            <div className={s.sum_wrap}>
              <input
                {...register("amount")}
                type="number"
                placeholder="0.00"
                className={s.sum}
              />
              {errors.amount && <span className={s.comment_err}>{errors.amount.message}</span>}
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
                    selected={field.value || new Date()}
                    onChange={field.onChange}
                    dateFormat="dd.MM.yyyy"
                    className={s.customDatePicker}
                    calendarClassName={s.calendarClassName}
                    maxDate={new Date()}
                  />
                )}
              />
            </div>
          </div>

          {/* Comment */}
          <div className={clsx(s.comment_bottom)}>
            <input
              {...register("comment")}
              type="text"
              placeholder="Comment"
              className={s.input}
            />
            {errors.comment && <span className={s.comment_err}>{errors.comment.message}</span>}
          </div>

          {/* Buttons */}
          <button type="submit" className={clsx(s.btn, s.btn_add)}>
            Add
          </button>
          <button
            type="button"
            className={clsx(s.btn, s.btn_cancel)}
            onClick={() => dispatch(closeAddModal())}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTransactionForm;
