import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { login } from '../../../../services/authService';
import { setUserData } from '../../../../utils/utils';
import UserContext from '../../../../contexts/UserContext';

export default function LoginForm({
    hideLoginRegisterModal
}) {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            'email': '',
            'password': ''
        }
    });
    const UserCTX = useContext(UserContext)

    async function loginSubmitHandler(data) {

        const { email, password } = data;
        try {
            const userData = await login(email, password);

            setUserData(userData);
            hideLoginRegisterModal();
            UserCTX.updateUser(userData);
            navigate('/');
        } catch (error) {
            setError('serverError', {
                type: 'serverErrMsg',
                message: error.message == 'Failed to fetch' ? 'Please try again later, there are some technical issues' : error.message
            });

        }
    }

    function onError(errors) {
        if(errors.serverError) {
            clearErrors('serverError');
            handleSubmit(loginSubmitHandler)();
        }
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit(loginSubmitHandler, onError)}>
                <div className="form__head">
                    <h5>Login</h5>
                </div>

                <div className="form__body">
                    {errors.serverError &&
                        <div className="form__error">
                            <p>{errors.serverError.message}</p>
                        </div>
                    }

                    <div className={errors.email ? 'form__row form__row--err' : 'form__row'}>
                        <label hmtlfor="email"
                            className="form__label">Email</label>

                        <div className="form__controls">
                            <input
                                type="email"
                                className="field"
                                id="email"
                                name="email"
                                autoComplete="off"
                                {...register('email', {
                                    required: 'This field is required.'
                                })}
                            ></input>
                            {errors.email &&
                                <p className='err-msg'>{errors.email.message}</p>
                            }
                        </div>
                    </div>

                    <div className={errors.password ? 'form__row form__row--err' : 'form__row'}>
                        <label hmtlfor="password"
                            className="form__label">Password</label>

                        <div className="form__controls">
                            <input
                                type="password"
                                className="field"
                                id="password"
                                name="password"
                                {...register('password', {
                                    required: 'This field is required'
                                })}
                            ></input>
                            {errors.password &&
                                <p className='err-msg'>{errors.password.message}</p>
                            }
                        </div>
                    </div>
                </div>

                <div className="form__actions">
                    <input type="submit" value="Submit" className="form__btn"></input>
                </div>
            </form>
        </div>
    );
}