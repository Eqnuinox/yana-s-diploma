import React, { useState } from 'react';
import styles from './signUp.module.css';
import logo from '../../assets/images/logo/logo-white.svg';
import { CustomInput } from '../../components';
import CustomButton from '../../components/custom-btn';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { authSlice } from '../../store/reducesrs/AuthSlice';

const SignUp = () => {
    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        repeatPassword: ''
    };

    const navigate = useNavigate();
    const { setAuth } = authSlice.actions;
    const dispatch = useDispatch();
    const [valuesForm, setValuesForm] = useState(initialState);
    const [isDisabled, setisDisabled] = useState(true);

    const [registration, { error: regError, isLoading }] =
        authAPI.useRegistrationMutation();

    console.log(regError);

    const handleInputChange = (field, value) => {
        setValuesForm((prevState) => ({
            ...prevState,
            [field]: value
        }));
    };

    const submit = async () => {
        try {
            await registration(valuesForm).then((data) => {
                if (!data.error) {
                    localStorage.setItem(
                        'accessToken',
                        data?.data?.accessToken
                    );
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
                            <div style={{ minHeight: '25px', color: 'red' }}>
                                {regError && 'Заполните обязательные поля'}
                            </div>
                            <div>
                                <CustomInput
                                    type="text"
                                    value={valuesForm.firstName}
                                    onChangeValue={(e) =>
                                        handleInputChange(
                                            'firstName',
                                            e.target.value
                                        )
                                    }
                                    name="Имя:"
                                />
                            </div>
                            <div>
                                <CustomInput
                                    value={valuesForm.lastName}
                                    type="text"
                                    onChangeValue={(e) =>
                                        handleInputChange(
                                            'lastName',
                                            e.target.value
                                        )
                                    }
                                    name="Фамилия:"
                                />
                            </div>
                            <div>
                                <CustomInput
                                    value={valuesForm.email}
                                    type="email"
                                    onChangeValue={(e) =>
                                        handleInputChange(
                                            'email',
                                            e.target.value
                                        )
                                    }
                                    name="Email:"
                                />
                            </div>
                            <div>
                                <CustomInput
                                    value={valuesForm.login}
                                    type="text"
                                    onChangeValue={(e) =>
                                        handleInputChange(
                                            'username',
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
                            <div>
                                <CustomInput
                                    value={valuesForm.repeatPassword}
                                    type="password"
                                    onChangeValue={(e) =>
                                        handleInputChange(
                                            'repeatPassword',
                                            e.target.value
                                        )
                                    }
                                    name="Потвердите пароль:"
                                />
                            </div>
                            <div style={{ marginTop: 40 }}>
                                <CustomButton
                                    name={
                                        isLoading
                                            ? 'Загрузка...'
                                            : 'Зарегестрироваться'
                                    }
                                    route={''}
                                    onSubmit={submit}
                                    borderColor=""
                                    backgroundColor="#656ED3"
                                    color={isDisabled ? '#AFB3FF' : '#FFF'}
                                    width={413}
                                    borderRadius={56}
                                />
                            </div>
                            <div className={styles.moreLinks}>
                                <p>
                                    Уже есть аккаунт?{' '}
                                    <Link to={'/login'}>
                                        <b>Войти</b>
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

export default SignUp;
