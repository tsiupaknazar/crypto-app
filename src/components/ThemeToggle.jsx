import React, { useContext, useEffect } from "react";
import { HiSun, HiMoon } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { set } from "../store/theme/themeSlice";

const ThemeToggle = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleChange = () => {
    const next = theme === "dark" ? "light" : "dark";
    dispatch(set(next));
  };

  return (
    <div className="p-2">
      {theme === "dark" ? (
        <div className="flex items-center cursor-pointer" onClick={handleChange}>
          <HiSun className="text-primary text-2xl mr-2" /> Light Mode
        </div>
      ) : (
        <div className="flex items-center cursor-pointer" onClick={handleChange}>
          <HiMoon className="text-primary text-2xl mr-2" /> Dark Mode
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
