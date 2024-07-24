import { useState } from "react";
import { createNewBook } from "../../services/booksService";
import { useNavigate } from "react-router-dom";
import PublishForm from "./publish-form/PublishForm";

export default function PublishPage({
	loggedInUser,
	updateUserPostedBooks
}) {
	const [formValues, setFormValues] = useState({});
	const [processing, setProcessing] = useState(false);
	const [error, setError] = useState(false);

	const navigate = useNavigate();

	function changeHandler(e) {
		setFormValues(oldValues => ({
			...oldValues,
			[e.target.name]: e.target.type === 'checkbox'
				? e.target.checked
				: e.target.value
		}))
	}

	async function publishNewBookSubmitHandler(event) {
		event.preventDefault();
		console.log(formValues)

		try {
			setProcessing(oldState => !oldState);
			const response = await createNewBook({
				...formValues,
				publisherEmail: loggedInUser.email,
				publisherFirstName: loggedInUser.firstName,
				publisherLastName: loggedInUser.lastName,
			});
			updateUserPostedBooks();
			navigate('/catalog/' + response._id);

		} catch (error) {
			console.log(error)
			setProcessing(oldState => !oldState);
			setError(oldState => !oldState);
		}
	}

	return (
		<section className="section-publish-new-book">
			<div className="shell section__shell">
				<div className="section__form">
					{processing &&
						<div className="section__form-loading-outer">
							<div className="section__form-loading-spinner"></div>
						</div>
					}

					{error
						? <div className="section__form-error">
							<h3>Something went wrong. Please try again later.</h3>
						</div>
						: <PublishForm
							changeHandler={changeHandler}
							publishNewBookSubmitHandler={publishNewBookSubmitHandler}
						/>
					}
				</div>
			</div>
		</section>
	);
}