import { useMediaQuery } from "react-responsive";
import styles from "./Currency.module.css";
// import { useSelector } from "react-redux";
// import {
//   selectCurrency,
//   selectIsLoading,
// } from "../../redux/";
// import { fetchCurrency } from "../../redux/";
// import { useDispatch } from "react-redux";
import { useEffect } from "react";
import chartImage from "../../assets/chart.png";

// Mock data (замість Redux)
const mockCurrency = {
  usd: { buy: 27.55, sell: 27.65 },
  eur: { buy: 30.0, sell: 30.1 },
  date: Date.now(),
};

const Currency = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1279px)" });

  // const currencyData = useSelector(selectCurrency);
  // const isLoading = useSelector(selectIsLoading);
  // const dispatch = useDispatch();

  // Mock data instead
  const currencyData = mockCurrency;
  const isLoading = false;

  useEffect(() => {
    // const shouldFetchData = () => {
    //   if (!currencyData || !currencyData.date) return true;
    //   const oneHourInMs = 60 * 60 * 1000;
    //   const currentTime = Date.now();
    //   const timeSinceLastFetch = currentTime - currencyData.date;
    //   return timeSinceLastFetch >= oneHourInMs;
    // };
    // if (shouldFetchData()) {
    //   async function fetchData() {
    //     const result = await dispatch(fetchCurrency());
    //   }
    //   fetchData();
    // }
  }, []);

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
              <td>{formatCurrency(currencyData?.eur?.buy)}</td>
              <td>{formatCurrency(currencyData?.eur?.sell)}</td>
            </tr>
          </tbody>
        </table>
      )}

      {!isTablet && (
        <div className={styles.currencyPeaks}>
          <p>{formatCurrency(currencyData?.usd?.buy)}</p>
          <p>{formatCurrency(currencyData?.eur?.buy)}</p>
        </div>
      )}

      <div className={styles.currencyTableGraph}>
        <img src={chartImage} alt="volume" />
      </div>
    </div>
  );
};

export default Currency;
