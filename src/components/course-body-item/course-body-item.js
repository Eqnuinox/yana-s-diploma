import React from 'react';
import styles from './CourseBodyItem.module.css';
import courseImg from './../../assets/images/logo/course-img.svg';
import { CustomButton } from '../index';

const CourseBodyItem = ({ list }) => {
    console.log(list);
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <img src={courseImg} />
            </div>
            <div className={styles.infoContainer}>
                <h3>{list.tittle}</h3>
            </div>
            <ul>
                {list?.list?.map((item) => (
                    <li>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default CourseBodyItem;
