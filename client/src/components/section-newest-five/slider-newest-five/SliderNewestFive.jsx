import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import TileBook from '../../tile-book/TileBook.jsx';
// import { baseUrl } from '../../../utils/variables.js';

import { getLatestFiveBooks } from '../../../services/booksService.js';

import 'swiper/css';


export default function SliderNewestFive() {
    const [newestFiveBooks, setNewestFive] = useState([]);

    useEffect(() => {
        async function getNewestFiveBooks() {
            try {
                const newestFiveBooksData = await getLatestFiveBooks();
                const newestFiveBooks = Object.values(newestFiveBooksData);

                setNewestFive(newestFiveBooks)
            } catch (error) {
                console.error(error);
            }
        }

        getNewestFiveBooks()
    }, [])

    return (
        <>
        <Swiper
				spaceBetween={30}
				slidesPerView={3}
				className='slider-newest-five'
			>
				{newestFiveBooks.map(book =>
					<SwiperSlide key={book._id}>
						<TileBook book={book} />
					</SwiperSlide>
				)}
			</Swiper>
        </>
    )
}
