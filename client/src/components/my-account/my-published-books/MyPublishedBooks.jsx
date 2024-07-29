import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { UserContext } from "../../../contexts/UserContext";
import TileBook from "../../tile-book/TileBook";

export default function MyPublishedBooks() {
	const navigate = useNavigate();
	const UserCTX = useContext(UserContext);

	useEffect(() => {
		if (!UserCTX.user) {
			navigate('/');

			return;
		}
	}, [])


	return (
		<ul className="list-books">
			{UserCTX.postedBooks.map(book =>
				<li key={book._id}>
					<TileBook book={book} />
				</li>
			)}
		</ul>
	);
}