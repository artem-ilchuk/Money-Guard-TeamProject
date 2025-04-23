import s from "./Header.module.css";
import { IoExitOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectIsLoggedIn } from "../../redux/auth/selectors";
import { selectIsLogOutModalOpen } from "../../redux/modal/selectors";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loggedIn = useSelector(selectIsLoggedIn);

  const handleOpenModal = () => {
    dispatch(selectIsLogOutModalOpen());
  };

  return (
    <section className={s.header}>
      <div className="container">
        <div className={s.content}>
          <div className={s.logoThumb}>
            <svg className={s.iconLogo}>
              <use href={"../../../public/icons.svg#icon-logo"}></use>
            </svg>
            <h3 className={s.title}>Money Guard</h3>
          </div>
          <div className={s.authMenu}>
            {loggedIn ? (
              <p className={s.userName}>{user.name}</p>
            ) : (
              <p className={s.userName}>Name</p>
            )}
            <div className={s.line}></div>
            <IoExitOutline
              className={s.exit}
              width="18"
              height="18"
              onClick={handleOpenModal}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
