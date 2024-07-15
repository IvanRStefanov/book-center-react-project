import { useEffect, useState } from "react";
import { getUserData, setUserData, showBodyScroll } from "../../utils/utils";
import { NavLink } from 'react-router-dom';
import HeaderLoginRegisterModal from "./header-login-register-modal/HeaderLoginRegisterModal";
import HeaderUserUtils from "./header-user-utils/HeaderUserUtils";
import HeaderLoginUtils from "./header-login-utils/HeaderLoginUtils";


export default function Header() {
	const [showLoginRegisterModal, setShowLoginRegisterModal] = useState(false);
	const [logedInUser, setLogedInUser] = useState('');

	useEffect(() => {
		const hasLogedInUser = sessionStorage.getItem('userData');

		if(hasLogedInUser) {
			const userFound = JSON.parse(hasLogedInUser);
			setUserData(userFound);
			setLogedInUser(userFound);
		}
	}, [])

	function showLoginRegisterMmodal(event) {
		event.preverntDefault;
	
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
			setLogedInUser(userData);
			
		} catch (error) {
			console.log('User login error', error.message);
		}
	}

	async function registerUserSubmitHandler(event) {
		event.preventDefault();
		console.log(event.currentTarget)

		const formData = new FormData(event.currentTarget);
		const formDataObj = (Object.fromEntries(formData));

		try {
			const response = await fetch('http://localhost:3030/users/register', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formDataObj)
			});

			if(response.ok != true) {
				const error = await response.json();
				throw new Error(error.message)
			}
			
			const userData = await response.json();
			// console.log(userData)

			setUserData(userData);
			hideLoginRegisterModal();
			setLogedInUser(userData)
		} catch (error) {
			console.log('register error', error.message);

		}
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

									{logedInUser && 
										<li>
											<NavLink to="/add-new-book">Publish</NavLink>
										</li>
									}
								</ul>
							</nav>
						</div>

						{logedInUser ? 	<HeaderUserUtils
											logedInUser={logedInUser}
											// showUserDetails={showUserDetails}
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
		</header>

	);
}