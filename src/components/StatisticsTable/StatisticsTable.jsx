import styles from "./StatisticsTable.module.css";
// import { useSelector } from "react-redux";
// import { selectCategoriesSummary, selectSummaryTotals } from "../../redux/statistics/selectors";
// import { mockStatistics, mockIsLoading } from "../../mock/statistics";

const StatisticsTable = () => {
  // const categoriesData = useSelector(selectCategoriesSummary);
  // const { incomeSummary, expenseSummary } = useSelector(selectSummaryTotals);
  const statistics = mockStatistics;
  const isLoading = mockIsLoading;

  const formatNumber = (number) => {
    if (!number && number !== 0) return "0.00";
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const categoryColors = {
    "Main expenses": "#FFD700",
    Products: "#FFCCCB",
    Car: "#FFA07A",
    "Self care": "#D8BFD8",
    "Child care": "#ADD8E6",
    "Household products": "#4682B4",
    Education: "#AFEEEE",
    Leisure: "#00FA9A",
    "Other expenses": "#00CED1",
  };

  if (isLoading) {
    return <div className={styles.container}>Loading...</div>;
  }

  const categoriesData = statistics.categoriesSummary || [];
  const expenseSummary = statistics.expenseSummary || 0;
  const incomeSummary = statistics.incomeSummary || 0;

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div className={styles.categoryHeader}>Category</div>
        <div className={styles.sumHeader}>Sum</div>
      </div>

      <div className={styles.tableBody}>
        {categoriesData
          .filter((category) => category.name !== "INCOME")
          .map((category) => (
            <div key={category.name} className={styles.tableRow}>
              <div className={styles.categoryCell}>
                <div
                  className={styles.colorIndicator}
                  style={{
                    backgroundColor: categoryColors[category.name] || "#808080",
                  }}
                ></div>
                {category.name}
              </div>
              <div className={styles.sumCell}>
                {formatNumber(category.total)}
              </div>
            </div>
          ))}
      </div>

      <div className={styles.tableSummary}>
        <div className={styles.summaryRow}>
          <div className={styles.summaryLabel}>Expenses:</div>
          <div className={styles.expensesValue}>
            {formatNumber(expenseSummary)}
          </div>
        </div>
        <div className={styles.summaryRow}>
          <div className={styles.summaryLabel}>Income:</div>
          <div className={styles.incomeValue}>
            {formatNumber(incomeSummary)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTable;
