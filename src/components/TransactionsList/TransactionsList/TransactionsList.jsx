import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isTransError,
  isTransLoading,
  selectTransactions,
} from "../../../redux/transactions/selectors";

const TransactionList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const transactions = useSelector(selectTransactions);
  const loading = useSelector(isTransLoading);
  const error = useSelector(isTransError);

  return <div></div>;
};

export default TransactionList;
