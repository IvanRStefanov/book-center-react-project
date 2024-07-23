import { useState } from "react";
import { createUserReview } from "../../../../services/reviewBookSService";

export default function FormReview({
	bookId,
	loggedInUser,
	updateUserReviewedBooks,
	updateBookReviewList
}) {
	const [reviewText, setReviewText] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [validMsg, setValidMsg] = useState(true);
	const [error, setError] = useState('');

	function formTextChangeHandler(e) {
		setReviewText({ [e.target.name]: e.target.value });
	}

	async function onPostReviewSubmitHandler(event) {
		event.preventDefault();

		try {
			setSubmitting(odlState => !odlState);
	
			const reviewBody = {
				comment: reviewText.comment,
				bookId,
				userFirstName: loggedInUser.firstName,
				userLastName: loggedInUser.lastName
			}
			await createUserReview(reviewBody);

			setSubmitting(odlState => !odlState);
			updateUserReviewedBooks();
			updateBookReviewList();
			
		} catch (err) {
			console.log(err);
			setError('Something went wrong. Please try again later');
		}
	}
	return (
		<div className="form form--review">
			<form onSubmit={onPostReviewSubmitHandler}>
				<div className="form__body">
					<div className="form__row">
						<label htmlFor="comment" className="form__label">Describe your reading experience</label>
						<div className="form__controls">
							<textarea name="comment" id="comment" className="textarea" onChange={formTextChangeHandler}></textarea>
						</div>
					</div>
				</div>

				<div className="form__actions">
					<input type="submit" value="submit" className="form__btn" disabled={submitting} />
				</div>
			</form>
		</div>
	);
}