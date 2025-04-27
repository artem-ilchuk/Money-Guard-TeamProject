import styles from "./TransactionItem.module.css";

const TransactionItem = ({ id, category, date, sum, type, comment }) => {
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
          <span className={styles.item}>{sum}</span>
        </li>
        <li className={styles.listItem}>
          <button type="button"></button>
          <span className={styles.item}>Edit</span>
        </li>
      </ul>
    </div>
  );
};

export default TransactionItem;
