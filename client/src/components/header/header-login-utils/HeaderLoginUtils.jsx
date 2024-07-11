export default function HeaderLoginUtils({showLoginRegisterMmodal}) {
    return (
        <div className="header__utils">
            <a href="#" className="login ico-background" onClick={showLoginRegisterMmodal}>
                <img src="./src/assets/svgs/user-ico.svg" alt=""></img>
            </a>
        </div>
    );
}