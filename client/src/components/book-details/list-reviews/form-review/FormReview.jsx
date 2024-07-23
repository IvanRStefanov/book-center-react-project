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
	const [invalidMsg, setInvalidMsg] = useState('');
	const [error, setError] = useState('');

	function formTextChangeHandler(e) {
		setReviewText({ [e.target.name]: e.target.value.trim() });
	}

	async function onPostReviewSubmitHandler(event) {
		event.preventDefault();
		console.log(reviewText)

		try {
			setInvalidMsg('');
			setSubmitting(oldState => !oldState);

			const message = reviewText.comment;
			console.log(message)
			if (message === undefined) {
				console.log(message)
				setInvalidMsg('Your message is empty!');
				setSubmitting(oldState => !oldState);

				return;
			}

			const reviewBody = {
				comment: reviewText.comment,
				bookId,
				userFirstName: loggedInUser.firstName,
				userLastName: loggedInUser.lastName
			}
			const data = await createUserReview(reviewBody);

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
					{invalidMsg || error &&
						<div className="form__error">
							{invalidMsg && <p>{invalidMsg}</p>}
							
							{error && <p>{error}</p>}
						</div>
					}

					<div className="form__row">
						<label htmlFor="comment" className="form__label">Describe your reading experience</label>
						<div className="form__controls">
							<textarea name="comment" id="comment" className="textarea" onChange={formTextChangeHandler}></textarea>
						</div>
					</div>
				</div>

				<div className="form__actions">
					<button
						className={submitting ? "form__btn form__btn--spinner" : "form__btn"}
						disabled={submitting}
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}