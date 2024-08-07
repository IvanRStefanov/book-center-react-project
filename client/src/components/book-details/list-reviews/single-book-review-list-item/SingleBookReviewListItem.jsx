import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteUserReview } from "../../../../services/reviewBookSService";
import { UserContext } from "../../../../contexts/UserContext";
import { formatDate } from "../../../../utils/utils";

export default function SingleBookReviewListItem({
	review,
}) {
	const UserCTX = useContext(UserContext);
	const queryClient = useQueryClient();
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
	}

	const deleteReviewMutation = useMutation({
		mutationFn: async () => {
			await deleteUserReview(review._id);
		},
		onSuccess: () => {
			const queryKeysToInvalidate = ['bookReviews', 'userReviewedBooks'];
			queryKeysToInvalidate.forEach(key => {
				queryClient.invalidateQueries({ queryKey: [key] })
			})
		},
		onError: (error) => {
			console.error(error);
		}
	})

	function resetDeleteReviewMutation() {
		setIsDeleting(false)
		deleteReviewMutation.reset();
	}

	return (
		<li>
			<p><small>{formatDate(review._createdOn)}</small></p>
			<p className="list__item-comment">
				{review.comment}
			</p>

			<p className="list__item-author">
				- {review.userFirstName} {review.userLastName}
			</p>

			{UserCTX.user._id == review._ownerId
				? <button className="list__item-owner-delete-btn" onClick={showDeleteCommentWarning}>
					<img src="/assets/images/delete-icon.png" alt="" />
				</button>
				: ''
			}

			{(isDeleting && !deleteReviewMutation.isPending && !deleteReviewMutation.isError) &&
					<div className="list__item-warning">
						<div className="list__item-warning-body">
							<p>You are about to delete your comment. Are you sure you want to delete it?</p>
						</div>

						<div className="list__item-owner-actions">
							<button
								className="list__item-warning-btn"
								onClick={() => deleteReviewMutation.mutate()}
							>
								Yes, I want to delete the comment.
							</button>

							<button
								className="list__item-warning-btn list__item-reject-delete-btn"
								onClick={removeDeleteCommentWarning}
							>
								No, let the comment stay.
							</button>
						</div>
					</div>
			}

			{(deleteReviewMutation.isPending && !deleteReviewMutation.isError) &&
				<div className="list__item-delete-loading">
					<div className="loading-spinner"></div>
				</div>
			}

			{deleteReviewMutation.isError &&
				<div className="list__item-error">
					<p>There seems to be some technical issues, please try again later.</p>
					<button onClick={() => resetDeleteReviewMutation()} className="list__item-close-error-message-btn"></button>
				</div>
			}
		</li>
	);
}