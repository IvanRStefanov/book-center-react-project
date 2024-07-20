import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import TileBook from '../../tile-book/TileBook.jsx';
import { baseUrl } from '../../../utils/variables.js';

import 'swiper/css';


export default function SliderNewestFive() {
    const [newestFiveBooks, setNewestFive] = useState([]);

    useEffect(() => {
        async function getNewestFiveBooks() {
            try {
                const response = await fetch(`${baseUrl}/books?sortBy=_createdOn%20desc&pageSize=5`);
                const data = await response.json();
                const newestFiveBooks = Object.values(data);

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
