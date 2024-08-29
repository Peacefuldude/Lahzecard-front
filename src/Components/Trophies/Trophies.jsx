import React from "react";

// Images
import trophies from "../../Images/trophies.png";
import roshd from "../../Images/roshd.png";
import Hologram from "../../Images/Hologram.png";
import samane from "../../Images/samane.png";
import enamad from "../../Images/enamad.png";

// Styles
import styles from "./Trophies.module.css";

const Trophies = () => {
    return (
        <div className={styles.Trophies_Container}>
            <img
                src={trophies}
                alt="example card"
                className={styles.header_pic}
            />
            <section className={styles.pid_sec}>
                <a href="https://ictu.qazvin.iau.ir/">
                    <img src={roshd} alt="roshd org logo" />
                </a>
                <a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=493207&Code=zR1UHy9DrBqxcXyWa9wEk0KVuQwt4Ljv'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=493207&Code=zR1UHy9DrBqxcXyWa9wEk0KVuQwt4Ljv' alt='' style={{cursor:"pointer",width:"auto",height:"auto"}} code='zR1UHy9DrBqxcXyWa9wEk0KVuQwt4Ljv'/></a>                
                <img referrerpolicy='origin' id = 'rgvjfukzoeukjzpesizpjxlz' className={styles.samane} onClick={() => {
                     window.open("https://logo.samandehi.ir/Verify.aspx?id=368791&p=xlaogvkamcsijyoepfvlrfth", "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")
                }}
                alt = 'logo-samandehi' src = 'https://logo.samandehi.ir/logo.aspx?id=368791&p=qftiwlbqaqgwyndtbsiynbpd' />
                <img
                    className={styles.Hologram_img}
                    src={Hologram}
                    alt="roshd org logo"
                />
                {/* <img src={enamad} alt="enamad logo" /> */}
                {/* <img src={samane} alt="sabt org logo" /> */}
            </section>
        </div>
    );
};

export default Trophies;
