import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { UserContext } from "../../../contexts/UserContext";
import SIngleUserReviewItem from "./single-user-review-item/SingleUserReviewItem";
import { getUserReviewedBooks } from "../../../services/reviewBookSService";

export default function MyReviews() {
	const UserCTX = useContext(UserContext);
	const userId = UserCTX.user._id;

	const {
		isPending,
		error,
		data,
	} = useQuery({
		queryKey: ['userReviewedBooks', userId],
		queryFn: () => getUserReviewedBooks(userId)
	})

	return (
		<>
			{isPending
				? <div className="loading-spinner"></div>
				:
				error
					? <p>There are some technical issues, please try again later</p>

					: <ul className="list-user-reviewed-books">
						{data.map(review =>
							<SIngleUserReviewItem
								key={review._id}
								review={review}
							/>
						)}
					</ul>
			}
		</>
	);
}