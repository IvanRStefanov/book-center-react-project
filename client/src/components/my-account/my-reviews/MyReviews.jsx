import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../../contexts/UserContext";
import SIngleUserReviewItem from "./single-user-review-item/SingleUserReviewItem";

export default function MyReviews() {

	const UserCTX = useContext(UserContext);
	const navigate = useNavigate();

	if (!UserCTX.user) {
		navigate('/');
	}

	return (
		<ul className="list-user-reviewed-books">
			{UserCTX.reviewedBooks.map(review =>
				<SIngleUserReviewItem
					key={review._id}
					review={review}
				/>
			)}
		</ul>
	);
}