import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { closeProfileModal } from "../../redux/modal/slice";
import s from "./UserModal.module.css";
import { selectUser } from "../../redux/auth/selectors";

const UserModal = () => {
  const dispatch = useDispatch();
  const { name: currentName, avatar: currentAvatar } = useSelector(selectUser);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: currentName },
    mode: "onChange",
  });

  const [avatar, setAvatar] = useState(currentAvatar);
  const [file, setFile] = useState(null);

  const watchedName = watch("name");

  const onSubmit = (data) => {
    if (!data.name.trim()) return;

    const formData = new FormData();
    formData.append("name", data.name);
    if (file) {
      formData.append("avatar", file);
    }

    // dispatch(updateUserThunk(formData)); 
    dispatch(closeProfileModal());
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setAvatar(URL.createObjectURL(file));
    }
  };

  const closeModal = () => dispatch(closeProfileModal());

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <button className={s.closeBtn} onClick={closeModal}>
          ✕
        </button>
        <p className={s.text}>Edit profile</p>

        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <label className={s.avatarLabel}>
            <img src={avatar} alt="Avatar" className={s.avatarPreview} />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className={s.hiddenFileInput}
            />
            <div className={s.plusIcon}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 3.11108V10.8889" stroke="#161616" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M3.11035 7H10.8881" stroke="#161616" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
</svg></div>
          </label>

         <div className={s.labelBox}>
              <input
                {...register("name", { required: "Name is required", pattern: {
                    value: /^[A-Za-z\s'-]+$/,
                    message: "Error: You can add only letters",
                  }, 
                })}
                placeholder="Enter your name"
                defaultValue={currentName}
                className={`${s.input} ${errors.name ? s.errorInput : ''}`}
              />
              {errors.name && (
                <p className={s.error}>{errors.name.message}</p>
              )}
         </div>

          <button type="submit" className={s.saveBtn} disabled={!watchedName || !!errors.name}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
