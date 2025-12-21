import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // Method 2: Force scroll after a tiny delay (for smooth scroll libraries)
        const timeoutId = setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 0);

        // Method 3: Use requestAnimationFrame for better timing
        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });

        return () => clearTimeout(timeoutId);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
