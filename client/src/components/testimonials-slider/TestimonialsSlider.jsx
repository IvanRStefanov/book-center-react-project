import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { baseUrl } from '../../utils/utils';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import sliderStyles from './TestimonialsSlider.module.scss';
import CardTestimonial from './card-testimonial/CardTestimonial';

export default function TestimonialSlider() {
	const [testimonials, setTestimonials] = useState([]);

	useEffect(() => {
		async function getTestimonials() {
			try {
				const response = await fetch(`${baseUrl}/testimonials`)
				const result = await response.json()
				const testimonials = Object.values(result)

				setTestimonials(testimonials);
			} catch (error) {
				console.log(error)
			}
		}

		getTestimonials()
	}, [])

	const delayTimer = 5000;

	return (
		<>
			<Swiper
				cssMode={true}
				spaceBetween={50}
				slidesPerView={1}
				onSwiper={(swiper) => setTimeout(function () {
					swiper.slideTo(1, 1, true)
				}, delayTimer)}
				loop={true}
				autoplay={{
					delay: delayTimer,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				className={sliderStyles['testimonials-slider']}
				modules={[Autoplay, Pagination]}
			>
				{testimonials.map(testimonial =>
					<SwiperSlide key={testimonial._id} className={sliderStyles['swiper-slide']}>
						<CardTestimonial testimonial={testimonial} />
					</SwiperSlide>
				)}
			</Swiper>
		</>
	);
};