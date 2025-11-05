import { FC, SyntheticEvent } from 'react';
import { GalleryImage, ImageMeta } from "../../types";
type SlideProps = {
    isActive: boolean;
    image: GalleryImage;
    meta?: ImageMeta;
    swiperAspectRatio: number;
    imageAspectRatio: number;
    index: number;
    swiperHeight: number;
    slideVisible: boolean;
    handleLoad: (event: SyntheticEvent<HTMLImageElement>, index: number) => void;
    handleLoadError: (index: number) => void;
};
declare const Slide: FC<SlideProps>;
export { Slide };
