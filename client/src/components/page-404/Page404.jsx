import { Link } from "react-router-dom";

export default function Page404() {
    return (
        <div className="section-404">
            <div className="shell">
                <div className="section__content">
                    <h4>404 - Page not found</h4>

                    <p>The page you are looking for doesn't exist or there might be server issues.<br></br>If you are having trouble locating a destination, try vising the:</p>

                    <Link to={'/'} className="btn">Home</Link>
                </div>
            </div>
        </div>
    );
}