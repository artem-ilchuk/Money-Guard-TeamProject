import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectBalance } from "../../redux/auth/selectors";
import { getCurrentUser } from "../../redux/auth/operations";
import styles from "./Balance.module.css";

const Balance = () => {
  const dispatch = useDispatch();
  const balance = useSelector(selectBalance);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const formatted =
    balance?.toLocaleString("uk-UA", {
      minimumFractionDigits: 2,
    }) ?? "0.00";

  return (
    <div className={styles.container}>
      <p className={styles.title}>Your Balance</p>
      <p className={styles.balance}>₴ {formatted}</p>
    </div>
  );
};

export default Balance;
