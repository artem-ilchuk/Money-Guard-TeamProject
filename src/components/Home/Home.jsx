import Balance from "../Balance/Balance";
import TransactionList from "../TransactionsList/TransactionsList/TransactionsList";
import useMedia from "../../hooks/UseMadia";
import s from "./Home.module.css";

const HomeTab = () => {
  const { isMobile, isTablet, isDesctop } = useMedia();
  return (
    <div>
      <div className={s.nav_balance}>{isMobile && <Balance />}</div>
      <TransactionList />
    </div>
  );
};

export default HomeTab;
