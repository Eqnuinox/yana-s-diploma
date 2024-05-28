import React, { useEffect } from 'react';
import styles from './personalArea.module.css';
import logo from '../../assets/images/logo/logo-white.svg';
import CustomBtn from '../../components/custom-btn';
import { CourseItem } from '../../components';
import { authAPI } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { authSlice } from '../../store/reducesrs/AuthSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { courseAPI } from '../../services/courseService';
import { userAPI } from '../../services/userService';

const PersonalAreaPage = () => {
    const { data } = courseAPI.useGetAllCoursesQuery();

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
                    {data?.map(({ title, description, id }) => (
                        <CourseItem
                            key={id}
                            name={title}
                            description={description}
                            url={`/course/?id=${id}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PersonalAreaPage;
