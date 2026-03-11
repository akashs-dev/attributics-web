import { Suspense, lazy } from 'react';
import GlobalLoader from '../components/ui/Loader/GlobalLoader';
import WhiteSpace from '../components/layout/WhiteSpace/WhiteSpace';

// Lazy load about sections
const Policies = lazy(() => import('../sections/Privacy/Policies'));

const reducedWhiteSpaceHeight = '10vh';
const whiteSpaceHeight = '15vh';

const ServicesPage = () => {
  return (
    <main style={{overflow: 'hidden'}}>
      <Suspense fallback={<GlobalLoader />}>
        <Policies />
        <WhiteSpace height={whiteSpaceHeight} />
      </Suspense>
    </main>
  );
};

export default ServicesPage;
