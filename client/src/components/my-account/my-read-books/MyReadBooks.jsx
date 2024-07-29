import { useNavigate } from "react-router-dom";

import TileReadBook from "./tile-read-book/TileReadBook";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export default function MyReadBooks() {
	const navigate = useNavigate();
	const UserCTX = useContext(UserContext);

	if (!UserCTX.user) {
		navigate('/');
	}

	return (
		<ul className="list-books">
			{UserCTX.readBooks.map(readBook =>
				<li key={readBook._id}>
					<TileReadBook readBook={readBook} />
				</li>
			)}
		</ul>
	);
}