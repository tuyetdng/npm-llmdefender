import React, { useRef, useEffect } from 'react';
import cn from 'classnames';
import noUiSlider from 'nouislider';

const styles = {"component":"slider__component_14pip","s":"slider__s_14pip","m":"slider__m_14pip"};
require('./index.css');

const Slider = ({ min = 0, max = 100, step = 1, value = 0, disabled, pips, range = { min, max }, size = 's', className, onChange, dataTestId, }) => {
    const sliderRef = useRef(null);
    const busyRef = useRef(false);
    const getSlider = () => sliderRef.current?.noUiSlider;
    useEffect(() => {
        if (!sliderRef.current)
            return;
        const slider = noUiSlider.create(sliderRef.current, {
            start: [value],
            connect: [true, false],
            step,
            pips: pips,
            range,
        });
        slider.on('start', () => {
            busyRef.current = true;
        });
        slider.on('change', () => {
            busyRef.current = false;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const slider = getSlider();
        // Пропускаем обновление, если происходит взаимодействие со слайдером
        if (slider && busyRef.current === false)
            slider.set(value, false);
    }, [value]);
    useEffect(() => {
        const slider = getSlider();
        if (!slider)
            return;
        slider.updateOptions({
            step,
            range,
            pips: pips,
        }, true);
    }, [pips, range, step]);
    useEffect(() => {
        const slider = getSlider();
        if (!slider)
            return;
        const handler = () => {
            if (onChange) {
                onChange({ value: Number(slider.get()) });
            }
        };
        slider.off('slide');
        slider.on('slide', handler);
    }, [onChange]);
    return (React.createElement("div", { className: cn(styles.component, className, styles[size]), ref: sliderRef, "data-test-id": dataTestId, ...{ disabled } }));
};

export { Slider };
