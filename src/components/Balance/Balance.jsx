import styles from "./Balance.module.css";
// import { useSelector, useDispatch } from "react-redux";
// import { selectBalance } from "../../redux/auth/selectors";
// import { getCurrentUser } from "../../redux/auth/operations";
// import { useEffect } from "react";

const Balance = ({ balance }) => {
  // const dispatch = useDispatch();
  // const balance = useSelector(selectBalance);
  // useEffect(() => {
  //   dispatch(getCurrentUser());
  // }, [dispatch]);

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
