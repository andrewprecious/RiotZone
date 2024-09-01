import React from "react";
import appStyles from "../../App.module.css";
import navbarStyles from "./navbar.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth(); // Added logout function from useAuth
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <header
        className={`${navbarStyles.header} ${appStyles.bgDark} ${appStyles.textWhite}`}
      >
        <nav className={`${navbarStyles.nav} ${appStyles.container}`}>
          <div className={`${navbarStyles.navLogo}`}>
            <Link>
              <img
                src="/runwayRiotLogo.png"
                alt="runwayRiotLogo"
                className={`${appStyles.responsiveImg}`}
              />
            </Link>
            {user && <p>{user.email}</p>}
          </div>

          <div
            className={`${navbarStyles.navLinks} ${
              isOpen ? navbarStyles.open : ""
            }`}
          >
            <div className={`${navbarStyles.close}`} onClick={handleClose}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </div>
            <Link
              to="/"
              className={`${appStyles.textWhite}  ${appStyles.robotoRegular}`}
            >
              Home
            </Link>
            <Link
              to="/contact"
              className={`${appStyles.textWhite}  ${appStyles.robotoRegular}`}
            >
              Contact
            </Link>

            <Link
              to="/about"
              className={`${appStyles.textWhite}  ${appStyles.robotoRegular}`}
            >
              About
            </Link>

            <Link
              to="/"
              className={`${appStyles.textWhite}  ${appStyles.robotoRegular}`}
            >
              Categories
            </Link>

            {user ? (
              <Link
                onClick={logout}
                className={`${appStyles.textWhite}  ${appStyles.robotoRegular}`}
              >
                logout
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className={`${appStyles.textWhite}  ${appStyles.robotoRegular}`}
                >
                  Register
                </Link>

                <Link
                  to="/login"
                  className={`${appStyles.textWhite}  ${appStyles.robotoRegular}`}
                >
                  Login
                </Link>
              </>
            )}
          </div>

          <div className={navbarStyles.hambuger} onClick={handleOpen}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
