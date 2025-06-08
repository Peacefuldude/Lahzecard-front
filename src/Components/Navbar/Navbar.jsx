import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "./Navbar.module.css";

// Images
import logo from "../../Images/logo3.png";
import close from "../../Images/close.png";
import char from "../../Images/char.png";
import langu from "../../Images/language.png"

//multilanguage
import { useTranslation } from 'react-i18next';
import t from "../../../src/Multilanguage.jsx";


const Navbar = () => {


    const [open, setOpen] = useState(false);
        //multi language
        const { t, i18n } = useTranslation();

        const changeLanguage = (lng) => {
            localStorage.setItem("language", lng);
          i18n.changeLanguage(lng);
          setOpen(!open)
          if (lng === 'ir' || lng === 'ar') {
            document.documentElement.dir = 'rtl';
          } else {
            document.documentElement.dir = 'ltr';
          }
        };

    // Hamburge menu functions
    const [active, setActive] = useState(false);
    const hamHandler = () => {
        setActive(!active);
    };

    // url check
    const [pathIsHome, setPathIsHome] = useState(false);
    useEffect(() => {
        localStorage.setItem("language", "ir");

        if (window.location.pathname === "/home") {
            setPathIsHome(!pathIsHome);
        }
    }, []);

    return (
        <div className={styles.Navbar_container}>
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
                                <button className={styles.btn_nav}>
                                    {t('home')}
                                    </button>
                            </Link>
                        )}
                        <Link to="/Coop">
                            <button className={styles.btn_nav}>
                            {t('workwithus')}
                            </button>
                        </Link>
                        <Link to="/QandAPage">
                            <button className={styles.btn_nav}>
                              {t('faq')}
                            </button>
                        </Link>
                        <Link to="/AboutUs">
                            <button className={styles.btn_nav}>
                              {t('aboutus')}
                            </button>
                        </Link>
                        <Link to="/customer">
                            <button className={styles.btn_account}>
                                <img src={char} alt="cup icon" />
                                {t('login')}
                            </button>
                        </Link>
                        <div className={styles.dropdowncontainer}>
                        <button onClick={() => setOpen(!open)} className={styles.dropdownbutton}>
                        <img src={langu} alt="language icon" />
                        <section  className={
                        active ? styles.nothing : styles.ham_options_off
                    }>
                            {t('language')}
                        </section>
                        </button>

                        {open && (
                            <ul className={styles.dropdownmenu}>
                                <li className={styles.dropdownitem}>
                                    <button onClick={() => changeLanguage('gr')}>Duetsch</button> 
                                </li>
                                <li className={styles.dropdownitem}>
                                    <button onClick={() => changeLanguage('en')}>English</button> 
                                </li>
                                <li className={styles.dropdownitem}>
                                    <button onClick={() => changeLanguage('ir')}>فارسی</button>
                                </li>
                                <li className={styles.dropdownitem}>
                                    <button onClick={() => changeLanguage('ar')}>العربی</button> 
                                </li>
                            </ul>
                        )}
                        </div>

                        {/* <section>
                        <button onClick={() => changeLanguage('en')}>English</button> 
                        <button onClick={() => changeLanguage('ir')}>فارسی</button>
                        <button onClick={() => changeLanguage('ar')}>العربی</button> 
                        <button onClick={() => changeLanguage('gr')}>Duetsch</button> 

 
                        </section> */}

                    </section>
                </section>
                <div className={styles.HanMenu} onClick={hamHandler}>
                    <div className={styles.ham_btn}></div>
                    <div className={styles.ham_btn}></div>
                    <div className={styles.ham_btn}></div>
                </div>
                <div></div>
                <div
                    className={
                        active ? styles.ham_options : styles.ham_options_off
                    }
                >
                    <div className={styles.ham_options_div}>
                        <img onClick={hamHandler} src={close} />
                        <div></div>
                        <Link to="/home">
                            <button className={styles.btn_nav_ham}>
                            {t('home')}
                            </button>
                        </Link>
                        <Link to="/AboutUs">
                            <button className={styles.btn_nav_ham}>
                            {t('aboutus')}
                            </button>
                        </Link>
                        <Link to="/Coop">
                            <button className={styles.btn_nav_ham}>
                            {t('workwithus')}
                            </button>
                        </Link>
                        <div></div>
                        <Link to="/customer">
                            <button className={styles.btn_nav_ham}>
                                <img
                                    className={styles.btn_nav_ham_img}
                                    src={char}
                                    alt="cup icon"
                                />
                                {t('login')}
                            </button>
                        </Link>
                        <div></div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
