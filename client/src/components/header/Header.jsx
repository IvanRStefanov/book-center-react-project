import { useContext, useState } from "react";

import UserContext from "../../contexts/UserContext";

import { setUserData, showBodyScroll } from "../../utils/utils";
import { NavLink, useNavigate } from 'react-router-dom';
import HeaderLoginRegisterModal from "./header-login-register-modal/HeaderLoginRegisterModal";
import HeaderUserUtils from "./header-user-utils/HeaderUserUtils";
import HeaderLoginUtils from "./header-login-utils/HeaderLoginUtils";
import UserDetails from "./user-details/UserDetails";
import { login, logout, register } from "../../services/authService";

export default function Header() {
	const [showLoginRegisterModal, setShowLoginRegisterModal] = useState(false);
	const [showUserDetails, setShowUserDetails] = useState(false);
	const [submitError, setSubmitError] = useState('');
	const [registerSubmitError, setRegisterSubmitError] = useState('');
	
	const navigate = useNavigate();
	const UserCTX = useContext(UserContext)
		
	function showLoginRegisterMmodal() {
		setShowLoginRegisterModal(true);
		showBodyScroll(false);
	}

	function hideLoginRegisterModal() {
		setShowLoginRegisterModal(false);
		showBodyScroll(true);
		setSubmitError('');
		setRegisterSubmitError('');
	}

	// async function loginSubmitHandler(event) {
	// 	event.preventDefault();
		
	// 	const formData = new FormData(event.currentTarget);
	// 	const email = formData.get('email').trim();
	// 	const password = formData.get('password').trim();

	// 	try {
	// 		const userData = await login(email, password);
	// 		setUserData(userData);
	// 		hideLoginRegisterModal();
	// 		UserCTX.updateUser(userData);
	// 		navigate('/');
	// 	} catch (error) {
	// 		setSubmitError(error.message);
	// 	}
	// }

	// async function registerUserSubmitHandler(event) {
	// 	event.preventDefault();
		
	// 	const formData = new FormData(event.currentTarget);

	// 	const bodytoSend = {
	// 		firstName: formData.get('firstName').trim(),
	// 		lastName: formData.get('lastName').trim(),
	// 		imageUrl: formData.get('imageUrl').trim(),
	// 		firstPassword: formData.get('firstPassword').trim(),
	// 		confPass: formData.get('confPass').trim(),
	// 		registerEmail: formData.get('registerEmail').trim()
	// 	}

	// 	try {
	// 		const userData = await register(bodytoSend);
	// 		setUserData(userData);
	// 		hideLoginRegisterModal();
	// 		UserCTX.updateUser(userData)
	// 		navigate('/');
	// 	} catch (error) {
	// 		setRegisterSubmitError(error.message);
	// 	}
	// }

	function showUserInfo() {
		setShowUserDetails(true);
		showBodyScroll(false);
	}

	function hideUserInfo() {
		setShowUserDetails(false);
		showBodyScroll(true);
	}

	function logOut() {
		logout();
		setShowUserDetails(false);
		showBodyScroll(true);
		UserCTX.updateUser('')
		navigate('/');
	}

	return (
		<header className="header">
			<div className="shell">
				<div className="header__content">
					<div className="header__logo">
						<NavLink to="/" className="logo">
							<img src="../src/assets/svgs/opened-book.svg" alt=""></img>
						</NavLink>
					</div>

					<div className="header__actions">
						<div className="header__menu">
							<nav>
								<ul className="menu">
									<li>
										<NavLink to="/featured">Featured</NavLink>
									</li>

									<li>
										<NavLink to="/catalog">Catalog</NavLink>
									</li>

									<li>
										<NavLink to="/contact">Contact</NavLink>
									</li>

									<li>
										<NavLink to="/about">About</NavLink>
									</li>

									{UserCTX.user &&
										<li>
											<NavLink to="/add-new-book">Publish</NavLink>
										</li>
									}
								</ul>
							</nav>
						</div>


						{UserCTX.user ? <HeaderUserUtils
							showUserInfo={showUserInfo}
							showUserDetails={showUserDetails}
						/>
							:
							<HeaderLoginUtils
								showLoginRegisterMmodal={showLoginRegisterMmodal}
							/>}
					</div>
				</div>
			</div>

			{showLoginRegisterModal && <HeaderLoginRegisterModal
				hideLoginRegisterModal={hideLoginRegisterModal}
				// loginSubmitHandler={loginSubmitHandler}
				// registerUserSubmitHandler={registerUserSubmitHandler}
				// submitError={submitError}
				// registerSubmitError={registerSubmitError}
			/>}

			{showUserDetails && <UserDetails
				onClose={hideUserInfo}
				onLogout={logOut}
			/>}
		</header>

	);
}