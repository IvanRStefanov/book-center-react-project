import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";

import { UserContext } from "../../../contexts/UserContext";
import TileBook from "../../tile-book/TileBook";
import { useQuery } from "@tanstack/react-query";
import { getUserPostedBooksCount, getUserPostedBooksPaginated } from "../../../services/booksService";
import Pagination from "../pagination/Pagination";

export default function MyPublishedBooks() {
	const pageParameter = 8;

	const UserCTX = useContext(UserContext);
	const userId = UserCTX.user._id;

	const [numberOfBooksToSkip, setNumberOfBooksToSkip] = useState(0);
	const [numberOfBooksToTake, setNumberOfBooksToTake] = useState(pageParameter)

	const {
		isPending: isPendingUserPostedBooks,
		error: userPostedBooksError,
		data: userPostedBooksData
	} = useQuery({
		queryKey: ['userPostedBooks', userId, numberOfBooksToSkip, numberOfBooksToTake],
		queryFn: () => getUserPostedBooksPaginated(userId, numberOfBooksToSkip, numberOfBooksToTake)
	})

	const {
		isPending: isPendingUserBooksCount,
		error: userBooksCountError,
		data: userBooksCountData,
	} = useQuery({
		queryKey: ['user-books-count'],
		queryFn: () => getUserPostedBooksCount(userId)
	});

	const hasPendingData = isPendingUserPostedBooks || isPendingUserBooksCount;

	if (userPostedBooksError || userBooksCountError) {
		return <Navigate to={'/error-page'} />
	}

	return (
		<>
			{hasPendingData
				?
				<div className="loading-spinner"></div>
				:
				<div className="list-books">
					<ul>
						{userPostedBooksData.map(book =>
							<li key={book._id}>
								<TileBook book={book} />
							</li>
						)}
					</ul>

					<Pagination
						paginationParemeter={pageParameter}
						setNumberToSkip={setNumberOfBooksToSkip}
						numberToSkip={numberOfBooksToSkip}
						maxCount={userBooksCountData}
					/>
				</div>
			}
		</>
	);
}