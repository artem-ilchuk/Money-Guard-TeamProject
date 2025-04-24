import s from "./Header.module.css";
import { IoExitOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import useMedia from "../../hooks/UseMadia";
import { openLogOutModal, openProfileModal } from "../../redux/modal/slice";
import UserAvatar from "../UserAvatar/UserAvatar";

const Header = () => {
  const dispatch = useDispatch();
  const { isMobile } = useMedia();

  const handleEditProfileOpenModal = () => {
    dispatch(openProfileModal());
  };

  const handleLogoutOpenModal = () => {
    dispatch(openLogOutModal());
  };

  return (
    <section className={s.header}>
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.logo}>
            <svg className={s.iconLogo}>
              <use href={"/icons.svg#icon-logo"}></use>
            </svg>
            <h3 className={s.title}>Money Guard</h3>
          </div>
          <div className={s.authMenu}>
            <div className={s.avatar} onClick={handleEditProfileOpenModal}>
              <UserAvatar />
            </div>
            {!isMobile && <div className={s.line}></div>}
            <div className={s.exit} onClick={handleLogoutOpenModal}>
              <IoExitOutline className={s.exitIcon} />
              {!isMobile && <p className={s.exitText}>Exit</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
