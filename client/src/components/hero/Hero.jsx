export default function Hero() {
	return (
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
	);
}