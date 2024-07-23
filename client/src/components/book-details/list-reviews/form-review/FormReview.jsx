import { useState } from "react";

export default function FormReview({
	updateBookReviewList
}) {
	const [reviewText, setReviewText] = useState('');

	function formTextChangeHandler(e) {
		setReviewText({[e.target.name]: e.target.value});
	}

	async function onPostReviewSubmitHandler(event) {
		event.preventDefault();

		console.log(reviewText)

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
					<input type="submit" value="submit" className="form__btn" />
				</div>
			</form>
		</div>
	);
}