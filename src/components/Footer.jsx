import React from 'react';
import instagramQr from '../assets/APCInstagramQr.png';
import facebookQr from '../assets/APCFacebookQr.png';
import alibabaQr from '../assets/APCAlibabaQr.png';
import linkedinQr from '../assets/APCLinkedinQr.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer
      className="footer-section bg-[#514748]"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="footer-content">
        <div className="map">
          <iframe
            src="https://maps.google.com/maps?q=The%20Glitter%20Exports,%20Mangolpuri,%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/terms">Quality Control/Checks</a></li>
            <li><a href="/privacy">Terms of Service</a></li>
            <li><a href="/faqs#mode-of-payment">Privacy Policy</a></li>
            <li><a href="/faqs#mode-of-payment">Mode of Payment</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3 className='text-center'>Contact Us</h3>
          <div className="footer-qr-row">
            <div className="footer-qr-block">
              <a href="https://www.facebook.com/AkkiFashionista" target="_blank" rel="noopener noreferrer">
                <img src={facebookQr} alt="Facebook QR" />
              </a>
              <span>Facebook</span>
            </div>

            <div className="footer-qr-block">
              <a href="https://www.instagram.com/apcc.2018?igsh=bDBsYzI3aHE0Nnh6" target="_blank" rel="noopener noreferrer">
                <img src={instagramQr} alt="Instagram QR" />
              </a>
              <span>Instagram</span>
            </div>

            <div className="footer-qr-block">
              <a href="https://www.linkedin.com/company/ap-curated-couture/" target="_blank" rel="noopener noreferrer">
                <img src={linkedinQr} alt="LinkedIn QR" />
              </a>
              <span>LinkedIn</span>
            </div>

            <div className="footer-qr-block">
              <a href="https://apcuratedcouture.trustpass.alibaba.com/" target="_blank" rel="noopener noreferrer">
                <img src={alibabaQr} alt="Alibaba QR" />
              </a>
              <span>Alibaba</span>
            </div>
          </div>
        </div>
      </div>
      {/* Welcome Message Section */}
      <div className="w-full bg-[#514748] py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#514747] mb-4 font-[Inter]">
            Welcome to The Glitter Export – Your Global Source for Beaded Elegance!
          </h2>
          <p className="text-lg md:text-xl text-[#ffffff] mb-4 leading-relaxed">

            We are a fast-growing fashion apparel export brand specializing in handcrafted sequin and beaded creations. From stylish T-shirts and sweatshirts to statement women’s apparel and seasonal must-haves, every piece is thoughtfully designed with creativity and crafted with precision.

          </p>
          <div className="text-2xl font-semibold text-[#ffffff] font-['Dancing_Script',cursive]">
            ✨ Wholesale Only | Made to Impress | Crafted to Last
          </div>
        </div>
      </div>
      <div className="footer-bottom">&copy; {new Date().getFullYear()} APC. All rights reserved.</div>
    </footer>

  );
};

export default Footer;