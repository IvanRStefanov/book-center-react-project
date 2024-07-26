import { useState } from "react";

import PublishForm from "./publish-form/PublishForm";

export default function PublishPage() {
	
	const [error, setError] = useState(false);
	
	return (
		<section className="section-publish-new-book">
			<div className="shell section__shell">
				<div className="section__form">
					{error
						? <div className="section__form-error">
							<h3>Something went wrong. Please try again later.</h3>
						</div>
						: <PublishForm
							setError={setError}
						/>
					}
				</div>
			</div>
		</section>
	);
}