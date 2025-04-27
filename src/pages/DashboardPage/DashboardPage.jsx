import Header from "../../components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsLogOutModalOpen,
  selectIsProfileModalOpen,
} from "../../redux/modal/selectors";
import { closeLogOutModal, closeProfileModal } from "../../redux/modal/slice";
import LogOutModal from "../../components/LogOutModal/LogOutModal";
import Navigation from "../../components/Navigation/Navigation";
import UserModal from "../../components/UserModal/UserModal";
import Currency from "../../components/Currency/Currency";

const DashboardPage = () => {
  const isLogOutModalOpen = useSelector(selectIsLogOutModalOpen);
  const isProfileModalOpen = useSelector(selectIsProfileModalOpen);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeLogOutModal());
  };
  const handleCloseProfile = () => {
    dispatch(closeProfileModal);
  };

  return (
    <div>
      <Header />
      {isLogOutModalOpen && <LogOutModal closeModal={handleCloseModal} />}
      {isProfileModalOpen && <UserModal closeModal={handleCloseProfile} />}
      <Navigation />
      <Currency />
    </div>
  );
};

export default DashboardPage;
