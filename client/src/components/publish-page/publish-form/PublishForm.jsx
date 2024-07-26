import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { createNewBook } from '../../../services/booksService';
import { bookGenres } from '../../../utils/variables';

import UserContext from '../../../contexts/UserContext';
import Checkbox from './checkbox/Checkbox';

export default function PublishForm({
	setError
}) {
	const [formValues, setFormValues] = useState({});
	const [hasEmptyField, setHasEmptyField] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);

	const navigate = useNavigate();
	const UserCTX = useContext(UserContext);

	function isDisabledToggler() {
		setIsDisabled(oldState => !oldState);
	}

	function changeHandler(e) {
		setFormValues(oldValues => ({
			...oldValues,
			[e.target.name]: e.target.type === 'checkbox'
				? e.target.checked
				: e.target.value
		}));
	}

	async function publishNewBookSubmitHandler(event) {
		event.preventDefault();
		setHasEmptyField(false);

		let bookGenresToSend = [];

		const newBookData = {
			name: formValues.name || '',
			author: formValues.author || '',
			imgUrl: formValues.imgUrl || '',
			description: formValues.description || '',
			price: formValues.price || '',
			genre: bookGenresToSend,
		}

		for (const [key, value] of Object.entries(formValues)) {
			if (bookGenres.includes(key) && value === true) {
				bookGenresToSend.push(key);
			}
		}

		for (const [key, value] of Object.entries(newBookData)) {
			if (value == '' || value.length == 0) {
				return setHasEmptyField(oldState => !oldState);
			}
		}

		try {
			isDisabledToggler();
			const response = await createNewBook({
				...newBookData,
				publisherEmail: UserCTX.user.email,
				publisherFirstName: UserCTX.user.firstName,
				publisherLastName: UserCTX.user.lastName
			});

			UserCTX.updatePostedBooks();
			isDisabledToggler();

			navigate('/catalog/' + response._id);
		} catch (err) {
			isDisabledToggler();
			setError(oldState => !oldState);
			console.error(err)
		}
	}
	return (
		<div className="form">

			<form onSubmit={publishNewBookSubmitHandler}>
				<div className="form__head">
					<h1>Publish new book</h1>
				</div>

				{hasEmptyField &&
					<div className="form__error">
						<p>No empty fields allowed!</p>
					</div>
				}

				<div className="form__body">
					<div className="form__row">
						<label htmlFor="name" className="form__label">Book name</label>

						<div className="form__controls">
							<input type="text" className="field" name="name" id="name" disabled={isDisabled} onChange={changeHandler} autoComplete='off' />
						</div>
					</div>

					<div className="form__row">
						<label htmlFor="author" className="form__label">Author</label>

						<div className="form__controls">
							<input type="text" className="field" name="author" id="author" disabled={isDisabled} onChange={changeHandler} autoComplete='off' />
						</div>
					</div>

					<div className="form__row">
						<label htmlFor="imgUrl" className="form__label">Book cover URL</label>

						<div className="form__controls">
							<input type="text" className="field" name="imgUrl" id="imgUrl" disabled={isDisabled} onChange={changeHandler} autoComplete='off' />
						</div>
					</div>

					<div className="form__row">
						<label htmlFor="description" className="form__label">Book description</label>

						<div className="form__controls">
							<textarea className="textarea" name="description" id="description" disabled={isDisabled} onChange={changeHandler}></textarea>
						</div>
					</div>

					<div className="form__row">
						<fieldset>
							<legend>What genre is the book?</legend>

							<ul className="checkboxes">
								{bookGenres.map(genre =>
									<Checkbox
										key={genre}
										genre={genre}
										isDisabled={isDisabled}
										formValues={formValues}
										changeHandler={changeHandler}
									/>
								)}
							</ul>
						</fieldset>
					</div>

					<div className="form__row">
						<label htmlFor="price" className="form__label">Price</label>

						<div className="form__controls">
							<input type="number" className="field" name="price" id="price" step={.01} min={0} disabled={isDisabled} onChange={changeHandler} autoComplete='off' />
						</div>
					</div>
				</div>

				<div className="form__actions">
					<button type="submit" disabled={isDisabled} className={isDisabled ? 'form__btn form__btn--spinner' : 'form__btn'}>
						Submit
					</button>
				</div>
			</form>
		</div>

	);
}