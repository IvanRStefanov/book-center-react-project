import { useContext, useState } from "react";
import { deleteUserReview } from "../../../../services/reviewBookSService";

import UserContext from "../../../../contexts/UserContext";

export default function SingleBookReviewListItem({
	review,
	updateBookReviewList
}) {
	const UserCTX = useContext(UserContext);
	const [isDeleting, setIsDeleting] = useState(false);

	function showDeleteCommentWarning() {
		setIsDeleting(oldState => !oldState);
	}

	function removeDeleteCommentWarning() {
		setIsDeleting(oldState => !oldState);
	}

	async function deleteCommentHandler() {
		const reviewId = review._id;
		await deleteUserReview(reviewId);

		removeDeleteCommentWarning();
		updateBookReviewList();
		UserCTX.updateReviews();
	}

	return (
		<li>
			<p className="list__item-comment">
				{review.comment}
			</p>

			<p className="list__item-author">
				- {review.userFirstName} {review.userLastName}
			</p>

			{UserCTX.user._id == review._ownerId
				? <button className="list__item-owner-delete-btn" onClick={showDeleteCommentWarning}>
					<img src="../../src/assets/images/delete-icon.png" alt="" />
				</button>
				: ''
			}

			{isDeleting &&
				<div className="list__item-warning">
					<div className="list__item-warning-body">
						<p>You are about to delete your comment. Are you sure you want to delete it?</p>
					</div>

					<div className="list__item-owner-actions">
						<button className="list__item-warning-btn" onClick={deleteCommentHandler}>
							Yes, I want to delete the comment.
						</button>

						<button className="list__item-warning-btn list__item-reject-delete-btn" onClick={removeDeleteCommentWarning}>
							No, let the comment stay.
						</button>
					</div>
				</div>
			}
		</li>
	);
}