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
		UserCTX.updateUser('');
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
			/>}

			{showUserDetails && <UserDetails
				onClose={hideUserInfo}
				onLogout={logOut}
			/>}
		</header>

	);
}