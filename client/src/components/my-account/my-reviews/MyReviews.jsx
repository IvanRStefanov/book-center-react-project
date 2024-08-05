import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../../../contexts/UserContext";

import { getUserReviewedBooksPaginated, getUserReviewedBooksCount } from "../../../services/reviewBookSService";
import SIngleUserReviewItem from "./single-user-review-item/SingleUserReviewItem";
import Pagination from "../pagination/Pagination";

export default function MyReviews() {
	const pageParameter = 4;

	const UserCTX = useContext(UserContext);
	const userId = UserCTX.user._id;

	const [numberOfBooksToSkip, setNumberOfBooksToSkip] = useState(0);
	const [numberOfBooksToTake, setNumberOfBooksToTake] = useState(pageParameter)

	const {
		isPending: isPendingUserReviewedBooks,
		error: userReviewedBooksError,
		data: userReviewedBooksData,
	} = useQuery({
		queryKey: ['userReviewedBooks', userId, numberOfBooksToSkip, numberOfBooksToTake],
		queryFn: () => getUserReviewedBooksPaginated(userId, numberOfBooksToSkip, numberOfBooksToTake)
	})

	const {
		isPending: isPendingUserReviewsCount,
		error: userReviewsCountError,
		data: userReviewsCountData,
	} = useQuery({
		queryKey: ['user-read-count'],
		queryFn: () => getUserReviewedBooksCount(userId),
	});

	const hasPendingData = isPendingUserReviewedBooks || isPendingUserReviewsCount;

	if (userReviewedBooksError || userReviewsCountError) {
		return <Navigate to={'/error-page'} />
	}

	return (
		<>
			{hasPendingData
				? <div className="loading-spinner"></div>
				:
				<div className="list-user-reviewed-books">
					<ul>
						{userReviewedBooksData.map(review =>
							<SIngleUserReviewItem
								key={review._id}
								review={review}
							/>
						)}
					</ul>

					<Pagination
						paginationParemeter={pageParameter}
						setNumberToSkip={setNumberOfBooksToSkip}
						numberToSkip={numberOfBooksToSkip}
						maxCount={userReviewsCountData}
					/>
				</div>
			}
		</>
	);
}