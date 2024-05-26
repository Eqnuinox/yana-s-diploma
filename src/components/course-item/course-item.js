import React from 'react';
import styles from './courseItem.module.css';
import courseImg from './../../assets/images/logo/course-img.svg';
import {CustomButton} from "../index";

const CourseItem = ({name, description, url}) => {
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <img src={courseImg}/>
            </div>
            <div className={styles.infoContainer}>
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
            <div className={styles.btnContainer}>
                <CustomButton name="Пройти курс" borderRadius={56} backgroundColor="rgba(205, 16, 255, 1)" color="#FFF" borderColor="rgba(205, 16, 255, 1)"/>
            </div>
        </div>
    );
};

export default CourseItem;
