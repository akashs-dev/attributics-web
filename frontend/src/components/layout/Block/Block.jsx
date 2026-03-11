const xPaddingMap = {
  'none':    'px-0',
  'small':   'px-3 sm:px-5 md:px-8 lg:px-10 xl:px-14',
  'medium':  'px-3 sm:px-6 md:px-12 lg:px-25 xl:px-32',
  'large':   'px-3 sm:px-8 md:px-16 lg:px-50 xl:px-50',
  'larger':  'px-3 sm:px-10 md:px-20 lg:px-80 xl:px-96',
  'largest': 'px-3 sm:px-12 md:px-24 lg:px-120 xl:px-140',
};

const topMarginMap = {
  'none':  'mt-0',
  'small': 'mt-14 sm:mt-16 md:mt-20 lg:mt-25',
  'medium': 'mt-17 sm:mt-20 md:mt-26 lg:mt-35',
  'large': 'mt-20 sm:mt-24 md:mt-32 lg:mt-45',
};

const Block = ({
    children,
    minHeight = '',
    background,
    xpad = 'small',
    topMargin = 'none',
  }) => {
    return (
      <div
        style={{
            width: '100%',
            minHeight,
        }}
        className={`relative ${xPaddingMap[xpad]} ${topMarginMap[topMargin]} ${background}`}
      >
        {children}
      </div>
    );
  };
  
export default Block;