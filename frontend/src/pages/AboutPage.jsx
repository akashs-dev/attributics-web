import { Suspense, lazy } from 'react';
import GlobalLoader from '../components/ui/Loader/GlobalLoader';
import WhiteSpace from '../components/layout/WhiteSpace/WhiteSpace';

// Lazy load about sections
const Intro = lazy(() => import('../sections/About/Intro'));
const Statement = lazy(() => import('../sections/About/Statement'));
const Vision = lazy(() => import('../sections/About/Vision'));
const Team = lazy(() => import('../sections/About/Team'));
const GetStarted = lazy(() => import('../sections/About/GetStarted'));

const reducedWhiteSpaceHeight = '10vh';
const moreWhiteSpaceHeight = '20vh';
const whiteSpaceHeight = '15vh';

const AboutPage = () => {
  return (
    <main style={{overflow: 'hidden'}}>
      <Suspense fallback={<GlobalLoader />}>
        <Intro />
        <WhiteSpace height={whiteSpaceHeight} />

        <Statement />
        <WhiteSpace height={whiteSpaceHeight} />

        <Vision />
        <WhiteSpace height={whiteSpaceHeight} />

        <Team />
        <WhiteSpace height={whiteSpaceHeight} />

        <GetStarted />
        <WhiteSpace height={whiteSpaceHeight} />

      </Suspense>
    </main>
  );
};

export default AboutPage;
