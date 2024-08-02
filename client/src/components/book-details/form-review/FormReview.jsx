import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { createUserReview } from "../../../services/reviewBookSService";

import { UserContext } from "../../../contexts/UserContext";

export default function FormReview({
	bookId,
	book,
}) {
	const UserCTX = useContext(UserContext);
	const queryClient = useQueryClient();


	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			comment: '',
		}
	})

	const addBookReviewMutation = useMutation({
		mutationFn: async (reviewBody) => {
			return createUserReview(reviewBody)
		},
	});

	async function onPostReviewSubmitHandler(data) {
		try {
			const reviewBody = {
				comment: data.comment,
				bookId,
				bookName: book.name,
				userFirstName: UserCTX.user.firstName,
				userLastName: UserCTX.user.lastName
			}

			await addBookReviewMutation.mutateAsync(reviewBody, {
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['bookReviews'] })
					queryClient.invalidateQueries({ queryKey: ['userReviewedBooks', bookId] })
				},
				onError: (error) => {
					if (error.message == 'Failed to fetch') {
						throw new Error(error.message)
					}
				}
			});

		} catch (error) {
			console.error(error.message);
			setError('serverError', {
				type: 'serverErrorMessage',
				message: error.message === 'Failed to fetch' ? 'Please try again later, there are some technical issues' : error.message,
			})
		}
	}

	function onError(errors) {
		if (errors.serverError) {
			clearErrors('serverError');
			handleSubmit(submitEditedBookHandler)();
		}
	}

	return (
		<div className="form form--review">
			<form onSubmit={handleSubmit(onPostReviewSubmitHandler, onError)}>
				<div className="form__body">
					{errors ?
						<div className="form__error">
							<p>{errors.serverError ? errors.serverError.message : errors.comment?.message}</p>
						</div>
						: <></>
					}

					<div className={errors.comment ? "form__row form__row--err" : "form__row"}>
						<label htmlFor="comment" className="form__label">Describe your reading experience</label>
						<div className="form__controls">
							<textarea
								name="comment"
								id="comment"
								className="textarea"
								disabled={isSubmitting}
								{...register('comment', {
									required: 'Your review is empty.'
								})}
							/>
						</div>
					</div>
				</div>

				<div className="form__actions">
					<button
						className={addBookReviewMutation.isPending ? "form__btn form__btn--spinner" : "form__btn"}
						disabled={addBookReviewMutation.isPending}
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}