import { useDispatch } from "react-redux";
import styles from "./TransactionItem.module.css";
import { CiEdit } from "react-icons/ci";
import { deleteTransaction } from "../../../redux/transactions/operations";

const TransactionItem = ({ id, category, date, sum, type, comment }) => {
  const dispatch = useDispatch();

  const deletedOnKlick = (id) => {
    dispatch(deleteTransaction(id));
  };

  return (
    <div className={styles.transactionListContainer}>
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
          <span className={styles.itemSum}>{sum}</span>
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
          <span className={styles.edit}>
            <CiEdit />
            <span className={styles.editSpan}>Edit</span>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default TransactionItem;
