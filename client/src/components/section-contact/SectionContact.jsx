import { baseUrl } from "../../utils/variables";

export default function SectionContact() {
	async function addNewTestimonial(event) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const testimonialData = {
			...Object.fromEntries(formData),
			_createdOn: new Date().getTime(),
		};

		try {
			const res = await fetch(`${baseUrl}/jsonstore/booksData/testimonials`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(testimonialData)
			});

			if (res.ok != true) {
				const error = await res.json()
				throw new Error(error.message)
			}
		} catch (error) {
			console.log(error)
		}

	}

	return (
		<section className="section-contact">
			<div className="shell">
				<div className="section__content">
					<div className="section__media">
						<div className="section__img">
							<img src="./src/assets/svgs/quill.svg" alt="" />
						</div>
					</div>

					<div className="section__main">
						<header className="section__head">
							<h2>Give us your feedback</h2>
						</header>

						<div className="section__form">
							<div className="form">
								<form onSubmit={addNewTestimonial}>

									<div className="form__body">
										<div className="form__row">
											<label htmlFor="firstName" className="form__label">First name</label>

											<div className="form__controls">
												<input type="text" className="field" id="firstName" name="firstName" />
											</div>
										</div>

										<div className="form__row">
											<label htmlFor="lasttName" className="form__label">Last name</label>

											<div className="form__controls">
												<input type="text" className="field" id="lasttName" name="lastName" />
											</div>
										</div>

										<div className="form__row">
											<label htmlFor="email" className="form__label">Email</label>

											<div className="form__controls">
												<input type="email" className="field" id="email" name="email" />
											</div>
										</div>

										<div className="form__row">
											<label htmlFor="message" className="form__label">Message</label>

											<div className="form__controls">
												<textarea name="text" id="message" className="textarea"></textarea>
											</div>
										</div>
									</div>

									<div className="form__actions">
										<input type="submit" value="Submit" className="form__btn"></input>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}