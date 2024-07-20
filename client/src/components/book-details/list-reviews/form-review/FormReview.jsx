export default function FormReview() {
	return (
		<div className="form form--review">
			<form action="">
				<div className="form__body">
					<div className="form__row">
						<div className="form__row-head">
							Your rating:
						</div>
						<div className="form__radios star-rating">
							<input type="radio" name="rated" className="star" value={5} id="five" />
							<label htmlFor="five" title="Loved it!">&#9734;</label>

							<input type="radio" name="rated" className="star" value={4} id="four" />
							<label htmlFor="four" title="Liked it.">&#9734;</label>

							<input type="radio" name="rated" className="star" value={3} id="three" />
							<label htmlFor="three" title="It was ok.">&#9734;</label>

							<input type="radio" name="rated" className="star" value={2} id="two" />
							<label htmlFor="two" title="Didn't like it.">&#9734;</label>

							<input type="radio" name="rated" className="star" value={1} id="one" />
							<label htmlFor="one" title="Hated it!">&#9734;</label>
						</div>
					</div>

					<div className="form__row">
						<label htmlFor="comment" className="form__label">Describe your reading experience</label>
						<div className="form__controls">
							<textarea name="comment" id="comment" className="textarea"></textarea>
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