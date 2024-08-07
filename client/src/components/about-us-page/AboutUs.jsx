export default function AboutUs() {
	return (
		<div className="section-about-us">
			<div className="shell">
				<div className="section__inner">
					<div className="section__main">
						<header className="section__head">
							<h1>
								About Book Center
							</h1>
						</header>

						<div className="section__body">
							<div className="section__group">
								<h5>
									Who are we?
								</h5>

								<p>
									Book Center is an online second hand book shop. It's main purpose is to help readers to find that one book they'v been looking for so long. Because we know the strugle to complete you collection with that one book who has been out of stock for ages.
								</p>
							</div>

							<div className="section__group">
								<h5>How does it work?</h5>

								<p>
									Create an account and post your old books. Who knows maybe someone is looking for that one book you have on your shelf.
								</p>

								<br></br>

								<p>
									We take no commisions or fees on the books posted here. Every cent is for you. The buyer will contact you through email and you will arange between yourselfs the delivery. We are here just to connect the two of you.
								</p>
							</div>
						</div>
					</div>

					<div className="section__media">
						<div className="section__img image-fit">
							<img src="/assets/images/book-shelf.jpeg" alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}