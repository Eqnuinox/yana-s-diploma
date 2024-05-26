import React from 'react';
import styles from './customBtn.module.css';
import { Link } from 'react-router-dom';

const CustomButton = ({
    name,
    route,
    color,
    backgroundColor,
    borderColor,
    borderRadius,
    width,
    onSubmit
}) => {
    return (
        <Link
            to={route}
            onClick={onSubmit}
            className={styles.container}
            style={{
                color: color,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderRadius: borderRadius,
                width: width,
                padding: width && 12,
                textAlign: width && 'center'
            }}
        >
            <span>{name}</span>
        </Link>
    );
};

export default CustomButton;
