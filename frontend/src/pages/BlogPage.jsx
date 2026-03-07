import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import GlobalLoader from '../components/ui/Loader/GlobalLoader';
import WhiteSpace from '../components/layout/WhiteSpace/WhiteSpace';

const Hero = lazy(() => import('../sections/Blog/Hero/Hero'));
const Preview = lazy(() => import('../sections/Blog/PreviewInput/PreviewInput'));

const reducedWhiteSpaceHeight = '10vh';
const moreWhiteSpaceHeight = '20vh';
const whiteSpaceHeight = '15vh';

const BlogPage = () => {
  const { slug } = useParams();
  const isPreview = slug === '_preview';

  return (
    <main style={{ overflow: 'hidden' }}>
      <Suspense fallback={<GlobalLoader />}>
        {isPreview ? <Preview /> : <Hero slug={slug} />}
      </Suspense>
      <WhiteSpace height={reducedWhiteSpaceHeight} />
    </main>
  );
};

export default BlogPage;