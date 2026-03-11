import { Suspense, lazy } from 'react';
import GlobalLoader from '../components/ui/Loader/GlobalLoader';
import WhiteSpace from '../components/layout/WhiteSpace/WhiteSpace';

// Lazy load sections with explicit paths
const Hero = lazy(() => import('../sections/Home/Hero'));
const Metrics = lazy(() => import('../sections/Home/Metrics'));
const Agentic = lazy(() => import('../sections/Home/Agentic'));
const Challenge = lazy(() => import('../sections/Home/Challenge/Challenge'));
const Partners = lazy(() => import('../sections/Home/Partners'));
const CTA = lazy(() => import('../sections/Home/CTA'));
const Playbook = lazy(() => import('../sections/Home/Playbook'));

const reducedWhiteSpaceHeight = '10vh';
const whiteSpaceHeight = '15vh';
const biggerWhiteSpaceHeight = '25vh';

const HomePage = () => {
  return (
    <main>
      <Suspense fallback={<GlobalLoader />}>
        <Hero />
        <WhiteSpace height={whiteSpaceHeight} />
        
        <Metrics />
        <WhiteSpace height={whiteSpaceHeight} />

        <Agentic />
        {/* <WhiteSpace height={whiteSpaceHeight} /> */}

        <Challenge />
        {/* <WhiteSpace height={whiteSpaceHeight} /> */}
        
        <Partners />
        <WhiteSpace height={whiteSpaceHeight} />

        <CTA />
        <WhiteSpace height={whiteSpaceHeight} />

        <Playbook />
        <WhiteSpace height={reducedWhiteSpaceHeight} />

      </Suspense>
    </main>
  );
};

export default HomePage;
