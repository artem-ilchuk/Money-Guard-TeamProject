import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <p className={s.notFound}>404</p>
        <p className={s.text}>Page not found!</p>
        <button className={s.multiColorButton}>
          <Link to="/dashboard/home" className={s.link}>
            GO HOME
          </Link>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
