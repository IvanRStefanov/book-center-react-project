import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export default function HeaderUserUtils({
	showUserInfo
}) {
	const UserCTX = useContext(UserContext);

	return (
		<div className="header__user-utils">
			<button href="#" className="user-utils ico-background" onClick={showUserInfo}>
				<img src={UserCTX.user.imageUrl} alt="" />
			</button>
		</div>
	);
}