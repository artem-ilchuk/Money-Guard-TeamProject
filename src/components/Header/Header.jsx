import s from "./Header.module.css";
import { IoExitOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useMedia from "../../hooks/UseMadia";
import { selectUser, selectIsLoggedIn } from "../../redux/auth/selectors";
import { openLogOutModal } from "../../redux/modal/slice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { isMobile } = useMedia();
  const loggedIn = useSelector(selectIsLoggedIn);

  const handleOpenModal = () => {
    dispatch(openLogOutModal());
  };

  return (
    <section className={s.header}>
      <div className={s.container}>
        <div className={s.content}>
          <Link to="/" className={s.logoLink}>
            <svg className={s.iconLogo}>
              <use href={"/icons.svg#icon-logo"}></use>
            </svg>
            <h3 className={s.title}>Money Guard</h3>
          </Link>
          <div className={s.authMenu}>
            {loggedIn ? (
              <p className={s.userName}>{user.name}</p>
            ) : (
              <p className={s.userName}>Name</p>
            )}
            {!isMobile && <div className={s.line}></div>}
            <div className={s.exit} onClick={handleOpenModal}>
              <IoExitOutline className={s.exitIcon} onClick={handleOpenModal} />
              {!isMobile && <p className={s.exitText}>Exit</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
