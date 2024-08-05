import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { createNewBook } from '../../../services/booksService';
import { bookGenres } from '../../../utils/variables';

import { UserContext } from '../../../contexts/UserContext';

export default function PublishForm() {
	const navigate = useNavigate();
	const UserCTX = useContext(UserContext);

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			name: '',
			author: '',
			imgUrl: '',
			description: '',
			genre: [],
			price: ''
		}
	});

	const addNewBookMutation = useMutation({
		mutationFn: async (newBookObject) => {
			return createNewBook(newBookObject)
		}
	})

	const [disableCheckbox, setDisableCheckbox] = useState(true)
	useEffect(() => {
		setDisableCheckbox(false)
	}, [isSubmitting])

	async function publishNewBookSubmitHandler(data) {
		try {
			const newBookObject = {
				...data,
				price: Number(parseFloat(data.price).toFixed(2)),
				publisherEmail: UserCTX.user.email,
				publisherFirstName: UserCTX.user.firstName,
				publisherLastName: UserCTX.user.lastName
			};

			await addNewBookMutation.mutateAsync(newBookObject, {
				onSuccess: (data) => {
					navigate('/catalog/' + data._id);
				},
				onError: (error) => {
					if (error.message == 'Failed to fetch') {
						throw new Error(error.message)
					}
				}
			});
		} catch (error) {
			console.error(error.message)
			setError('serverError', {
				type: 'serverErrMsg',
				message: error.message == 'Failed to fetch' ? 'Please try again later, there are some technical issues' : error.message,
			})
		}
	}

	function onError(errors) {
		if (errors.serverError) {
			setDisableCheckbox(false)
			clearErrors('serverError');
			handleSubmit(submitEditedBookHandler)();
		}
	}

	return (
		<>
			{errors.serverError
				?
				<div className='section__error'>
					<p>{errors.serverError.message}</p>
					<br></br>
					<p><Link to={'/'} className='btn'>Home</Link></p>
				</div>
				:
				<div className="form">
					<form onSubmit={handleSubmit(publishNewBookSubmitHandler, onError)}>
						<div className="form__head">
							<h1>Publish new book</h1>
						</div>

						<div className="form__body">
							<div className={errors.name ? "form__row form__row--err" : 'form__row'}>
								<label
									htmlFor="name"
									className={addNewBookMutation.isPending ? "form__label form__label--submiting" : "form__label"}
								>
									Book name
								</label>

								<div className="form__controls">
									<input
										type="text"
										className="field"
										name="name"
										id="name"
										autoComplete='off'
										disabled={addNewBookMutation.isPending}
										{...register('name', {
											required: true,
										})}
									/>
								</div>
							</div>

							<div className={errors.author ? "form__row form__row--err" : 'form__row'}>
								<label
									htmlFor="author"
									className={addNewBookMutation.isPending ? "form__label form__label--submiting" : "form__label"}
								>
									Author
								</label>

								<div className="form__controls">
									<input
										type="text"
										className="field"
										name="author"
										id="author"
										autoComplete='off'
										disabled={addNewBookMutation.isPending}
										{...register('author', {
											required: true,
										})}
									/>
								</div>
							</div>

							<div className={errors.imgUrl ? "form__row form__row--err" : 'form__row'}>
								<label
									htmlFor="imgUrl"
									className={addNewBookMutation.isPending ? "form__label form__label--submiting" : "form__label"}
								>
									Book cover URL
								</label>

								<div className="form__controls">
									<input
										type="text"
										className="field"
										name="imgUrl"
										id="imgUrl"
										disabled={addNewBookMutation.isPending}
										{...register('imgUrl', {
											required: true,
										})}
									/>
								</div>
							</div>

							<div className={errors.description ? "form__row form__row--err" : 'form__row'}>
								<label
									htmlFor="description"
									className={addNewBookMutation.isPending ? "form__label form__label--submiting" : "form__label"}
								>
									Book description
								</label>

								<div className="form__controls">
									<textarea
										className="textarea"
										name="description"
										id="description"
										disabled={addNewBookMutation.isPending}
										{...register('description', {
											required: true,
										})}
									></textarea>
								</div>
							</div>

							<div className={errors.genre ? "form__row form__row--err" : 'form__row'}>
								<fieldset>
									<legend>What genre is the book?{errors.genre && <strong> {errors.genre.message}</strong>}</legend>

									<ul className="checkboxes">
										{bookGenres.map(bookGenre =>
											<li key={bookGenre}>
												<input
													type="checkbox"
													id={bookGenre}
													name={bookGenre}
													value={bookGenre}
													disabled={disableCheckbox}
													{...register('genre', {
														required: 'Please pick at least one',
													})}
												/>
												<label htmlFor={bookGenre}>{bookGenre}</label>
											</li>
										)}
									</ul>
								</fieldset>
							</div>

							<div className={errors.price ? "form__row form__row--err" : 'form__row'}>
								<label
									htmlFor="price"
									className={addNewBookMutation.isPending ? "form__label form__label--submiting" : "form__label"}
								>Price
								</label>

								<div className="form__controls">
									<input
										type="number"
										className="field"
										name="price"
										id="price"
										step={.01}
										min={0}
										autoComplete='off'
										disabled={isSubmitting}
										{...register('price', {
											required: true,
										})}
									/>
								</div>
							</div>
						</div>

						<div className="form__actions">
							<button
								type="submit"
								disabled={addNewBookMutation.isPending}
								className={addNewBookMutation.isPending ? 'form__btn form__btn--spinner' : 'form__btn'}
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			}
		</>
	);
}