import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../../contexts/UserContext";
import TileBook from "../../tile-book/TileBook";
import { useQuery } from "@tanstack/react-query";
import { getUserPostedBooks } from "../../../services/booksService";

export default function MyPublishedBooks() {
	const UserCTX = useContext(UserContext);

	if (!UserCTX.user) {
		return <Navigate to={'/'} />
	}

	const userId = UserCTX.user._id;

	const {
		isPending,
		error,
		data
	} = useQuery({
		queryKey: ['userPostedBooks'],
		queryFn: () => getUserPostedBooks(userId)
	})


	return (
		<>
			{error
				?
				<p>There are some technical issues, please try again later</p>
				:
				isPending
					? <div className="loading-spinner"></div>
					:
					<ul className="list-books">

						{data.map(book =>
							<li key={book._id}>
								<TileBook book={book} />
							</li>
						)}
					</ul>
			}
		</>
	);
}