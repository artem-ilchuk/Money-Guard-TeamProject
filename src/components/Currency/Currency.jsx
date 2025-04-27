import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrencyData,
  selectCurrencyLoading,
} from "../../redux/currency/selectors";
import { getCurrency } from "../../redux/currency/operations";
import styles from "./Currency.module.css";
import chartImage from "../../assets/chart.png";

const Currency = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1279px)" });
  const dispatch = useDispatch();
  const currencyData = useSelector(selectCurrencyData);
  const isLoading = useSelector(selectCurrencyLoading);

  useEffect(() => {
    dispatch(getCurrency());
  }, [dispatch]);

  const formatCurrency = (value) => {
    if (!value) return "-";
    return Number(value).toFixed(2);
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>Loading currency data...</div>
      ) : (
        <table className={styles.currencyTable}>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Purchase</th>
              <th>Sale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>USD</td>
              <td>{formatCurrency(currencyData?.usd?.buy)}</td>
              <td>{formatCurrency(currencyData?.usd?.sell)}</td>
            </tr>
            <tr>
              <td>EUR</td>
              <td>{formatCurrency(currencyData?.euro?.buy)}</td>
              <td>{formatCurrency(currencyData?.euro?.sell)}</td>
            </tr>
          </tbody>
        </table>
      )}

      {!isTablet && (
        <div className={styles.currencyPeaks}>
          <p>{formatCurrency(currencyData?.usd?.buy)}</p>
          <p>{formatCurrency(currencyData?.euro?.buy)}</p>
        </div>
      )}

      <div className={styles.currencyTableGraph}>
        <img src={chartImage} alt="volume" />
      </div>
    </div>
  );
};

export default Currency;
