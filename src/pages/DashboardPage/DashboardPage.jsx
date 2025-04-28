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
import Currency from '../../components/Currency/Currency'
import s from './Dashboard.module.css'

const DashboardPage = () => {
  const isLogOutModalOpen = useSelector(selectIsLogOutModalOpen);
  const isProfileModalOpen = useSelector(selectIsProfileModalOpen);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeLogOutModal());
  };
  const handleCloseProfile = () => {
    dispatch(closeProfileModal());
	};
	
	const { isMobile, isTablet, isDesktop } = useMedia();

  return (
    <div>
      <Header />
      {isLogOutModalOpen && <LogOutModal closeModal={handleCloseModal} />}
      {isProfileModalOpen && <UserModal closeModal={handleCloseProfile} />}
      <div className={s.main_container}>
        <div className={s.nav_container}>
          <div className={s.nav_balance}>
            <Navigation />
            {(isTablet || isDesktop) && (<Balance />)}
          </div>
          {(isTablet || isDesktop) && <Currency />}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
