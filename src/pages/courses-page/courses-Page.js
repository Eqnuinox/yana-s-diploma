import React from 'react';
import styles from './coursesPage.module.css';
import logo from '../../assets/images/logo/logo-white.svg';
import CustomBtn from '../../components/custom-btn';
import { CourseItem } from '../../components';
import { authAPI } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { authSlice } from '../../store/reducesrs/AuthSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { courseAPI } from '../../services/courseService';
import CourseBodyItem from '../../components/course-body-item/course-body-item';

const CoursesPage = () => {
    const search = useLocation().search.split('=')[1];
    const { data } = courseAPI.useGetOneCourseQuery(search);
    console.log(data?.body?.list);

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

    const back = async () => {
        navigate(-1);
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
            <div className={styles.back_button}>
                <CustomBtn
                    onSubmit={back}
                    color="#FFF"
                    backgroundColor="#656ED3"
                    name="Назад"
                    borderColor="#656ED3"
                />
            </div>
            <div className={styles.contentContainer}>
                <h1>{data?.body?.tittle}</h1>
                <p>as</p>
                <div className={styles.courses}>
                    {data?.body?.list.map((item) => (
                        <CourseBodyItem list={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;
