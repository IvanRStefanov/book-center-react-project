import { useNavigate } from "react-router-dom";
import SIngleUserReviewItem from "./single-user-review-item/SingleUserReviewItem";

export default function MyReviews({
	loggedInUser,
	userReviewedBooks,
	updateUserReviewedBooks
}) {
	
	const navigate = useNavigate();

	if (!loggedInUser) {
		navigate('/');
	}

	return (
		<ul className="list-user-reviewed-books">
			{userReviewedBooks.map(review =>
				<SIngleUserReviewItem
				review={review}
				updateUserReviewedBooks={updateUserReviewedBooks}
				userReviewedBooks={userReviewedBooks}
				/>
			)}
		</ul>
	);
}