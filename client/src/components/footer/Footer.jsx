export default function Footer() {
    return (
        <footer className="footer">
            <div className="shell">
                <div className="footer__content">
                    <div className="footer__cols">
                        <div className="footer__col">
                            <div className="footer__logo">
                                <a href="#" className="logo logo--footer">
                                    <img src="../src/assets/svgs/opened-book.svg" alt=""></img>
                                </a>
                            </div>
                        </div>

                        <div className="footer__col">
                            <div className="quick-links-menu">
                                <p className="quick-links-head">Quick Links</p>

                                <nav className="quick-links-nav">
                                    <ul>
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
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <div className="footer__col">
                            <div className="footer__address">
                                <address>
                                    <p>Lorem str #8, Lansing Michigan, USA</p>
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