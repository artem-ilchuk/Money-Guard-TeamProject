import Header from "../../components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLogOutModalOpen } from "../../redux/modal/selectors";
import { closeLogOutModal } from "../../redux/modal/slice";
import LogOutModal from "../../components/LogOutModal/LogOutModal";

const DashboardPage = () => {
  const isLogOutModalOpen = useSelector(selectIsLogOutModalOpen);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeLogOutModal());
  };

  return (
    <div>
      <Header />
      {isLogOutModalOpen && <LogOutModal closeModal={handleCloseModal} />}
    </div>
  );
};

export default DashboardPage;
