import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (
    onScrollEnd: () => void,
    intersectionOptions?: IntersectionObserverInit,
) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;
        let observer: IntersectionObserver;

        if (wrapperElement && triggerElement) {
            const options = {
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1.0,
                ...intersectionOptions,
            };
            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    onScrollEnd();
                }
            }, options);

            observer.observe(triggerElement);
        }
        return () => {
            if (triggerElement && observer) {
                observer.unobserve(triggerElement);
            }
        };
    }, [onScrollEnd, intersectionOptions]);

    return {
        triggerRef,
        wrapperRef,
    };
};
