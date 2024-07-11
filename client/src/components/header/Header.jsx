import { useState } from "react";
import HeaderLoginRegisterModal from "./header-login-register-modal/HeaderLoginRegisterModal";



export default function Header() {
    const [showLoginRegisterModal, setShowLoginRegisterModal] = useState(false);

    function showLoginRegisterMmodal(event) {
        event.preverntDefault;
    
        setShowLoginRegisterModal(true);
    }

    function hideLoginRegisterModal() {
        setShowLoginRegisterModal(false);
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

                                    <li>
                                        <a href="#">Publish</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="header__utils">
                            <a href="#" className="login ico-background" onClick={showLoginRegisterMmodal}>
                                <img src="./src/assets/svgs/user-ico.svg" alt=""></img>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {showLoginRegisterModal && <HeaderLoginRegisterModal onCLose={hideLoginRegisterModal}/>}
        </header>

    );
}