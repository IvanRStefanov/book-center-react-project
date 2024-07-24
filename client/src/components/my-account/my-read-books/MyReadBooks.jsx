import { useNavigate } from "react-router-dom";

import TileBook from "../../tile-book/TileBook";
import TileReadBook from "./tile-read-book/TileReadBook";

export default function MyReadBooks({
	loggedInUser,
	userReadBooks,
	updateUserReadBooks
}) {
	const navigate = useNavigate();

	if (!loggedInUser) {
		navigate('/');
	}


	return (
		<ul className="list-books">
			{userReadBooks.map(readBook =>
				<li key={readBook._id}>
					<TileReadBook
						key={readBook._id}
						readBook={readBook}
					/>
				</li>
			)}
		</ul>
	);
}