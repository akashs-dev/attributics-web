import { Link } from 'react-router-dom';
import { brand, footer } from '../../../constants/other';
import Block from '../Block';

const Footer = () => {
    return (
      <footer className="bg-[#0A0A0A] text-white pt-24 pb-12 border-t border-slate-900">
        <Block xpad='large'>
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 mb-20">
    
              {/* Left Column */}
              <div className="flex flex-col items-center md:items-start gap-8">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <Link to="/" className='flex flex-row'>
                        <img src={brand.logo} alt="Logo" className="w-auto h-8" />
                        <img src={brand.wordmark} alt={brand.name} className="w-auto h-8 invert" />
                    </Link>
                    <p className="section-eyebrow">
                      {brand.tagline}
                    </p>
                </div>
                {footer.socials.map((item, index) => {
                  return (
                    <a id={index} href={item.href} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                      <img src={item.logo} alt={item.name} className="w-6 h-6 grayscale-100 opacity-70" />
                      {/* <span className="text-md">{item.name}</span> */}
                    </a>
                  )
                })}
              </div>

              <div className='grid grid-cols-2 md:grid-cols-2 gap-12 md:gap-8'>
                {/* Middle Column */}
                <div className="flex flex-col items-center md:items-end">
                  <div>
                    <h4 className="text-slate-500 text-xs font-bold tracking-[0.2em] uppercase mb-8">
                      COMPANY
                    </h4>
                    <ul className="space-y-4 text-slate-400">
                      <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                      <li><a href="/services" className="hover:text-white transition-colors">Services</a></li>
                      <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                    </ul>
                  </div>
                </div>
      
                {/* Right Column */}
                <div className="flex flex-col items-center md:items-end">
                  <div>
                    <h4 className="text-slate-500 text-xs font-bold tracking-[0.2em] uppercase mb-8">
                      RESOURCES
                    </h4>
                    <ul className="space-y-4 text-slate-400 text-left">
                      <li><a href="/resources" className="hover:text-white transition-colors">Resources</a></li>
                      <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                      <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Bottom Bar */}
            <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-slate-500 text-sm">
                © 2026 {brand.name} All rights reserved.
              </p>
            </div>
          </div>
        </Block>
      </footer>
    );
  };
  
  export default Footer;