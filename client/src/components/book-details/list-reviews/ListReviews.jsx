import SingleBookReviewListItem from "./single-book-review-list-item/SingleBookReviewListItem";

export default function ListReviews({
	bookReviews,
	updateBookReviewList
}) {
	return (

		<ul className="list-reviews">
			{bookReviews.map(review =>
				<SingleBookReviewListItem
					key={review._id}
					review={review}
					updateBookReviewList={updateBookReviewList}
				/>
			)}
		</ul>
	);
}