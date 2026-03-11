import { Suspense, lazy } from 'react';
import GlobalLoader from '../components/ui/Loader/GlobalLoader';
import WhiteSpace from '../components/layout/WhiteSpace/WhiteSpace';

// Lazy load about sections
const Hero = lazy(() => import('../sections/Services/Hero'));
const LogoCloud = lazy(() => import('../sections/Services/LogoCloud'));

const reducedWhiteSpaceHeight = '10vh';
const whiteSpaceHeight = '15vh';

const ServicesPage = () => {
  return (
    <main style={{overflow: 'hidden'}}>
      <Suspense fallback={<GlobalLoader />}>
        <Hero />
        <WhiteSpace height={reducedWhiteSpaceHeight} />

        <LogoCloud />
        <WhiteSpace height={reducedWhiteSpaceHeight} />

      </Suspense>
    </main>
  );
};

export default ServicesPage;
