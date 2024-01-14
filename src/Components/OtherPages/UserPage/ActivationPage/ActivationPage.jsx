import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AudioRecorder } from 'react-audio-voice-recorder';

// Style
import styles from './ActivationPage.module.css'

// Images
import userlogo from '../../../../Images/partner2.png'
import instagram from '../../../../Images/instagram.png'
import phone from '../../../../Images/phone.png'
import website from '../../../../Images/website.png'
import map from '../../../../Images/map.png'
import attetiongrey from '../../../../Images/attentiongrey.png'
import trash from '../../../../Images/trash.png'
import step1 from '../../../../Images/activationpage1.png'
import step2 from '../../../../Images/activationpage2.png'

// Componentes

const ActivationPage = () => {

    const Navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("CustomerData")) {
            Navigate("/home");
        }
    }, []);

    // Voice recording Funcs and 
    const [theVoice, setTheVoice] = useState()
    const [voiceFile, setVoiceFile] = useState(false);
    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        setTheVoice(blob);
        console.log(blob);
        audio.controls = true;
        if (voiceFile) return
        document.getElementById("voiceRec").appendChild(audio);
        setVoiceFile(true);
    };

    const removeChildHandler = () => {
        setVoiceFile(false)
        const parent =  document.getElementById("voiceRec");
        parent.removeChild(parent.firstElementChild);
    }

    // Gathering data

    const [data, setData] = useState({
        text: "",
    });

    const changeHandler = (event) => {
        setData({
            ...data, [event.target.name]: event.target.value,
        });
    }

    // Getting card info
    const axiosConficGet = {
        headers: {
            "Content-type": "application/json",
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Headers":"*",
            // "Access-Control-Allow-Methods":"*"
        },
    };

    const localCN = localStorage.getItem('CustomerData');
    const [partnerName, setPartnerName] = useState()
    const [partnerNumber, setPartnerNumber] = useState()
    const [partnerInsta, setPartnerInsta] = useState()
    const [partnerLogo, setPartnerLogo] = useState()

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

    // Sending Voice message
    const [buttonDisable, setButtonDisable] = useState(false);

    const axiosConficPost = {
        headers: {
            'accept': '*/*',
            'Content-Type': 'multipart/form-data',
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0OWZlMTk3My03NjdjLTQ0Y2YtYmM4OC03Njc4ZWE2ZmE3NmQiLCJwaG9uZSI6IjA5MDM3MTU4NzU1Iiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MDEyMDQyNjN9.8kf5qMIyfnwgZPOJK3V_Xk-baUhhJs1jeEWnjtYHyTg",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":"*",
        },
    };

    const submitHandler = (event) => {
        event.preventDefault();
        let formeData = new FormData();
        formeData.append("text", data.text);
        formeData.append("voice", theVoice);
        // Log the formdata
        for (var pair of formeData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }    
        setButtonDisable(true)
        axios.post(`https://api.lahzecard.com/api/user/uploadData?cardNumber=${localCN.slice(1, -1)}`, formeData, axiosConficPost)
            .then((response)=> {
                alert("پیام و ویس شما با موفقیت آپلود شد. زمان تقریبی تایید آن: یک روز")
                console.log(response);
                setTimeout(() => Navigate("/home"), 100);
            })

            .catch((errors)=> {
                console.log(errors)
                setButtonDisable(false)
            })

    }

    // Rules Norif section funcs and states
    const [notif, setNotif] = useState(true);
    
    return ( 
        <div className={styles.ActivationPage_Container}>
            { notif ?
                <section className={styles.RulesNotif_sec}>
                    <div className={styles.rules_div}>
                        <h2>قوانین و مقررات</h2>
                        <p>متن یا صدا نباید ناقص قوانین و مقررات حال حاضر کشور باشند.</p>
                        <p>از آپلود صدای خوانندگان یا آهنگ خودداری کنید.</p>
                        <p>امکان استفاده از اسما جلاله، آیات متبرک قرآن، ادعیه، اسامی و القاب امامان و معصومین وجود ندارد.</p>
                        <p>استارت آپ لحظه کارت بر اساس الزامات و قوانین حاکم، اختیار تام در تایید یا رد صدا و متن ثبت شده و در حال بارگذاری را دارد.</p>
                        <p>تمامی جریان های مالی بین مشتری و فروشنده کارت لحظه کارت می باشد و استارت آپ لحظه کارت هیچ مسئولیتی در این قبال ندارد.</p>
                        <p>به دلیل موارد امنیتی پس از ثبت صدا و متن امکان پاک کردن و ادیت کردن آن از جانب شما وجود ندارد.</p>
                        <div>
                            <button className={styles.cancel_btn} onClick={()=>{Navigate("/home")}}>انصراف</button>
                            <button className={styles.accept_btn} onClick={()=>{setNotif(false)}}>می پذیرم</button>
                        </div>
                    </div>
                </section>
                :
                undefined
            }
            <section className={styles.right_sec}>
                <img src={step1} alt="first step" />
            </section>
            <section className={styles.left_sec}>
                <div className={styles.activation_info_div}>
                    <section className={styles.activation_info_div_sec_img}>
                        <img src={partnerLogo ?? partnerLogo} alt="user logo" />
                    </section>
                    <section className={styles.activation_info_div_sec_info}>
                        <h2>{partnerName ?? partnerName}</h2>
                        <div className={styles.activation_info_div_sec_info_div}>
                            <div className={styles.removeinphone}>
                                <img src={website} alt="user info" />
                                <p>website</p>
                            </div>
                            <div>
                                <img src={instagram} alt="user info" />
                                <p><a href={partnerInsta ?? partnerInsta}>Instagram Page</a></p>
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
                            placeholder="متن پیام دلخواه"
                            type='text'
                            name='text'
                            value={data.text}
                            onChange={changeHandler}
                        />
                    </section>
                    <section className={styles.voice_input_sec} id="voiceRec">
                        { voiceFile ?
                            <div className={styles.trash_icon} onClick={removeChildHandler}>
                                <img src={trash} alt="trash icon" />
                            </div>
                                : 
                            <AudioRecorder
                                onRecordingComplete={addAudioElement}
                                audioTrackConstraints={{
                                    noiseSuppression: true,
                                    echoCancellation: true,
                                }} 
                                // True the elemnt below to make the auto  possible
                                downloadOnSavePress={false}
                                downloadFileExtension="webm"
                            />
                        }
                        {/* THe Audio file will be created here: */}
                    </section>
                    <section className={styles.btn_sec}>
                        <div>
                            <img src={attetiongrey} alt="attention sign" />
                            <p>در صورت نقض قوانین جمهوری اسلامی صدای شما حذف می شود.</p>
                        </div>
                        { buttonDisable ? 
                            undefined
                            :
                            <button className={styles.submit_btn} onClick={submitHandler}>
                                ثبت پیام
                            </button>
                        }
                    </section>
                </div>
            </section>
        </div>
     );
}
 
export default ActivationPage;