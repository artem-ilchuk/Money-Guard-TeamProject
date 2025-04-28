import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { closeEditModal } from "../../redux/modal/slice";
import { editTransaction } from "../../redux/transactions/operations";
import { selectIsEditID } from "../../redux/modal/selectors";
import { selectTransactions } from "../../redux/transactions/selectors";
import s from "./EditTransactionForm.module.css";
import { customStyles } from "./customStyles";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { RiCloseLargeLine } from "react-icons/ri";
import clsx from "clsx";
import "react-datepicker/dist/react-datepicker.css";

// Категорії
const categories = [
  "Main expenses",
  "Products",
  "Car",
  "Self care",
  "Child care",
  "Household products",
  "Education",
  "Leisure",
  "Other expenses",
  "Entertaiment",
];

const categoriesOptions = categories.map((cat) => ({
  value: cat,
  label: cat,
}));

// Yup схема
const schema = yup.object().shape({
  date: yup.string().required("Date is required"),
  type: yup.string().oneOf(["INCOME", "EXPENSE"]).required("Type is required"),
  category: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().oneOf(categories).required("Category is required"),
      label: yup.string().required(),
    })
    .required("Category is required"),
  comment: yup.string().nullable(),
  sum: yup
    .number()
    .typeError("Sum must be a number")
    .positive("Sum must be positive")
    .required("Sum is required"),
});

export default function EditTransactionForm() {
  const dispatch = useDispatch();
  const transactionId = useSelector(selectIsEditID);
  const transactions = useSelector(selectTransactions);
  const transaction = transactions.find((item) => item.id === transactionId);

  const [isMobile, setIsMobile] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(true); // true = EXPENSE, false = INCOME

  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: "",
      type: "EXPENSE",
      category: null, // Default value is null, which works well with react-select
      comment: "",
      sum: "",
    },
  });

  // Підставляємо дані транзакції
  useEffect(() => {
    if (transaction) {
      reset({
        date: format(new Date(transaction.date), "yyyy-MM-dd"),
        type: transaction.type,
        category: {
          value: transaction.category,
          label: transaction.category,
        },
        comment: transaction.comment || "",
        sum: Math.abs(transaction.sum),
      });
      setIsChecked(transaction.type === "EXPENSE");
    }
  }, [transaction, reset]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const toggleType = () => {
    setIsChecked((prev) => !prev);
    const newType = !isChecked ? "EXPENSE" : "INCOME";
    setValue("type", newType);
  };

  const onSubmit = (data) => {
    if (!transaction) return;

    const updatedTransaction = {
      ...data,
      category: data.category ? data.category.value : "", // category value, if selected
      sum: data.type === "EXPENSE" ? -Math.abs(data.sum) : Math.abs(data.sum),
    };

    dispatch(editTransaction({ id: transactionId, transaction: updatedTransaction }));
    dispatch(closeEditModal());
  };

  return (
    <div className={s.formContainer}>
      <button
        type="button"
        className={isMobile ? s.hiden : s.modalCloseBtn}
        onClick={() => dispatch(closeEditModal())}
      >
        <RiCloseLargeLine className={s.closeIcon} />
      </button>

      <h1 className={s.title}>Edit transaction</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.type} onClick={toggleType}>
          <div
            className={clsx(
              s.type_income,
              s.type_text,
              !isChecked && s.income_active
            )}
          >
            Income
          </div>
          <div className={s.type_svg}>
            <svg width="10" height="22" viewBox="0 0 10 22" fill="none">
              <path d="M8.80108 1.09786L1.19895 20.9021" stroke="#E0E0E0" strokeWidth="2" />
            </svg>
          </div>
          <div
            className={clsx(
              s.type_expense,
              s.type_text,
              isChecked && s.expense_active
            )}
          >
            Expense
          </div>
        </div>

        {isChecked && (
          <div className={s.comment}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={categoriesOptions}
                  placeholder="Select a category"
                  styles={customStyles}
                  classNamePrefix="react-select"
                  className={s.select_form}
                  menuIsOpen={menuIsOpen}
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
              )}
            />
            {errors.category && (
              <span className={s.comment_err}>{errors.category.message}</span>
            )}
          </div>
        )}

        <div className={s.sum_data_wrap}>
          <div className={s.sum_wrap}>
            <input
              {...register("sum")}
              type="number"
              placeholder="0.00"
              className={s.sum}
              autoComplete="off"
            />
            {errors.sum && (
              <span className={s.comment_err}>{errors.sum.message}</span>
            )}
          </div>

          <div className={s.data_wrap}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) =>
                    field.onChange(format(date, "yyyy-MM-dd"))
                  }
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

        <div className={clsx(s.comment, s.comment_bottom)}>
          <input
            {...register("comment")}
            type="text"
            placeholder="Comment"
            className={s.input}
            autoComplete="off"
          />
          {errors.comment && (
            <span className={s.comment_err}>{errors.comment.message}</span>
          )}
        </div>

        <div className={s.btn_wrap}>
          <button type="submit" className={clsx(s.btn, s.btn_add)}>
            Save
          </button>
          <button
            type="button"
            className={clsx(s.btn, s.btn_cancel)}
            onClick={() => dispatch(closeEditModal())}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
