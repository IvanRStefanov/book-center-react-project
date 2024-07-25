import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";

export default function HeaderUserUtils({
	showUserInfo
}) {
	const UserCTX = useContext(UserContext);
	
	return (
		<div className="header__user-utils">
			<Link href="#" className="user-utils ico-background" onClick={showUserInfo}>
				<img src={UserCTX.user.imageUrl} alt="" />
			</Link>
		</div>
	);
}