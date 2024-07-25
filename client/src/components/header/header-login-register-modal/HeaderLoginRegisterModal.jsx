import LoginForm from "./login-form/LoginForm";
import RegisterForm from "./register-form/RegisterForm";

export default function HeaderLoginRegisterModal({
	hideLoginRegisterModal,
}) {
	return (
		<div className="header__accaunt-modal">
			<div className="modal-login-register">
				<div className="modal__bg" onClick={hideLoginRegisterModal}></div>

				<div className="modal__content">
					<button className="modal__close-btn" onClick={hideLoginRegisterModal}></button>

					<div className="modal__shell">
						<div className="modal__items">
							<div className="modal__item">
								<LoginForm hideLoginRegisterModal={hideLoginRegisterModal} />
							</div>

							<div className="modal__separator">
								<span>or</span>
							</div>

							<div className="modal__item">
								<RegisterForm hideLoginRegisterModal={hideLoginRegisterModal} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}