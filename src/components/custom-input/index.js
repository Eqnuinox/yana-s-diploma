import React from 'react';
import styles from './customInput.module.css';

const CustomInput = ({value, onChangeValue, type, name}) => {
    return (
        <div className={styles.inputContainer}>
            <p>{name}</p>
            <input type={type} value={value} onChange={onChangeValue}/>
        </div>
    );
};

export default CustomInput;
