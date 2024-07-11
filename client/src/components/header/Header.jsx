import { useState } from "react";
import HeaderLoginRegisterModal from "./header-login-register-modal/HeaderLoginRegisterModal";
import { setUserData, showBodyScroll } from "../../utils/utils";
import HeaderUserUtils from "./header-user-utils/HeaderUserUtils";
import HeaderLoginUtils from "./header-login-utils/HeaderLoginUtils";


export default function Header() {
	const [showLoginRegisterModal, setShowLoginRegisterModal] = useState(false);
	const [logedInUser, setLogedInUser] = useState(undefined);

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
			console.log('User login error', error)
		}
	}

	return (
		<header className="header">
			<div className="shell">
				<div className="header__content">
					<div className="header__logo">
						<a href="#" className="logo">
							<img src="./src/assets/svgs/opened-book.svg" alt=""></img>
						</a>
					</div>

					<div className="header__actions">
						<div className="header__menu">
							<nav>
								<ul className="menu">
									<li>
										<a href="#">Featured</a>
									</li>

									<li>
										<a href="#">Catalog</a>
									</li>

									<li>
										<a href="#">Contact</a>
									</li>

									<li>
										<a href="#">About</a>
									</li>

									{logedInUser && <li>
										<a href="#">Publish</a>
									</li>}
								</ul>
							</nav>
						</div>

						{logedInUser ? 	<HeaderUserUtils logedInUser={logedInUser}/>	: <HeaderLoginUtils showLoginRegisterMmodal={showLoginRegisterMmodal}/>}
					</div>
				</div>
			</div>

			{showLoginRegisterModal && <HeaderLoginRegisterModal
											onCLose={hideLoginRegisterModal}
											loginSubmitHandler={loginSubmitHandler}
										/>}
		</header>

	);
}