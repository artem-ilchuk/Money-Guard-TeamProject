import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { useState, useEffect } from "react";
import styles from "./LogOutModal.module.css";

import FormButton from "../FormButton/FormButton";

const LogOutModal = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const addCloseEvent = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", addCloseEvent);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", addCloseEvent);
    };
  }, [closeModal]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout())
      .then(() => closeModal())
      .catch((error) => console.error("Logout failed", error));
  };

  const closeOnClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={styles.overlay} onClick={closeOnClickOutside}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={closeModal}></button>

        <svg className={styles.iconLogo}>
          <use href={"../../../public/icons.svg#icon-logo"}></use>
        </svg>

        <p className={styles.text}>Are you sure you want to log out?</p>

        <div className={styles.buttons}>
          <FormButton text="Logout" handlerFunction={handleLogout} />
          <FormButton
            text="Cancel"
            handlerFunction={closeModal}
            variant="whiteButton"
          />
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
