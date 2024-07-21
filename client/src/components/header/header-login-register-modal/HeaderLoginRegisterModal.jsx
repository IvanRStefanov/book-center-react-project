export default function HeaderLoginRegisterModal({
	onCLose,
	loginSubmitHandler,
	registerUserSubmitHandler,
	submitError,
	registerSubmitError
}) {

	return (
		<div className="header__accaunt-modal">
			<div className="modal-login-register">
				<div className="modal__bg" onClick={onCLose}></div>

				<div className="modal__content">
					<button className="modal__close-btn" onClick={onCLose}></button>

					<div className="modal__shell">
						<div className="modal__items">
							<div className="modal__item">
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
													<input type="email" className="field" id="email" name="email" autoComplete="off"></input>
												</div>
											</div>

											<div className="form__row">
												<label hmtlfor="password"
													className="form__label">Password</label>

												<div className="form__controls">
													<input type="password" className="field" id="password" name="password"></input>
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
														<label hmtlfor="firstName" className="form__label">First
															name</label>

														<div className="form__controls">
															<input type="text" className="field" id="firstName" name="firstName" autoComplete="off"></input>
														</div>
													</div>
												</div>

												<div className="form__col">
													<div className="form__row">
														<label hmtlfor="lastName" className="form__label">Last
															name</label>

														<div className="form__controls">
															<input type="text" className="field" id="lastName" name="lastName" autoComplete="off"></input>
														</div>
													</div>
												</div>

												<div className="form__col form__col--full-width">
													<div className="form__row">
														<label hmtlfor="registerEmail" className="form__label" autoComplete="off">Email</label>

														<div className="form__controls">
															<input type="text" id="registerEmail" className="field" name="registerEmail"></input>
														</div>
													</div>
												</div>

												<div className="form__col ">
													<div className="form__row">
														<label hmtlfor="firstPassword" className="form__label">Password</label>

														<div className="form__controls">
															<input type="password" className="field" id="firstPassword" name="firstPassword"></input>
														</div>
													</div>
												</div>

												<div className="form__col">
													<div className="form__row">
														<label hmtlfor="confPass" className="form__label">Repeat Password</label>

														<div className="form__controls">
															<input type="password" className="field" id="confPass" name="confPass"></input>
														</div>
													</div>
												</div>

												<div className="form__col form__col--full-width">
													<div className="form__row">
														<label htmlFor="imageUrl" className="form__label">Image Url</label>

														<div className="form__controls">
															<input type="text" className="field" name="imageUrl" id="imageUrl" />
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}