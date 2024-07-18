import { useEffect, useState } from "react";
import { getUserData, removeUserData, setUserData, showBodyScroll } from "../../utils/utils";
import { NavLink, redirect } from 'react-router-dom';
import HeaderLoginRegisterModal from "./header-login-register-modal/HeaderLoginRegisterModal";
import HeaderUserUtils from "./header-user-utils/HeaderUserUtils";
import HeaderLoginUtils from "./header-login-utils/HeaderLoginUtils";
import UserDetails from "./user-details/UserDetails";


export default function Header({
	loggedInUser,
	setLoggedInUser,
	postedBooks,
	readBooks,
	ratedBooks
}) {
	const [showLoginRegisterModal, setShowLoginRegisterModal] = useState(false);
	const [showUserDetails, setShowUserDetails] = useState(false);
	
	function showLoginRegisterMmodal() {
		setShowLoginRegisterModal(true);
		showBodyScroll(false);
	}

	function hideLoginRegisterModal() {
		setShowLoginRegisterModal(false);
		showBodyScroll(true);
	}

	async function loginSubmitHandler(event) {
		event.preventDefault();
		
		const formData = new FormData(event.currentTarget);
		const email = formData.get('email').trim();
		const password = formData.get('password').trim();

		try {
			const response = await fetch('http://localhost:3030/users/login', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});
			if (response.ok != true) {
				const error = await response.json();
				throw new Error(error.message);
			}

			const userData = await response.json();

			setUserData(userData);
			hideLoginRegisterModal();
			setLoggedInUser(userData);
		} catch (error) {
			console.log('User login error', error.message);
		}
	}

	async function registerUserSubmitHandler(event) {
		event.preventDefault();
		
		const formData = new FormData(event.currentTarget);
		const firstName = formData.get('firstName').trim();
		const lastName = formData.get('lastName').trim();
		const email = formData.get('email').trim();
		const password = formData.get('password').trim();
		const imageUrl = formData.get('imageUrl').trim();

		const bodytoSend = {
			email,
			firstName,
			lastName,
			imageUrl,
			password,
		}

		try {
			const response = await fetch('http://localhost:3030/users/register', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(bodytoSend)
			});

			if (response.ok != true) {
				const error = await response.json();
				throw new Error(error.message);
			}

			const userData = await response.json();

			setUserData(userData);
			hideLoginRegisterModal();
			setLoggedInUser(userData);
			redirect('/')
		} catch (error) {
			console.log('register error', error.message);
		}
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
		removeUserData();
		setShowUserDetails(false);
		showBodyScroll(true);
		setLoggedInUser('');
		redirect('/')
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

									{loggedInUser &&
										<li>
											<NavLink to="/add-new-book">Publish</NavLink>
										</li>
									}
								</ul>
							</nav>
						</div>


						{loggedInUser ? <HeaderUserUtils
							showUserInfo={showUserInfo}
							loggedInUser={loggedInUser}
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
				onCLose={hideLoginRegisterModal}
				loginSubmitHandler={loginSubmitHandler}
				registerUserSubmitHandler={registerUserSubmitHandler}
			/>}

			{showUserDetails && <UserDetails
				loggedInUser={loggedInUser}
				onClose={hideUserInfo}
				onLogout={logOut}
				postedBooks={postedBooks}
				ratedBooks={ratedBooks}
				readBooks={readBooks}
			/>}
		</header>

	);
}