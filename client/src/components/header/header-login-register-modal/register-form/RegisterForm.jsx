import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { registerNewUser } from '../../../../services/authService';
import { EMAIL_RGX, setUserData } from '../../../../utils/utils';
import { UserContext } from '../../../../contexts/UserContext';

export default function RegisterForm({
	hideLoginRegisterModal
}) {
	const UserCTX = useContext(UserContext);

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		watch,
		formState: { errors }
	} = useForm({
		defaultValues: {
			'registerEmail': '',
			'firstPassword': '',
			'confPass': '',
			'firstName': '',
			'lastName': '',
			'imageUrl': '',
		},
		mode: 'onChange'
	})

	async function registerUserSubmitHandler(data) {

		try {
			const userData = await registerNewUser(data);
			setUserData(userData);
			hideLoginRegisterModal();
			UserCTX.updateUser(userData)
			navigate('/');
		} catch (error) {
			setError('serverError', {
				type: 'serverErrMsg',
				message: error.message == 'Failed to fetch' ? 'Please try again later, there are some technical issues' : error.message
			});
		}
	}

	function onError(errors) {
		if (errors.serverError) {
			clearErrors('serverError');
			handleSubmit(registerUserSubmitHandler)();
		}
	}

	return (
		<div className="form">
			<form onSubmit={handleSubmit(registerUserSubmitHandler, onError)} id="register-form">
				<div className="form__head">
					<h5>
						Register
					</h5>
				</div>

				<div className="form__body">
					{errors.serverError &&
						<div className="form__error">
							<p>{errors.serverError.message}</p>
						</div>
					}

					<div className="form__cols">
						<div className="form__col">
							<div className={errors.firstName ? 'form__row form__row--err' : 'form__row'}>
								<label hmtlfor="firstName" className="form__label">First name</label>

								<div className="form__controls">
									<input
										type="text"
										className="field"
										id="firstName"
										name="firstName"
										autoComplete="off"
										{...register('firstName', {
											required: 'This field is required'
										})}
									/>

									{errors.firstName &&
										<p className='err-msg'>{errors.firstName.message}</p>
									}
								</div>
							</div>
						</div>

						<div className="form__col">
							<div className={errors.lastName ? 'form__row form__row--err' : 'form__row'}>
								<label hmtlfor="lastName" className="form__label">Last name</label>

								<div className="form__controls">
									<input
										type="text"
										className="field"
										id="lastName"
										name="lastName"
										autoComplete="off"
										{...register('lastName', {
											required: 'This field is required'
										})}
									/>

									{errors.lastName &&
										<p className='err-msg'>{errors.lastName.message}</p>
									}
								</div>
							</div>
						</div>

						<div className="form__col form__col--full-width">
							<div className={errors.registerEmail ? 'form__row form__row--err' : 'form__row'}>
								<label hmtlfor="registerEmail" className="form__label" autoComplete="off">Email</label>

								<div className="form__controls">
									<input
										type="text"
										id="registerEmail"
										className="field"
										name="registerEmail"
										{...register('registerEmail', {
											required: 'This field is required',
											pattern: {
												value: EMAIL_RGX,
												message: 'Invalid email format'
											}
										})}
									/>

									{errors.registerEmail &&
										<p className='err-msg'>{errors.registerEmail.message}</p>
									}
								</div>
							</div>
						</div>

						<div className="form__col ">
							<div className={errors.firstPassword ? 'form__row form__row--err' : 'form__row'}>
								<label hmtlfor="firstPassword" className="form__label">Password</label>

								<div className="form__controls">
									<input
										type="password"
										className="field"
										id="firstPassword"
										name="firstPassword"
										{...register('firstPassword', {
											required: 'This field is required',
										})}
									/>

									{errors.firstPassword &&
										<p className='err-msg'>
											{errors.firstPassword.message}
										</p>
									}
								</div>
							</div>
						</div>

						<div className="form__col">
							<div className={errors.confPass ? 'form__row form__row--err' : 'form__row'}>
								<label hmtlfor="confPass" className="form__label">Repeat Password</label>

								<div className="form__controls">
									<input
										type="password"
										className="field"
										id="confPass"
										name="confPass"
										{...register('confPass', {
											required: 'This field is required',
											validate: (value) => {
												if (watch('firstPassword') !== value) {
													return "Passwords don't match"
												}
											}
										})}
									/>

									{errors.confPass &&
										<p className='err-msg'>
											{errors.confPass.message}
										</p>
									}
								</div>
							</div>
						</div>

						<div className="form__col form__col--full-width">
							<div className={errors.imageUrl ? 'form__row form__row--err' : 'form__row'}>
								<label htmlFor="imageUrl" className="form__label">Image Url</label>

								<div className="form__controls">
									<input
										type="text"
										className="field"
										name="imageUrl"
										id="imageUrl"
										{...register('imageUrl', {
											required: 'This field is required'
										})}
									/>

									{errors.imageUrl &&
										<p className='err-msg'>
											{errors.imageUrl.message}
										</p>
									}
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