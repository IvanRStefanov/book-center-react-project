import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";

import { showBodyScroll } from "../../utils/utils";
import { logout } from "../../services/authService";

import HeaderLoginRegisterModal from "./header-login-register-modal/HeaderLoginRegisterModal";
import HeaderUserUtils from "./header-user-utils/HeaderUserUtils";
import HeaderLoginUtils from "./header-login-utils/HeaderLoginUtils";
import UserDetails from "./user-details/UserDetails";

export default function Header() {
	const [showLoginRegisterModal, setShowLoginRegisterModal] = useState(false);
	const [showUserDetails, setShowUserDetails] = useState(false);

	const navigate = useNavigate();
	const UserCTX = useContext(UserContext)

	function showLoginRegisterMmodal() {
		setShowLoginRegisterModal(oldState => !oldState);
		showBodyScroll(false);
	}

	function hideLoginRegisterModal() {
		setShowLoginRegisterModal(oldState => !oldState);
		showBodyScroll(true);
	}

	function showUserInfo() {
		setShowUserDetails(oldState => !oldState);
		showBodyScroll(false);
	}

	function hideUserInfo() {
		setShowUserDetails(oldState => !oldState);
		showBodyScroll(true);
	}

	async function logOut() {
		await logout();
		UserCTX.updateUser('');
		setShowUserDetails(oldState => !oldState);
		showBodyScroll(true);
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
									{/* <li>
										<NavLink to="/featured">Featured</NavLink>
									</li> */}

									<li>
										<NavLink to="/catalog">Catalog</NavLink>
									</li>

									{/* <li>
										<NavLink to="/contact">Contact</NavLink>
									</li> */}

									{/* <li>
										<NavLink to="/about">About</NavLink>
									</li> */}

									{UserCTX.user &&
										<li>
											<NavLink to="/add-new-book">Publish</NavLink>
										</li>
									}
								</ul>
							</nav>
						</div>


						{UserCTX.user
							?
							<HeaderUserUtils
								showUserInfo={showUserInfo}
								showUserDetails={showUserDetails}
							/>
							:
							<HeaderLoginUtils
								showLoginRegisterMmodal={showLoginRegisterMmodal}
							/>
						}
					</div>
				</div>
			</div>

			{showLoginRegisterModal &&
				<HeaderLoginRegisterModal
					hideLoginRegisterModal={hideLoginRegisterModal}
				/>
			}

			{showUserDetails &&
				<UserDetails
					onClose={hideUserInfo}
					onLogout={logOut}
				/>
			}
		</header>

	);
}