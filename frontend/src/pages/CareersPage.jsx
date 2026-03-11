import { Suspense, lazy } from 'react';
import GlobalLoader from '../components/ui/Loader/GlobalLoader';
import WhiteSpace from '../components/layout/WhiteSpace/WhiteSpace';

// Lazy load sections with explicit paths
const SendCV = lazy(() => import('../sections/Careers/SendCV'));
const Culture = lazy(() => import('../sections/Careers/Culture'));
const LogoCloud = lazy(() => import('../sections/Careers/LogoCloud'));
const ReachOut = lazy(() => import('../sections/Careers/ReachOut'));

const reducedWhiteSpaceHeight = '10vh';
const whiteSpaceHeight = '20vh';

const HomePage = () => {
    return (
        <main>
        <Suspense fallback={<GlobalLoader />}>
            <SendCV />
            <WhiteSpace height={reducedWhiteSpaceHeight} />

            <Culture />
            <WhiteSpace height={whiteSpaceHeight} />

            <LogoCloud />
            <WhiteSpace height={whiteSpaceHeight} />

            <ReachOut />
            <WhiteSpace height={reducedWhiteSpaceHeight} />

        </Suspense>
        </main>
    );
};

export default HomePage;
