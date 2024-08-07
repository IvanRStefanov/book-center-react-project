export default function HeaderLoginUtils({showLoginRegisterMmodal}) {
	return (
		<div className="header__utils">
			<button  className="login ico-background" onClick={showLoginRegisterMmodal}>
				<img src="/assets/svgs/user-ico.svg" alt=""></img>
			</button>
		</div>
	);
}