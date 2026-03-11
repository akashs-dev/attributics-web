import { logoCloud } from '../../constants/home';
import Block from "../../components/layout/Block/Block";

const renderLogoRow = (row) =>
  row.map((logo, index) => {
      return (
          <div
              key={`logo-${index}`}
              className="flex items-center lg:mx-14 mx-8"
          >
              <img src={logo} alt='' className="h-10 w-auto" />
          </div>
      );
});

const LogoMarqueeRow = (row) => (
  <div className="flex overflow-hidden">
      <div className="flex w-max items-center shrink-0 animate-marquee">
          {renderLogoRow(row)}
          {renderLogoRow(row)}
      </div>
  </div>
);

const LogoCloud = () => {
    return (
        <>
            <Block xpad="small">
                <div className="w-full py-8 flex flex-col items-center gap-6 overflow-hidden">
                    <p className="section-eyebrow">
                        {logoCloud.eyebrow}
                    </p>

                    <div className="w-full overflow-hidden mask-fade-x" style={{ '--fade': '20px', backgroundColor: '' }}
                    >
                        {LogoMarqueeRow(logoCloud.clients)}
                    </div>
                </div>
            </Block>
        </>
    )
};

export default LogoCloud;