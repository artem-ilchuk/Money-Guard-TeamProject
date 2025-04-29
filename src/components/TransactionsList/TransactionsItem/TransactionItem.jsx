import { useDispatch, useSelector } from "react-redux";
import styles from "./TransactionItem.module.css";
import { CiEdit } from "react-icons/ci";
import { deleteTransaction } from "../../../redux/transactions/operations";
import clsx from "clsx";
import { openEditModal } from "../../../redux/modal/slice";

const TransactionItem = ({ id, category, date, sum, type, comment }) => {
  const dispatch = useDispatch();
  const deletedOnKlick = (id) => {
    dispatch(deleteTransaction(id));
  };

const handleEditModalOpen = () => {
  dispatch(openEditModal());
}

  return (
    <div
      className={clsx(
        styles.transactionListContainer,
        type == "+" && styles.incomeBorderColor
      )}
    >
      <ul className={styles.transactionList}>
        <li className={styles.listItem}>
          <span className={styles.headerTextMobile}>Date</span>
          <span className={styles.item}>{date}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.headerTextMobile}>Type</span>
          <span className={styles.item}>{type}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.headerTextMobile}>Category</span>
          <span className={styles.item}>{category}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.headerTextMobile}>Comment</span>
          <span className={styles.item}>{comment}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.headerTextMobile}>Sum</span>
          <span
            className={clsx(
              type == "-" && styles.expenseTextColor,
              type == "+" && styles.incomeTextColor
            )}
          >
            {sum}
          </span>
        </li>
        <li className={styles.deleteEdit}>
          <button
            type="submit"
            onClick={() => {
              deletedOnKlick(id);
            }}
          >
            Delete
          </button>
          <span className={styles.edit} onClick={handleEditModalOpen}>
            <CiEdit />
            <span className={styles.editSpan}>Edit</span>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default TransactionItem;
