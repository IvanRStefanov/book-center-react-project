import SingleBookReviewListItem from "./single-book-review-list-item/SingleBookReviewListItem";

export default function ListReviews({
	bookReviews,
	// setReviews,
	loggedInUser,
	updateUserReviewedBooks,
	deleteReviewStateHandler,
	updateBookReviewList
}) {
	return (

		<ul className="list-reviews">
			{bookReviews.map(review =>
				<SingleBookReviewListItem
					key={review._id}
					review={review}
					loggedInUser={loggedInUser}
					updateUserReviewedBooks={updateUserReviewedBooks}
					updateBookReviewList={updateBookReviewList}
				/>
			)}
		</ul>
	);
}