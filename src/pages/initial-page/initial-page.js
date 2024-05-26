import React from 'react';
import styles from './initial.module.css';
import logo from './../../assets/images/logo/logo.svg';
import {CustomButton} from "../../components";

const InitialPage = () => {

    return (
        <div className={styles.container}>
            <header>
                <img src={logo}/>
            </header>
            <div className={styles.main}>
                <h1>Онлайн курс</h1>
                <h2>Навигатор по действиям при <br/>ЧС</h2>
                <p>Безопасность - не подарок, а ответственность</p>
            </div>
            <div className={styles.btnContainer}>
                <CustomButton color={"#FFFFFF"} backgroundColor={"#656ED3"} borderColor={"#656ED3"} route={"login"}
                              name={"Войти"}/>
                <CustomButton color={"#656ED3"} backgroundColor={""} borderColor={"#656ED3"} route={"sign-up"}
                              name={"Зарегестрироваться"}/>
            </div>
        </div>
    );
};

export default InitialPage;
