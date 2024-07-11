export default function HeaderLoginRegisterModal({
    onCLose
}) {
    return (
        <div className="header__accaunt-modal">
            <div className="modal-user">
                <div className="modal__bg" onClick={onCLose}></div>

                <div className="modal__content">
                    <button className="modal__close-btn" onClick={onCLose}></button>

                    <div className="modal__shell">
                        <div className="modal__items">
                            <div className="modal__item">
                                <div className="form">
                                    <form action="">
                                        <div className="form__head">
                                            <h5>Login</h5>
                                        </div>

                                        <div className="form__body">
                                            <div className="form__row">
                                                <label hmtlfor="email"
                                                    className="form__label">Email</label>

                                                <div className="form__controls">
                                                    <input type="email" className="field" id="email"></input>
                                                </div>
                                            </div>

                                            <div className="form__row">
                                                <label hmtlfor="password"
                                                    className="form__label">Password</label>

                                                <div className="form__controls">
                                                    <input type="password" className="field" id="password"></input>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form__actions">
                                            <input type="submit" value="Submit" className="form__btn"></input>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="modal__separator">
                                <span>or</span>
                            </div>

                            <div className="modal__item">
                                <div className="form">
                                    <form action="">
                                        <div className="form__head">
                                            <h5>
                                                Register
                                            </h5>
                                        </div>

                                        <div className="form__body">
                                            <div className="form__cols">
                                                <div className="form__col">
                                                    <div className="form__row">
                                                        <label hmtlfor="firstName" className="form__label">First
                                                            name</label>

                                                        <div className="form__controls">
                                                            <input type="text" className="field" id="firstName"></input>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form__col">
                                                    <div className="form__row">
                                                        <label hmtlfor="lastName" className="form__label">Last
                                                            name</label>

                                                        <div className="form__controls">
                                                            <input type="text" className="field" id="lastName"></input>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form__col form__col--full-width">
                                                    <div className="form__row">
                                                        <label hmtlfor="email" id="email">Email</label>

                                                        <div className="form__controls">
                                                            <input type="email" id="email" className="field"></input>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form__col ">
                                                    <div className="form__row">
                                                        <label hmtlfor="password">Password</label>

                                                        <div className="form__controls">
                                                            <input type="password" className="field" id="passwordFirst"></input>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form__col">
                                                    <div className="form__row">
                                                        <label hmtlfor="passwordRepeat">Repeat Password</label>

                                                        <div className="form__controls">
                                                            <input type="password" className="field" id="passwordRepeat"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form__actions">
                                            <input type="submit" value="Submit" className="form__btn"></input>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}