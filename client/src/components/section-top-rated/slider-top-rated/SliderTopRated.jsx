import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import TileBook from '../../tile-book/TileBook.jsx';
import { baseUrl } from '../../../utils/variables.js';

import 'swiper/css';


export default function SliderTopRated() {
    const [topRatedBooks, setTopRatedBooks] = useState([]);

    useEffect(() => {
        async function getTopRatedBooks() {
            try {
                const response = await fetch(`${baseUrl}/books?sortBy=averageRating%20desc&pageSize=5`);
                const resultTopFiveRatedBooks = await response.json();
                const topFiveRatedBooks = Object.values(resultTopFiveRatedBooks);

                setTopRatedBooks(topFiveRatedBooks)
            } catch (error) {
                console.error(error);
            }
        }

        getTopRatedBooks()
    }, [])

    return (
        <>
        <Swiper
				spaceBetween={30}
				slidesPerView={3}
				className='slider-top-rated'
			>
				{topRatedBooks.map(book =>
					<SwiperSlide key={book._id}>
						<TileBook book={book} />
					</SwiperSlide>
				)}
			</Swiper>
        </>
    )
}
