import s from "./Navigation.module.css";
import { IoMdHome } from "react-icons/io";
import { TbTimeline } from "react-icons/tb";
import { BsCurrencyDollar } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const getNavLinkClass = ({ isActive }) =>
  isActive ? s.navLinkActive : s.navLink;

const Navigation = () => {
  return (
    <section className={s.navigation}>
      <div className={s.container}>
        <NavLink to="/home" className={getNavLinkClass}>
          <div className={s.transactions}>
            <IoMdHome className={s.homeIcon} />
          </div>
        </NavLink>
        <NavLink to="/statistics" className={getNavLinkClass}>
          <div className={s.statistics}>
            <TbTimeline className={s.statsIcon} />
          </div>
        </NavLink>
        <NavLink to="/currency" className={getNavLinkClass}>
          <div className={s.currency}>
            <BsCurrencyDollar className={s.currIcon} />
          </div>
        </NavLink>
      </div>
    </section>
  );
};

export default Navigation;
