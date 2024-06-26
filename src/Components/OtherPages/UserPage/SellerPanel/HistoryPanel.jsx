import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../../Loading/Loading";

// Style
import styles from "./HistoryPanel.module.css";

// Images
import userprof from "../../../../Images/partner2.png";
import phone from "../../../../Images/phone.png";
import instagram from "../../../../Images/instagram.png";
import home from "../../../../Images/home.png";
import edit from "../../../../Images/edit.png";
import exit from "../../../../Images/exit.png";
import attention from "../../../../Images/attantion.png";
import close from "../../../../Images/close.png";
import search from "../../../../Images/search.png";
import pin from "../../../../Images/locationpinforuserpanel.png";

// Components
import Remaningcard from "../Remaining/Remaningcard/Remaningcard";

const HistoryPanel = () => {
    // Gathering data
    const localCN = JSON.parse(localStorage.getItem("OperatorData"));
    const partnerName = localCN.contractParties.name;
    const partnerAddress = localCN.contractParties.address;
    const partnerInsta = localCN.contractParties.instaAddress;
    const partnerLogo = localCN.contractParties.logoAddress;
    const partnerPhone = localCN.contractParties.phone;
    const [load, setload] = useState(false);

    // Save the data
    const [history, setHistory] = useState();

    // Gathering data
    const [data, setData] = useState({
        cardnumber: "",
    });

    const changeHandler = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
        console.log(data);
    };

    const jwtToken = JSON.parse(localStorage.getItem("OperatorToken"));
    const axiosConficPost = {
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + jwtToken,
        },
    };

    // Sending data to the server to get info

    const submitHandler = (event) => {
        event.preventDefault();
        setload(true);
        axios
            .get(
                `https://api.lahzecard.com/api/spentlist/${data.cardnumber}`,
                axiosConficPost
            )
            .then((response) => {
                if (response) {
                    // Get data that must be shown, here. the const is history.
                    setload(false);
                    console.log(response);
                    setHistory(response.data.spentList);
                }
            })

            .catch((errors) => {
                if (errors) {
                    setload(false);
                    console.log(errors);
                }
            });
    };

    // LogoutHandler func and state

    const Navigate = useNavigate();

    const [alert, setAlert] = useState(false);
    const LogoutHandler = () => {
        setAlert(true);
    };

    const logoutCancel = () => {
        setAlert(false);
    };

    const logoutActivate = () => {
        // Delete the user data from the computer.
        localStorage.clear("OperatorData");
        Navigate("/home");
    };

    // navbar funcs and states
    const [navbarAvtive, setNavbarActive] = useState(false);
    const navbarHandler = () => {
        setNavbarActive(!navbarAvtive);
    };

    return (
        <div className={styles.UserPage_Container}>
            {load ? <Loading /> : undefined}
            <section className={styles.right_sec}>
                <section className={styles.user_profile_info}>
                    <img
                        src={partnerLogo ?? partnerLogo}
                        alt="user profile"
                        className={styles.user_prof_img}
                    />
                    <h3>{partnerName ?? partnerName}</h3>
                </section>
                <section className={styles.user_profile_info_phone}>
                    <section>
                        <img
                            src={partnerLogo ?? partnerLogo}
                            alt="user profile"
                            className={styles.user_prof_img}
                        />
                        <h3>{partnerName ?? partnerName}</h3>
                    </section>
                    <div onClick={navbarHandler}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </section>
                <section className={styles.user_info_sec}>
                    <section>
                        <img src={pin} alt="telephone" />
                        <p>{partnerAddress ?? partnerAddress}</p>
                    </section>
                    <section>
                        <img src={phone} alt="telephone" />
                        <p>{partnerPhone ?? partnerPhone}</p>
                    </section>
                    <section>
                        <img src={instagram} alt="instagram" />
                        <p>
                            <a href={partnerInsta}>Instagram Page</a>
                        </p>
                    </section>
                </section>
                <section className={styles.user_btn_sec}>
                    <section>
                        <img src={edit} alt="edit" />
                        <p>ویرایش اطلاعات</p>
                    </section>
                    <section
                        onClick={() => {
                            Navigate("/home");
                        }}
                    >
                        <img src={home} alt="home" />
                        <p>خانه</p>
                    </section>
                    <section onClick={LogoutHandler}>
                        <img src={exit} alt="exit" />
                        <p>خروج از حساب کاربری</p>
                    </section>
                </section>
            </section>
            <section className={styles.left_sec}>
                <section className={styles.threebtn}>
                    <Link to="/UserPage" className={styles.rowbtn1}>
                        <div>فعالسازی</div>
                    </Link>
                    <Link to="/AmountPanel" className={styles.rowbtn2}>
                        <div>موجودی</div>
                    </Link>
                    <Link to="/HistoryPanel" className={styles.rowbtn3}>
                        <div>سوابق</div>
                    </Link>
                </section>
                <section className={styles.threebtninf}>
                    <section className={styles.remaining_input_sec}>
                        <input
                            className={styles.formInput}
                            placeHolder="شماره کارت مد نظر را وارد کنید"
                            type="number"
                            name="cardnumber"
                            value={data.cardnumber}
                            onChange={changeHandler}
                        />
                        <img src={search} alt="" onClick={submitHandler} />
                    </section>
                    <section className={styles.remaining_sec}>
                        <h2>سوابق کارت</h2>
                        {history?.map((service) => (
                            <Remaningcard
                                key={service.id}
                                productData={service}
                            />
                        ))}
                    </section>
                </section>
            </section>
            <div
                className={
                    alert ? styles.alert_div : styles.alert_div_notactive
                }
            >
                <section className={styles.alert_sec}>
                    <div className={styles.alert_div_message}>
                        <img
                            src={attention}
                            alt="green tic for an alert message"
                        />
                        <p>می خواهید از حساب خود خارج شوید؟</p>
                    </div>
                    <div className={styles.alert_btn_div}>
                        <button
                            className={styles.logout_activate}
                            onClick={logoutActivate}
                        >
                            بلی
                        </button>
                        <button
                            className={styles.logout_cancel}
                            onClick={logoutCancel}
                        >
                            خیر
                        </button>
                    </div>
                </section>
            </div>
            <div
                className={
                    navbarAvtive ? styles.navbarAvtive : styles.navbarDeactive
                }
            >
                <img
                    className={styles.nav_close_btn}
                    src={close}
                    alt="close button"
                    onClick={navbarHandler}
                />
                <section className={styles.user_btn_sec_fornav}>
                    <section>
                        <img src={edit} alt="edit" />
                        <p>ویرایش اطلاعات</p>
                    </section>
                    <section
                        onClick={() => {
                            Navigate("/home");
                        }}
                    >
                        <img src={home} alt="home" />
                        <p>خانه</p>
                    </section>
                    <section onClick={LogoutHandler}>
                        <img src={exit} alt="exit" />
                        <p>خروج از حساب کاربری</p>
                    </section>
                </section>
            </div>
        </div>
    );
};

export default HistoryPanel;
