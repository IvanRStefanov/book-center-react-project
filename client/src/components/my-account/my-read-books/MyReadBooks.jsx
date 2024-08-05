import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";

import { getUserReadBooksCount, getUserReadBooksPaginated } from "../../../services/readBooksService";

import Pagination from "../pagination/Pagination";
import TileReadBook from "./tile-read-book/TileReadBook";

export default function MyReadBooks() {
	const pageParameter = 8;

	const UserCTX = useContext(UserContext);
	const userId = UserCTX.user._id;

	const [numberOfBooksToSkip, setNumberOfBooksToSkip] = useState(0);
	const [numberOfBooksToTake, setNumberOfBooksToTake] = useState(pageParameter)

	const {
		isPending: isPendingUserReadBooks,
		error: userReadBooksError,
		data: userReadBooksData
	} = useQuery({
		queryKey: ['userReadBooks', userId, numberOfBooksToSkip, numberOfBooksToTake],
		queryFn: () => getUserReadBooksPaginated(userId, numberOfBooksToSkip, numberOfBooksToTake)
	});

	const {
		isPending: isPendingUserReadCount,
		error: userReadCountError,
		data: userReadCountData,
	} = useQuery({
		queryKey: ['user-read-count'],
		queryFn: () => getUserReadBooksCount(userId),
	});

	const hasPendingData = isPendingUserReadBooks || isPendingUserReadCount;

	if (userReadBooksError || userReadCountError) {
		return <Navigate to={'/error-page'} />
	}

	return (
		<>

			{hasPendingData
				? <div className="loading-spinner"></div>
				:
				<div className="list-books">
					<ul>
						{userReadBooksData.map(readBook =>
							<li key={readBook._id}>
								<TileReadBook readBook={readBook} />
							</li>
						)}
					</ul>

					<Pagination
						paginationParemeter={pageParameter}
						setNumberToSkip={setNumberOfBooksToSkip}
						numberToSkip={numberOfBooksToSkip}
						maxCount={userReadCountData}
					/>
				</div>}
		</>
	);
}