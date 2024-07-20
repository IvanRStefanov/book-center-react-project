import { useState } from "react";
import { baseUrl } from "../../../../utils/variables";

export default function SingleBookReviewListItem({
	review,
	setReviews,
	loggedInUser,
	deleteReviewStateHandler
}) {
	const [isDeleting, setIsDeleting] = useState(false);

	function showDeleteCommentWarning() {
		setIsDeleting(true);
	}

	function removeDeleteCommentWarning() {
		setIsDeleting(false);
	}

	async function deleteComment() {
		const reviewId = review._id;
		const accessToken = loggedInUser.accessToken;
		
		try {
			const response = await fetch(`${baseUrl}/bookReviews/${reviewId}`, {
				method: 'delete',
				headers: {
					'X-Authorization': accessToken,
				}
			});

			if (response.ok != true) {
				const error = await response.json();
				throw new Error(error.message);
			}

			setReviews(reviews => reviews.filter(review => review._id !== reviewId));
			deleteReviewStateHandler(false)
			
		} catch (error) {
			console.log('Delete error', error.message);
		}
	}
	


	return (
		<li>
			<p className="list__item-comment">
				{review.comment}
			</p>

			<p className="list__item-author">
				- {review.firstName} {review.lastName}
			</p>

			{loggedInUser._id == review._ownerId
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
						<button className="list__item-warning-btn" onClick={deleteComment}>
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