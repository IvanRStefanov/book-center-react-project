import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Hero from './components/hero/Hero'
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
