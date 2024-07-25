import { useState, useContext } from 'react';

import { register } from '../../../../services/authService';
import { setUserData } from '../../../../utils/utils';
import UserContext from '../../../../contexts/UserContext';

export default function RegisterForm({
    hideLoginRegisterModal
}) {
    const [registerSubmitError, setRegisterSubmitError] = useState('');
    const [formValues, setFormValues] = useState({});

    const UserCTX = useContext(UserContext);

    function changeHandler(e) {
        setFormValues(oldValues => ({
            ...oldValues,
            [e.target.name]: e.target.value
        }))
    }

    async function registerUserSubmitHandler(event) {
        event.preventDefault();

        try {
            const userData = await register(formValues);
            setUserData(userData);
            hideLoginRegisterModal();
            UserCTX.updateUser(userData)
            navigate('/');
        } catch (error) {
            setRegisterSubmitError(error.message);
        }
    }

    return (
        <div className="form">
            <form onSubmit={registerUserSubmitHandler} id="register-form">
                <div className="form__head">
                    <h5>
                        Register
                    </h5>
                </div>

                <div className="form__body">
                    {registerSubmitError &&
                        <div className="form__error">
                            <p>{registerSubmitError}</p>
                        </div>
                    }

                    <div className="form__cols">
                        <div className="form__col">
                            <div className="form__row">
                                <label hmtlfor="firstName" className="form__label">First name</label>

                                <div className="form__controls">
                                    <input type="text" className="field" id="firstName" name="firstName" autoComplete="off" onChange={changeHandler} />
                                </div>
                            </div>
                        </div>

                        <div className="form__col">
                            <div className="form__row">
                                <label hmtlfor="lastName" className="form__label">Last name</label>

                                <div className="form__controls">
                                    <input type="text" className="field" id="lastName" name="lastName" autoComplete="off" onChange={changeHandler} />
                                </div>
                            </div>
                        </div>

                        <div className="form__col form__col--full-width">
                            <div className="form__row">
                                <label hmtlfor="registerEmail" className="form__label" autoComplete="off">Email</label>

                                <div className="form__controls">
                                    <input type="text" id="registerEmail" className="field" name="registerEmail" onChange={changeHandler} />
                                </div>
                            </div>
                        </div>

                        <div className="form__col ">
                            <div className="form__row">
                                <label hmtlfor="firstPassword" className="form__label">Password</label>

                                <div className="form__controls">
                                    <input type="password" className="field" id="firstPassword" name="firstPassword" onChange={changeHandler} />
                                </div>
                            </div>
                        </div>

                        <div className="form__col">
                            <div className="form__row">
                                <label hmtlfor="confPass" className="form__label">Repeat Password</label>

                                <div className="form__controls">
                                    <input type="password" className="field" id="confPass" name="confPass" onChange={changeHandler} />
                                </div>
                            </div>
                        </div>

                        <div className="form__col form__col--full-width">
                            <div className="form__row">
                                <label htmlFor="imageUrl" className="form__label">Image Url</label>

                                <div className="form__controls">
                                    <input type="text" className="field" name="imageUrl" id="imageUrl" onChange={changeHandler} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form__actions">
                    <input type="submit" value="Submit" className="form__btn" form="register-form"></input>
                </div>
            </form>
        </div>
    );
}