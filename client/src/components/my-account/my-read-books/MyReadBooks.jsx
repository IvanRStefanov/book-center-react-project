import { Navigate } from "react-router-dom";

import TileReadBook from "./tile-read-book/TileReadBook";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getUserReadBooks } from "../../../services/readBooksService";

export default function MyReadBooks() {
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
		queryKey: ['userReadBooks', userId],
		queryFn: () => getUserReadBooks(userId)
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
						{data.map(readBook =>
							<li key={readBook._id}>
								<TileReadBook readBook={readBook} />
							</li>
						)}
					</ul>
			}
		</>
	);
}