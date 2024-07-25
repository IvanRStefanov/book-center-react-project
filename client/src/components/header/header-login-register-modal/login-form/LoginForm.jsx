import { useState, useContext } from 'react';

import { login } from '../../../../services/authService';
import { setUserData } from '../../../../utils/utils';
import UserContext from '../../../../contexts/UserContext';

export default function LoginForm({
    hideLoginRegisterModal
}) {
    const UserCTX = useContext(UserContext)

    const [submitError, setSubmitError] = useState('');
    const [formValues, setFormValues] = useState({});

    function changeHandler(e) {
        setFormValues(oldValues => ({
            ...oldValues,
            [e.target.name]: e.target.value
        }))
    }

    async function loginSubmitHandler(event) {
        event.preventDefault();

        try {
            const userData = await login(formValues.email, formValues.password);
            setUserData(userData);
            hideLoginRegisterModal();
            UserCTX.updateUser(userData);
            navigate('/');
        } catch (error) {
            setSubmitError(error.message);
        }
    }

    return (
        <div className="form">
            <form onSubmit={loginSubmitHandler}>
                <div className="form__head">
                    <h5>Login</h5>
                </div>

                <div className="form__body">
                    {submitError &&
                        <div className="form__error">
                            <p>{submitError}</p>
                        </div>
                    }

                    <div className="form__row">
                        <label hmtlfor="email"
                            className="form__label">Email</label>

                        <div className="form__controls">
                            <input type="email" className="field" id="email" name="email" autoComplete="off" onChange={changeHandler}></input>
                        </div>
                    </div>

                    <div className="form__row">
                        <label hmtlfor="password"
                            className="form__label">Password</label>

                        <div className="form__controls">
                            <input type="password" className="field" id="password" name="password" onChange={changeHandler}></input>
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