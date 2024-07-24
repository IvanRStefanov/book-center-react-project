import { useNavigate } from "react-router-dom";

import TileBook from "../../tile-book/TileBook";

export default function MyPublishedBooks({
	loggedInUser,
	userPostedBooks
}) {
	const navigate = useNavigate();
	
	if (!loggedInUser) {
		navigate('/');
	}


	return (
		<>
			<ul className="list-books">
				{userPostedBooks.map(book => 
					<li key={book._id}>
						<TileBook book={book} />
					</li>
				)}
			</ul>
		</>
	);
}