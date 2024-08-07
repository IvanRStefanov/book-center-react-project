export default function Hero() {
	return (
		<div className="hero">
			<div className="hero__bg-video">
				<video src="/assets/video/video-bg-2.mp4" autoPlay={true} muted={true} loop playsInline></video>
			</div>

			<div className="hero__body">
				<div className="shell">
					<header className="hero__head">
						<h1>Dive into a new <strong>adventure</strong> with <br></br>Book Center</h1>
					</header>
				</div>
			</div>
		</div>
	);
}