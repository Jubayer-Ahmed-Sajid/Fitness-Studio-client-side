// import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Scrollbar, A11y, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import { EffectCube } from 'swiper/modules';
import Title from '../Title/TItle';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
const Testimonials = () => {
    const axiosPublic = useAxiosPublic()
    const { data: testimonials = [], isLoading } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const res = await axiosPublic.get('/feedback')
            return res?.data
        }
    })
    if (isLoading) {
        return ''
    }
    // console.log(testimonials);
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">'  + '</span>';
        },
    };
    const formDate = (numericDate) => {
        const date = new Date(numericDate);
        const formattedDate = date.toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
        return formattedDate;
    }
    return (
        <div className='py-10'>
            <Title title={'Testimonials'}></Title>
            <div className='py-7'>
                <Swiper
                    modules={[Navigation, Scrollbar, A11y, EffectCube, Autoplay, Pagination]}
                    pagination={pagination}

                    slidesPerView={1}
                    breakpoints={{
                        600: {
                            slidesPerView: 2,
                        },
                        1150: {
                            slidesPerView: 3,
                        },
                    }}

                    speed={2000}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}

                >

                    {
                        testimonials?.map(item => <SwiperSlide key={item._id}>
                            <div className='mx-5'>
                                <div className='py-3 pr-5 border-2 border-primary rounded-lg  sm:h-[230px]  overflow-hidden max-w-[350px] mx-auto'>
                                    <div className='flex gap-x-5 mb-3 pl-5'>
                                        <div className='w-16 h-16 rounded-full overflow-hidden flex justify-center items-center'> <img className='h-full w-full' src={item?.image} alt="" /></div>
                                        <div>
                                            <p className='text-sm font-medium'>{formDate(item?.time)}</p>
                                            <p className='font-bold'>{item?.feedbackGiver}</p>
                                        </div>
                                    </div>
                                    <hr className='border border-primary w-[100%]' />
                                    <div className='mt-7'>
                                        <p className='text-sm font-semibold text-justify pl-5'>{item?.feedback?.slice(0, 200)}...</p>
                                    </div>
                                </div>
                            </div>

                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;