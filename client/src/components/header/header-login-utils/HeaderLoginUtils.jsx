import { Link } from "react-router-dom";

export default function HeaderLoginUtils({showLoginRegisterMmodal}) {
    return (
        <div className="header__utils">
            <Link href="#" className="login ico-background" onClick={showLoginRegisterMmodal}>
                <img src="../src/assets/svgs/user-ico.svg" alt=""></img>
            </Link>
        </div>
    );
}