import SingleBookReviewListItem from "./single-book-review-list-item/SingleBookReviewListItem";

export default function ListReviews({
	reviews,
	setReviews,
	loggedInUser,
	setLoggedInUser,
	deleteReviewStateHandler
}) {
	return (

		<ul className="list-reviews">
			{reviews.map(review =>
				<SingleBookReviewListItem
					key={review._id}
					reviews={reviews}
					review={review}
					setReviews={setReviews}
					loggedInUser={loggedInUser}
					setLoggedInUser={setLoggedInUser}
					deleteReviewStateHandler={deleteReviewStateHandler}
				/>
			)}
		</ul>
	);
}