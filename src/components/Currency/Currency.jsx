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

  const usdRateBuy = currencyData?.usd?.buy;
  const euroRateBuy = currencyData?.euro?.buy;
  const usdRateSell = currencyData?.usd?.sell;
  const euroRateSell = currencyData?.euro?.sell;

  useEffect(() => {
    dispatch(getCurrency());
  }, [dispatch]);

  const formatCurrency = (value) => {
    if (value === undefined || value === null) return "-";
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
              <td className={styles.rate}>{formatCurrency(usdRateBuy)}</td>
              <td className={styles.rate}>{formatCurrency(usdRateSell)}</td>
            </tr>
            <tr>
              <td>EUR</td>
              <td className={styles.rate}>{formatCurrency(euroRateBuy)}</td>
              <td className={styles.rate}>{formatCurrency(euroRateSell)}</td>
            </tr>
          </tbody>
        </table>
      )}

      {!isTablet && (
        <div className={styles.currencyPeaks}>
          <p>{formatCurrency(usdRateBuy)}</p>
          <p>{formatCurrency(euroRateBuy)}</p>
        </div>
      )}

      <div className={styles.currencyTableGraph}>
        <img src={chartImage} alt="volume" />
      </div>
    </div>
  );
};

export default Currency;
