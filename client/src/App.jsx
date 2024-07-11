import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Hero from './components/hero/Hero'
// import SectionContact from './components/section-contact/SectionContact'
// import SectionTestimonials from './components/section-testimonials/SeectionTestimonials'
import SectionTopRated from './components/section-top-rated/SectionTopRated'

function App() {

	return (
		<div className='wrapper'>
			<Header />

			<main>
				<Hero />

				<SectionTopRated />
			</main>

			<Footer />
		</div>
	)
}

export default App
