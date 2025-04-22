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

function AddTransactionForm() {
  const categories = useSelector(selectCategories);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const isLogged = useSelector(selectIsLoggedIn);
  
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateIsMobile = (e) => {
      setIsMobile(e.matches);
    };

    updateIsMobile(mediaQuery);
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  const categoriesForSelect = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const selectDefaultValue = categoriesForSelect.find(
    (item) => item.label === "Main expenses"
  );

  const [selectedOption, setSelectedOption] = useState(null);

  const schema = yup.object().shape({
    amount: yup.number().required("Number invalid value"),
    transactionDate: yup
      .date()
      .required("Date is required")
      .default(() => new Date()),
    switch: yup.boolean(),
    category: yup.string(),
    comment: yup.string().required(),
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (!isChecked) {
      const categoryId = categories.filter((el) => el.name === "Income");
      data.categoryId = categoryId[0].id;
      data.type = "INCOME";
      data.amount = Math.abs(data.amount);
    } else if (selectedOption) {
      data.categoryId = selectedOption.value;
      data.type = "EXPENSE";
      data.amount = Math.abs(data.amount) * -1;
    } else {
      const categoryId = categories.filter((el) => el.name === "Main expenses");
      data.categoryId = categoryId[0].id;
      data.type = "EXPENSE";
      data.amount = Math.abs(data.amount) * -1;
    }

    const originalDate = new Date(data.transactionDate);
    const formattedDate = format(originalDate, "yyyy-MM-dd");
    data.transactionDate = formattedDate;

    delete data.switch;

    dispatch(addTransaction(data));
    dispatch(closeAddModal());
  };

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const handleMenuOpen = () => setMenuIsOpen(true);
  const handleMenuClose = () => setMenuIsOpen(false);

  const datePickerRef = useRef(null);

  return (
    <div className={s.backdrop} onClick={() => dispatch(closeAddModal())}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <header className={isMobile ? s.headerMob : s.hiden}>
          <Link to="/" className={s.icon_wrap}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5158 2.35174C11.3044 2.04891 10.0931 1.44324 9.18459 0.534729C8.27608 1.44324 7.06474 2.04891 5.85339 2.35174C6.15623 5.07727 7.06474 6.89428 9.18459 8.40846C11.3044 6.89428 12.5158 5.07727 12.5158 2.35174Z"
                fill="#FFC727"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.3044 13.6273L2.82495 3.63373V8.4791L9.48734 16.05L11.3044 13.6273Z"
                fill="#FBFBFB"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.213 12.7188L15.847 8.47911V3.93657L10.0931 10.599L12.213 12.7188Z"
                fill="#FBFBFB"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5157 14.2333V16.9588L15.8469 13.0219V10.2964L12.5157 14.2333Z"
                fill="#FBFBFB"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.15615 14.2333L2.82495 10.2964V13.0219L6.15615 16.9588V14.2333Z"
                fill="#FBFBFB"
              />
            </svg>
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
                onMenuOpen={handleMenuOpen}
                onMenuClose={handleMenuClose}
                components={{
                  DropdownIndicator: () => {
                    return menuIsOpen ? (
                      <GoChevronUp
                        className={s.iconSelect}
                        style={{
                          fontSize: "20px",
                          color: "white",
                          fontWeight: "100",
                        }}
                      />
                    ) : (
                      <GoChevronDown
                        className={s.iconSelect}
                        style={{
                          fontSize: "20px",
                          color: "white",
                          fontWeight: "100",
                        }}
                      />
                    );
                  },
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
                <span className={s.comment_err}>Enter a number</span>
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
                    selected={field.value || new Date()}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="dd.MM.yyyy"
                    className={s.customDatePicker}
                    calendarClassName={s.calendarClassName}
                    maxDate={new Date()}
                    // withPortal={isMobile}
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
              <span className={s.comment_err}>{"Enter a comment"}</span>
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
    </div>
  );
}

export default AddTransactionForm;
