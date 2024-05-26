import React, { useState } from 'react';
import styles from './login.module.css';
import logo from '../../assets/images/logo/logo-white.svg';
import { CustomInput } from '../../components';
import CustomButton from '../../components/custom-btn';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/authService';
import AuthSlice, { authSlice } from '../../store/reducesrs/AuthSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const initialState = {
        email: 'test@mail.com',
        password: 'Qwerty123!'
    };

    const navigate = useNavigate();
    const { setAuth } = authSlice.actions;
    const dispatch = useDispatch();
    const [valuesForm, setValuesForm] = useState(initialState);
    const [isDisabled, setisDisabled] = useState(true);

    const [login, { error: loginError, isLoading }] =
        authAPI.useLoginMutation();

    const handleInputChange = (field, value) => {
        setValuesForm((prevState) => ({
            ...prevState,
            [field]: value
        }));
    };

    const submit = async () => {
        try {
            await login(valuesForm).then((data) => {
                localStorage.setItem('accessToken', data?.data?.accessToken);
                if (!data.error) {
                    dispatch(setAuth(true));
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <header>
                <img src={logo} />
            </header>
            <div className={styles.main}>
                <div className={styles.containerItem}>
                    <div>
                        <h3>Добро пожаловать!</h3>
                        <div>
                            <div>
                                <div
                                    style={{ minHeight: '25px', color: 'red' }}
                                >
                                    {loginError &&
                                        'Ошибка. Неверный логин или пароль'}
                                </div>
                                <CustomInput
                                    type="text"
                                    value={valuesForm.email}
                                    onChangeValue={(e) =>
                                        handleInputChange(
                                            'email',
                                            e.target.value
                                        )
                                    }
                                    name="Логин:"
                                />
                            </div>
                            <div>
                                <CustomInput
                                    value={valuesForm.password}
                                    type="password"
                                    onChangeValue={(e) =>
                                        handleInputChange(
                                            'password',
                                            e.target.value
                                        )
                                    }
                                    name="Пароль:"
                                />
                            </div>
                            <div style={{ marginTop: 40 }}>
                                <CustomButton
                                    name={isLoading ? 'Загрузка' : 'Войти'}
                                    onSubmit={submit}
                                    route={''}
                                    borderColor=""
                                    backgroundColor="#656ED3"
                                    color={isDisabled ? '#AFB3FF' : '#FFF'}
                                    width={413}
                                    borderRadius={56}
                                />
                            </div>
                            <div className={styles.moreLinks}>
                                <p>
                                    Нет аккаунта?{' '}
                                    <Link to={'/sign-up'}>
                                        <b>Зарегестрироваться</b>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
