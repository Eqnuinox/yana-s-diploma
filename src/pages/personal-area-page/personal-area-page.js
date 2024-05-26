import React from 'react';
import styles from './personalArea.module.css';
import logo from '../../assets/images/logo/logo-white.svg';
import CustomBtn from '../../components/custom-btn';
import { CourseItem } from '../../components';
import { authAPI } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { authSlice } from '../../store/reducesrs/AuthSlice';
import { useNavigate } from 'react-router-dom';

const PersonalAreaPage = () => {
    const courses = [
        {
            name: 'Перечень потенциальных аварийных ситуаций',
            description:
                'Наименование потенциальных аварийных ситуаций, места их возникновения и возможных последствий.',
            url: ''
        },
        {
            name: 'План действий при аварийных ситуациях (1 блок)',
            description:
                'Действия работников при возникновении аварийных ситуаций.',
            url: ''
        },
        {
            name: 'План действий при аварийных ситуациях (2 блок)',
            description:
                'Действия работников при возникновении аварийных ситуаций.',
            url: ''
        }
    ];

    const [logout, { isLoading }] = authAPI.useLogoutMutation();
    const dispatch = useDispatch();
    const { setAuth } = authSlice.actions;
    const navigate = useNavigate();

    const submit = async () => {
        try {
            await logout().then(() => {
                dispatch(setAuth(false));
                localStorage.removeItem('accessToken');
                navigate('/login');
            });
        } catch (error) {
            console.warn(error);
        }
    };

    return (
        <div className={styles.container}>
            <header>
                <img src={logo} />
                <CustomBtn
                    onSubmit={submit}
                    color="#FFF"
                    backgroundColor="#656ED3"
                    name="Выйти"
                    borderColor="#656ED3"
                />
            </header>
            <div className={styles.contentContainer}>
                <h1>Доступные курсы</h1>
                <div className={styles.courses}>
                    {courses.map(({ name, description, url }, index) => (
                        <CourseItem
                            key={index}
                            name={name}
                            description={description}
                            url={url}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PersonalAreaPage;
