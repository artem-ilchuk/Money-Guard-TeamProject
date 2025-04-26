import { useSelector } from "react-redux";
import React from "react";
import { selectUser, selectIsLoggedIn } from "../../redux/auth/selectors";

const UserAvatar = ({ size = 32, fontSize = 14, borderRadius = 8, customAvatar = null }) => {
  const user = useSelector(selectUser);
  const loggedIn = useSelector(selectIsLoggedIn);

  const getInitial = (name) => name.trim()?.[0]?.toUpperCase() || "?";

  const initial = loggedIn && user.name ? getInitial(user.name) : null;

  const getRandomHexColor = () =>
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");

  const getPastelColor = () => {
    const r = Math.floor(Math.random() * 127 + 127);
    const g = Math.floor(Math.random() * 127 + 127);
    const b = Math.floor(Math.random() * 127 + 127);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const styles = {
    wrapper: {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: `${borderRadius}px`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-family)",
      fontSize: `${fontSize}px`,
      fontWeight: "500",
      color: getRandomHexColor(),
      backgroundColor: getPastelColor(),
      border: `2px solid ${getPastelColor()}`,
      overflow: "hidden",
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: `${borderRadius}px`,
    },
    anonimys: {
      fontWeight: "400",
      fontSize: "16px",
      color: "var(--white-600)",
    },
  };

  if (!loggedIn) {
    return <div style={styles.anonimys}>Name</div>;
  }

  const avatarSrc = customAvatar || user.avatar;

  return (
    <div style={styles.wrapper}>
      {avatarSrc ? (
        <img src={avatarSrc} alt="User avatar" style={styles.img} />
      ) : (
        initial
      )}
    </div>
  );
};

export default UserAvatar;
