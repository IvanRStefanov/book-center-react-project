import { Link } from "react-router-dom";

export default function HeaderUserUtils({
    loggedInUser,
    showUserInfo
}) {
    return (
        <div className="header__user-utils">
            <Link href="#" className="user-utils ico-background" onClick={showUserInfo}>
                <img src={loggedInUser.imageUrl} alt="" />
            </Link>
        </div>
    );
}