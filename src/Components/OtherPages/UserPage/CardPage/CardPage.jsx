import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AudioRecorder } from 'react-audio-voice-recorder';

// Styles
import styles from './CardPage.module.css'

// Images
import userlogo from '../../../../Images/partner2.png'
import instagram from '../../../../Images/instagram.png'
import phone from '../../../../Images/phone.png'
import website from '../../../../Images/website.png'
import map from '../../../../Images/map.png'
import attetiongrey from '../../../../Images/attentiongrey.png'
import trash from '../../../../Images/trash.png'
import cardexample from '../../../../Images/cardexampleforuser.png'

const CardPage = () => {

    // Getting card info
    const axiosConficGet = {
        headers: {
            "Content-type": "application/json",
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Headers":"*",
            // "Access-Control-Allow-Methods":"*"
        },
    };

    const localCN = localStorage.getItem('GiftData');
    const [partnerName, setPartnerName] = useState()
    const [partnerNumber, setPartnerNumber] = useState()
    const [partnerInsta, setPartnerInsta] = useState()
    const [partnerLogo, setPartnerLogo] = useState()
    const [cardText, setCardText] = useState()
    const [cardVoice, setCardVoice] = useState()
    const [cardAmount, setCardAmount] = useState()

    useEffect(()=> {
        const getCardInfo = (event) => {
            axios.get(`https://api.lahzecard.com/api/user/NotFilter${localCN.slice(1, -1)}`, axiosConficGet)
                .then((response)=> {
                    if (response) {
                        // console.log(response);
                        setPartnerName(response.data.cardInfo.contractParties.name)
                        setPartnerNumber(response.data.cardInfo.contractParties.phone)
                        setPartnerInsta(response.data.cardInfo.contractParties.instaAddress)
                        setPartnerLogo(response.data.cardInfo.contractParties.logoAddress)
                        setCardText(response.data.cardInfo.text)
                        setCardVoice(response.data.cardInfo.voice)
                        setCardAmount(response.data.cardInfo.primaryAmount)
                    }
                })
    
                .catch((errors)=> {
                    if (errors) {
                        console.log(errors);
                        alert('مشکلی پیش آمده. دوباره امتحان کنید.')
                    }
                })
        }
    
        getCardInfo();

    }, [])
    
    return ( 
        <div className={styles.CardPage_Container}>
            <section className={styles.right_sec}>
                <img src={cardexample} alt="user card example" className={styles.cardexampleforuser}/>
                <section className={styles.leftover_sec}>
                    <section className={styles.leftover_percent_sec}>
                        <p>25%</p>
                    </section>
                </section>
                <section className={styles.info_sec}>
                    <div>
                        <p>موجودیه اولیه:</p>
                        {cardAmount && <p>{cardAmount} ریال</p>}
                    </div>
                    <div>
                        <p>موجودیه باقی مانده:</p>
                        <p>125.000.000 ریال</p>
                    </div>
                </section>
            </section>
            <section className={styles.left_sec}>
                <div className={styles.activation_info_div}>
                    <section className={styles.activation_info_div_sec_img}>
                        <img src={partnerLogo ?? partnerLogo} alt="user logo" />
                    </section>
                    <section className={styles.activation_info_div_sec_info}>
                        <h2>{partnerName ?? partnerName}</h2>
                        <div className={styles.activation_info_div_sec_info_div}>
                            <div>
                                <img src={website} alt="user info" />
                                <p>website</p>
                            </div>
                            <div>
                                <img src={instagram} alt="user info" />
                                <p><a href={partnerInsta ?? partnerInsta}>instagram Page</a></p>
                            </div>
                            <div>
                                <img src={phone} alt="user info" />
                                <p>{partnerNumber ?? partnerNumber}</p>
                            </div>
                        </div>
                    </section>
                </div>
                <div className={styles.activation_input_div}>
                    <img src={map} alt="user map address" className={styles.user_map_address}/>
                    <section className={styles.activation_input_sec}>
                        <input
                            className={styles.activation_input}
                            type='text'
                            name='text'
                            value={cardText && cardText}
                            disabled
                        />
                    </section>
                    <section className={styles.voice_input_sec} id="voiceRec">
                        <audio src={cardVoice && cardVoice} controls></audio>                        
                    </section>
                </div>
            </section>
        </div>
     );
}
 
export default CardPage;