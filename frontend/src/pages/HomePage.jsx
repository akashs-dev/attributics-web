import { Suspense, lazy } from 'react';
import GlobalLoader from '../components/ui/Loader/GlobalLoader';
import WhiteSpace from '../components/layout/WhiteSpace/WhiteSpace';

// Lazy load sections with explicit paths
const HeroTwo = lazy(() => import('../sections/Home/HeroTwo/HeroTwo'));
const Metrics = lazy(() => import('../sections/Home/Metrics/Metrics'));
const Agentic = lazy(() => import('../sections/Home/Agentic/Agentic'));
const FeaturesTwo = lazy(() => import('../sections/Home/FeaturesTwo/FeaturesTwo'));
const Partners = lazy(() => import('../sections/Home/Partners/Partners'));
const CTA = lazy(() => import('../sections/Home/CTA/CTA'));
const Playbook = lazy(() => import('../sections/Home/Playbook/Playbook'));

const reducedWhiteSpaceHeight = '10vh';
const whiteSpaceHeight = '15vh';
const biggerWhiteSpaceHeight = '25vh';

const HomePage = () => {
  return (
    <main>
      <Suspense fallback={<GlobalLoader />}>
        <HeroTwo />
        <WhiteSpace height={whiteSpaceHeight} />
        
        <Metrics />
        <WhiteSpace height={whiteSpaceHeight} />

        <Agentic />
        {/* <WhiteSpace height={whiteSpaceHeight} /> */}

        <FeaturesTwo />
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
