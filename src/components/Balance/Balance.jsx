import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectTotalBalance } from "../../redux/auth/selectors";
import { getTotalBalanceThunk } from "../../redux/auth/operations";
import styles from "./Balance.module.css";

const Balance = () => {
  const dispatch = useDispatch();
  const balance = useSelector(selectTotalBalance);
  useEffect(() => {
    dispatch(getTotalBalanceThunk());
  }, [dispatch]);

  const formatted =
    balance?.toLocaleString("uk-UA", {
      minimumFractionDigits: 2,
    }) ?? "0.00";

  return (
    <div className={styles.container}>
      <p className={styles.title} style={{color: 'black'}}>Your Balance</p>
      <p className={styles.balance}>₴ {formatted}</p>
    </div>
  );
};

export default Balance;
