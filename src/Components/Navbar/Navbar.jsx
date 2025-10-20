import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Styles
import styles from "./Navbar.module.css";

// Images
import logo from "../../Images/logo3.png";
// import close from "../../Images/close.png";
import char from "../../Images/char.png";
import langu from "../../Images/language.png";
import close from "../../Images/hamburger-menu-closed.svg";
import opened from "../../Images/hamburger_menu_open.svg";

//multilanguage
import { useTranslation } from "react-i18next";
import t from "../../../src/Multilanguage.jsx";
import { act } from "react";

//drop down
import IR from "../../Images/dropdown/IR.svg";
import EN from "../../Images/dropdown/UK.svg";
import AR from "../../Images/dropdown/AR.svg";
import DE from "../../Images/dropdown/DE.svg";
import arrow from "../../Images/dropdown/closed_dropdown.svg";

const Navbar = () => {
  const location = useLocation().pathname;

  const languages = [
    { code: "FA", label: "ir", flag: IR },
    { code: "EN", label: "en-US", flag: EN },
    { code: "AR", label: "ar", flag: AR },
    { code: "DE", label: "gr", flag: DE },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const [isRTL, setIsRTL] = useState(
    localStorage.getItem("i18nextLng") === "ir" ||
      localStorage.getItem("i18nextLng") === "ar"
  );

  const [open, setOpen] = useState(false);
  const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(false);

  //multi language
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    // localStorage.setItem("language", lng);
    i18n.changeLanguage(lng);
    setOpen(!open);
    // setActive(false)
    if (
      lng === "ir" ||
      lng === "ar" ||
      localStorage.getItem("i18nextLng") === "ar" ||
      localStorage.getItem("i18nextLng") === "ir"
    ) {
      document.documentElement.dir = "rtl";
      setIsRTL(true);
      console.log(isRTL);
    } else {
      document.documentElement.dir = "ltr";
      setIsRTL(false);
    }
  };
  useEffect(() => {
    console.log(i18n.language);
    
    const handleResize = () => {
      setIsTabletOrSmaller(window.innerWidth <= 950);
    };

    // Set initial value
    handleResize();

    // Attach resize listener
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Hamburge menu functions
  const [active, setActive] = useState(false);
  const hamHandler = () => {
    console.log(active, "ham menu");
    setOpen(false);
    setActive(!active);
  };

  // url check
  const [pathIsHome, setPathIsHome] = useState(false);
  useEffect(() => {
    if (window.location.pathname === "/home") {
      setPathIsHome(!pathIsHome);
    }
  }, []);

  return (
    <div
      className={styles.Navbar_container}
      style={{
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <nav>
        <section className={styles.navbared}>
          {" "}
          {/* <div></div> */}
          <section className={styles.logo}>
            <a href="/home">
              <img src={logo} alt="logo" />
            </a>
          </section>
          {/* <div></div>
                <div></div> */}
          <section className={styles.btnvip}>
            {pathIsHome ? (
              ""
            ) : (
              <Link to="/home">
                <button className={styles.btn_nav}>{t("home")}</button>
              </Link>
            )}
            <Link to="/Coop">
              <button className={styles.btn_nav}>{t("workwithus")}</button>
            </Link>
            <Link to="/QandAPage">
              <button className={styles.btn_nav}>{t("faq")}</button>
            </Link>
            <Link to="/AboutUs">
              <button className={styles.btn_nav}>{t("aboutus")}</button>
            </Link>
            <Link to="/customer">
              <button className={styles.btn_account}>
                <img src={char} alt="cup icon" />
                {t("login")}
              </button>
            </Link>

            {/* -------- DropDown --------- */}

            <div
              className={`${styles.dropdown} ${open ? styles.open : ""}`}
              style={{
                direction: isRTL ? "rtl" : "ltr",
              }}
            >
              <div
                className={styles.dropdown_icon}
                onClick={() => {
                  setOpen(!open);
                  setActive(false);
                }}
              >
                <img
                  src={arrow} 
                  alt="dropdown arrow"
                  className={`${styles.dropdown_arrow} ${
                    open ? styles.rotate : ""
                  }`}
                />
                {languages
                  .filter((lng) => lng.label === i18n.language)
                  .map((lng) => (
                    <img key={lng.code} src={lng.flag} alt={lng.label} />
                  ))}
              </div>

              <div
                className={`${styles.dropdown_container} ${
                  open ? styles.open : ""
                }`}
              >
                {languages
                  .filter((lng) => lng.label !== i18n.language)
                  .map((lng) => (
                    <div
                      key={lng.code}
                      className={styles.dropdown_item}
                      onClick={() => changeLanguage(lng.label)}
                    >
                      <div>{lng.code}</div>

                      <img src={lng.flag} alt={lng.label} />
                    </div>
                  ))}
              </div>
            </div>

            {/* <section>
                        <button onClick={() => changeLanguage('en')}>English</button> 
                        <button onClick={() => changeLanguage('ir')}>فارسی</button>
                        <button onClick={() => changeLanguage('ar')}>العربی</button> 
                        <button onClick={() => changeLanguage('gr')}>Duetsch</button> 

 
                        </section> */}
          </section>
        </section>

        <img
          onClick={hamHandler}
          className={`${!isTabletOrSmaller ? styles.HanMenu : undefined}`}
          style={{
            rotate: !isRTL ? "180deg" : "",
          }}
          src={active ? opened : close}
          alt={active ? "menu open" : "menu closed"}
        />
        <div></div>
      </nav>
      <div className={`${styles.HamMenu_wrapper} ${active ? styles.open : ""}`}>
        <div className={`${styles.HamMenu_list} `}>
          <div className={styles.ham_options_container}>
            <Link to="/AboutUs">
              <div>{t("aboutus")}</div>
            </Link>
            <Link to="/Coop">
              <div>{t("workwithus")}</div>
            </Link>
            <Link to="/QandAPage">
              <div>{t("faq")}</div>
            </Link>
          </div>
          <div className={styles.hamMenu_button}>
            <div>
              <Link to={"/customer"}>{t("gift_prepration")}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
