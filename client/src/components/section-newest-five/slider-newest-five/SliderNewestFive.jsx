import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from '@tanstack/react-query';

import TileBook from '../../tile-book/TileBook.jsx';

import { getLatestFiveBooks } from '../../../services/booksService.js';

import 'swiper/css';

export default function SliderNewestFive() {
    const { isPending, data: books, error } = useQuery({
        queryKey: ['latestFiveBooks'],
        queryFn: async () => {
            const result = await getLatestFiveBooks();
            return result;
        },
    });
 
    if (error) {
        console.error(error.message);
    }

    return (
        <>
            {error
                ? error.message == 'Failed to fetch'
                    ? <p className='error-msg'>We are having technical issues, try again later</p>
                    : <p className='error-msg'>Something went wrong, please try again later</p>
                : isPending
                    ? <div className="loading-spinner"></div>
                    :
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={3}
                        className='slider-newest-five'
                    >
                        {books.map(book =>
                            <SwiperSlide key={book._id}>
                                <TileBook book={book} />
                            </SwiperSlide>
                        )}
                    </Swiper>
            }
        </>
    )
}
