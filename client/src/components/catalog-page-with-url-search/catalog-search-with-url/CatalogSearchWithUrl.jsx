import { useForm } from "react-hook-form";

export default function CatalogSearchWithUrl({
	submitSearchHandler,
	searchBy,
	searchString,
	clearSeearchParams
}) {
	
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm({
		reValidateMode: 'onSubmit',
		defaultValues: {
			searchBy,
			searchString,
		},
	});

	function resetSearch() {
		reset({
			searchBy: '',
			searchString: ''
		});
		clearSeearchParams()
	}

	return (
		<div className="search">
			<form onSubmit={handleSubmit(submitSearchHandler)}>
				<div className="search__body">
					<div className={errors.searchBy ? "search__row search__row--error" : "search__row"}>
						<label htmlFor="searchBy" className="search__label">Search by:</label>

						<div className="search__controls search__select-wrapper">
							<select
								name="searchBy"
								id="searchBy"
								className="search__select"
								{...register('searchBy', {
									required: true
								})}
							>
								<option value="">Select...</option>
								<option value="name">Book name</option>
								<option value="author">Author</option>
								<option value="publisherEmail">Publisher Email</option>
							</select>
						</div>
					</div>

					<div className={errors.searchString ? "search__row search__row--error" : "search__row"}>
						<label htmlFor="searchString" className="search__label">Search for:</label>

						<div className="search__controls">
							<input
								className="search__field"
								id="searchString"
								name="searchString"
								type="text"
								{...register('searchString', {
									required: true,
								})}
							/>
						</div>
					</div>
				</div>

				<div className="search__actions">
					<button className="search__btn">
						<img src=".././src/assets/svgs/magnifying-glass.svg" alt="" />
					</button>

				</div>
			</form>

			<button className="search__reset-btn" onClick={() => resetSearch()}>Reset search</button>
		</div>
	);
}