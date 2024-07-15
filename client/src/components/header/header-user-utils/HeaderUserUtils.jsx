import { Link } from "react-router-dom";

export default function HeaderUserUtils({
    logedInUser,
    showUserInfo
}) {
    return (
        <div className="header__user-utils">
            <Link href="#" className="user-utils ico-background" onClick={showUserInfo}>
                <img src={logedInUser.imageUrl} alt="" />
            </Link>
        </div>
    );
}