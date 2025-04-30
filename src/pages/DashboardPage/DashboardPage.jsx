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
import { Outlet } from "react-router-dom";
import useMedia from "../../hooks/UseMadia";
import Balance from "../../components/Balance/Balance";
import Currency from "../../components/Currency/Currency";
import s from "./Dashboard.module.css";
import { useLocation } from "react-router-dom";
import { selectIsAddModalOpen, selectIsEditModalOpen } from "../../redux/modal/selectors";
import ModalAddTransaction from "../../components/ModalAddTransaction/ModalAddTransaction";
import ModalEditTransaction from "../../components/ModalEditTransaction/ModalEditTransaction";

const DashboardPage = () => {
  const isLogOutModalOpen = useSelector(selectIsLogOutModalOpen);
  const isProfileModalOpen = useSelector(selectIsProfileModalOpen);
  const isEditModalOpen = useSelector(selectIsEditModalOpen);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeLogOutModal());
  };
  const handleCloseProfile = () => {
    dispatch(closeProfileModal());
  };

	const { isMobile, isTablet, isDesktop } = useMedia();
  const isAddModalOpen = useSelector(selectIsAddModalOpen);
	
	const location = useLocation();
  const isHome = location.pathname === "/dashboard/home";
  const isCurrency = location.pathname === "/dashboard/currency";

  return (
    <div>
      <Header />
      {isLogOutModalOpen && <LogOutModal closeModal={handleCloseModal} />}
      {isProfileModalOpen && <UserModal closeModal={handleCloseProfile} />}
      {isAddModalOpen && <ModalAddTransaction />}
      {isEditModalOpen && <ModalEditTransaction />}
      <section className={s.main_container}>
        <div className={isTablet || isDesktop ? s.nav_container : undefined}>
          <div
            className={`${isHome ? s.navHome : ""} ${
              isCurrency ? s.navCurrency : ""
            }`}
          >
            <Navigation />
            {(isTablet || isDesktop) && <Balance />}
          </div>
          {(isTablet || isDesktop) && <Currency />}
        </div>
        <Outlet />
      </section>
    </div>
  );
};

export default DashboardPage;
