import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="shell">
                <div className="footer__content">
                    <div className="footer__cols">
                        <div className="footer__col">
                            <div className="footer__logo">
                                <Link to={'/'} className="logo logo--footer">
                                    <img src="/assets/svgs/opened-book.svg" alt=""></img>
                                </Link>
                            </div>
                        </div>

                        <div className="footer__col">
                            <div className="quick-links-menu">
                                <p className="quick-links-head">Quick Links</p>

                                <nav className="quick-links-nav">
                                    <ul>
                                        <li>
                                            <Link to="/catalog">Catalog</Link>
                                        </li>

                                        <li>
                                            <Link to="/about-us">About Us</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <div className="footer__col">
                            <div className="footer__address">
                                <address>
                                    <p>Lorem str #8, Lorem, Lorem</p>
                                    <p><a href="mailto: sample@sample.com">sample@sample.com</a></p>
                                    <p><a href="tel: +123456789">+123456789</a></p>
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__foot">
                <p>&copy; Ivan Stefanov 2024</p>
            </div>
        </footer>
    );
}