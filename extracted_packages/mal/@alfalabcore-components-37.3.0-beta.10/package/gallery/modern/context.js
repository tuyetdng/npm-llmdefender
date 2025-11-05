import { createContext } from 'react';

const mockFn = () => undefined;
// eslint-disable-next-line @typescript-eslint/no-redeclare
const GalleryContext = createContext({
    singleSlide: false,
    currentSlideIndex: 0,
    images: [],
    imagesMeta: [],
    fullScreen: false,
    initialSlide: 0,
    setFullScreen: mockFn,
    setImageMeta: mockFn,
    slideTo: mockFn,
    slideNext: mockFn,
    slidePrev: mockFn,
    getSwiper: mockFn,
    setSwiper: mockFn,
    onClose: mockFn,
    setCurrentSlideIndex: mockFn,
    getCurrentImage: mockFn,
    getCurrentImageMeta: mockFn,
});

export { GalleryContext };
