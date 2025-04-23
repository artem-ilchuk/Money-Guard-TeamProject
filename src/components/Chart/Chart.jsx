import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "./Chart.module.css";
// import { useSelector } from "react-redux";
// import { selectBalance } from "../../redux/auth/selectors";
// import { selectCategoriesSummary } from "../../redux/statistics/selectors";
import { mockStatistics, mockIsLoading } from "../../mock/statistics";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  // const balance = useSelector(selectBalance);
  // const categoriesData = useSelector(selectCategoriesSummary);
  const statistics = mockStatistics;
  const isLoading = mockIsLoading;

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
  const balance = incomeSummary - expenseSummary;

  const chartData = categoriesData.filter((cat) => cat.name !== "INCOME");

  const data = {
    labels: chartData.map((category) => category.name),
    datasets: [
      {
        data: chartData.map((category) => category.total),
        backgroundColor: chartData.map(
          (category) => categoryColors[category.name] || "#808080"
        ),
        borderColor: "transparent",
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    cutout: "80%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const categoryName = chartData[index]?.name || "";
            const value = context.raw || 0;
            return `${categoryName}: ₺${value.toFixed(2)}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.container}>
      {chartData.length > 0 ? (
        <div className={styles.chartWrapper}>
          <Doughnut data={data} options={options} />
          <div className={styles.balanceDisplay}>
            <p className={styles.balanceAmount}>
              ₴ {balance.toLocaleString("uk-UA", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.noData}>No data available</div>
      )}
    </div>
  );
};

export default Chart;
