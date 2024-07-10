// import TileBook from './components/tile-book/TileBook'
import SectionTestimonials from './components/section-testimonials/SeectionTestimonials'
import SectionTopRated from './components/section-top-rated/SectionTopRated'

function App() {

	return (
		<div className='wrapper'>
			<header className="header">
				<div className="shell">
					<div className="header__content">
						<div className="header__logo">
							<a href="#" className="logo">
								<img src="./src/assets/svgs/opened-book.svg" alt=""></img>
							</a>
						</div>

						<div className="header__actions">
							<div className="header__menu">
								<ul className="menu">
									<li>
										<a href="#">Featured</a>
									</li>

									<li>
										<a href="#">Catalog</a>
									</li>

									<li>
										<a href="#">Contact</a>
									</li>

									<li>
										<a href="#">About</a>
									</li>

									<li>
										<a href="#">Publish</a>
									</li>
								</ul>
							</div>

							<div className="header__utils">
								<a href="#" className="login">
									<img src="./src/assets/svgs/user-ico.svg" alt=""></img>
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* <div className="header__accaunt-modal" style={{display: "none"}}>
					<div className="modal-user">
						<div className="modal__bg"></div>

						<div className="modal__content">
							<button className="modal__close-btn"></button>

							<div className="modal__shell">
								<div className="modal__items">
									<div className="modal__item">
										<div className="form">
											<form action="">
												<div className="form__head">
													<h5>Login</h5>
												</div>

												<div className="form__body">
													<div className="form__row">
														<label hmtlfor="email"
															className="form__label">Email</label>

														<div className="form__controls">
															<input type="email" className="field" id="email"></input>
														</div>
													</div>

													<div className="form__row">
														<label hmtlfor="password"
															className="form__label">Password</label>

														<div className="form__controls">
															<input type="password" className="field" id="password"></input>
														</div>
													</div>
												</div>

												<div className="form__actions">
													<input type="submit" value="Submit" className="form__btn"></input>
												</div>
											</form>
										</div>
									</div>

									<div className="modal__separator">
										<span>or</span>
									</div>

									<div className="modal__item">
										<div className="form">
											<form action="">
												<div className="form__head">
													<h5>
														Register
													</h5>
												</div>

												<div className="form__body">
													<div className="form__cols">
														<div className="form__col">
															<div className="form__row">
																<label hmtlfor="firstName" className="form__label">First
																	name</label>

																<div className="form__controls">
																	<input type="text" className="field" id="firstName"></input>
																</div>
															</div>
														</div>

														<div className="form__col">
															<div className="form__row">
																<label hmtlfor="lastName" className="form__label">Last
																	name</label>

																<div className="form__controls">
																	<input type="text" className="field" id="lastName"></input>
																</div>
															</div>
														</div>

														<div className="form__col form__col--full-width">
															<div className="form__row">
																<label hmtlfor="email" id="email">Email</label>

																<div className="form__controls">
																	<input type="email" id="email" className="field"></input>
																</div>
															</div>
														</div>

														<div className="form__col ">
															<div className="form__row">
																<label hmtlfor="password">Password</label>

																<div className="form__controls">
																	<input type="password" className="field" id="passwordFirst"></input>
																</div>
															</div>
														</div>

														<div className="form__col">
															<div className="form__row">
																<label hmtlfor="passwordRepeat">Repeat Password</label>

																<div className="form__controls">
																	<input type="password" className="field" id="passwordRepeat"></input>
																</div>
															</div>
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
					</div>
				</div> */}
			</header>

			<main>
				<div className="hero">
					<div className="hero__bg-video">
						<video src="./src/assets/video/video-bg-2.mp4" autoPlay={true} muted={true} loop playsInline></video>
					</div>

					<div className="hero__body">
						<div className="shell">
							<div className="hero__content">
								<header className="hero__head">
									<h1>Dive into a new <strong>adventure</strong></h1>
								</header>

								<div className="hero__actions">
									<a href="#" className="btn btn--uppercase">
										Join now
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<SectionTopRated />

				<SectionTestimonials />
			</main>

			<footer className="footer">

			</footer>
		</div>
	)
}

export default App
