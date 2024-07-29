// import { useState } from "react";

import PublishForm from "./publish-form/PublishForm";

export default function PublishPage() {

	// const [error, setError] = useState(false);

	return (
		<section className="section-publish-new-book">
			<div className="shell section__shell">
				<div className="section__form">
					<PublishForm />
				</div>
			</div>
		</section>
	);
}