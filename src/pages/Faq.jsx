import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const faqs = [
  {
    section: 'Company Overview',
    qas: [
      {
        question: 'Who are we?',
        answer: 'We are an Indian manufacturer based in Delhi, established in 2018, proudly exporting to over 30+ countries. With over 7+ years of export experience, our workshop is home to 50–80 skilled team members, including artisans, craftsmen, tailors, designers, accountant.'
      },
      {
        question: 'What are your advantages? Why should we buy from you?',
        answer: `<b>Our Advantages:</b><ul><li>Fully licensed and registered.</li><li>Transparent dealings with clients.</li><li>Free design services (no extra cost).</li><li>Weekly launch of new designs.</li></ul><b>Why buy from us:</b><ul><li>Trendy and competitively priced products.</li><li>One of the trusted manufacturers in the industry.</li><li>Use of guaranteed materials that meet international standards.</li><li>Fast and reliable product distribution network.</li><li>Safety-tested products suitable for all ages, with ethical production (no child labor, quality audits, and fair working conditions).</li></ul>`
      },
      {
        question: 'Are you a manufacturer or trader?',
        answer: 'We manufacture a wide range of fashion apparel, including T-shirts, sweatshirts, skort sets, dresses, denim wear, Jeans, pajama, shorts, crop top, shirts, beaded swimwear, two-piece short sets, abayas, kaftans, and more. Explore our collection to view more.'
      },
    ]
  },
  {
    section: 'Products & Collections',
    qas: [
      {
        question: 'What products and services do you offer?',
        answer: 'We offer a wide range of handcrafted fashion apparel, including sequin and beaded embroidery T-shirts, sweatshirts, skort sets, beaded swimwear, two-piece short sets, abayas, kaftans, dresses, jeans, pajamas, denim jackets & shorts, and crop tops. Explore more from our collection.<br/><br/>As a customer-centric company, we provide customized services tailored to meet our clients’ requirements.<br/><b>General Services:</b><ol><li>Pattern Development and Grading</li><li>Prototype/Sample Development</li><li>Fabric Printing (screen, digital, etc.)</li><li>Fine Embroidery concepts for clothing range</li><li>Special finishes on fabrics</li><li>Customized Tags, Labels, colors, fabrics, sizes etc.</li><li>Shipping of the goods to your door step (Air or sea as per client requirement)</li></ol>'
      },
      {
        question: 'Are your products handmade?',
        answer: 'Yes, all our products are 100% handcrafted by skilled artisans with an emphasis on premium finishes and quality.'
      },
      {
        question: 'How do you guarantee your product quality?',
        answer: 'We always provide a pre-production sample before mass production. First, we share <b>digital mockups</b>, followed by a <b>physical sample</b> for your approval before production begins. We also carry out a final inspection before shipment as per client requirements. Upon request, we share a <b>video of every final piece</b> before shipping.'
      },
    ]
  },
  {
    section: 'Pricing & Wholesale Info',
    qas: [
      {
        question: 'Do you offer wholesale pricing?',
        answer: 'Yes, we offer competitive wholesale pricing for bulk buyers, boutiques, gifting partners, and retailers. Discounts vary based on quantity and product type.'
      },
      {
        question: 'What are your MOQs (Minimum Order Quantities)? Can I get a sample before placing an order?',
        answer: "Our Minimum Order Quantities (MOQs) vary depending on the product type, design complexity, and customization requirements. Yes, we do provide samples. Once you've selected the products you're interested in, our sales representative will assist you with the sample request process. For detailed information, please contact us with your specific needs. WhatsApp: +917303083972, theglitterexports@gmail.com."
      },
    ]
  },
  {
    section: 'Ordering & Payment',
    qas: [
      {
        question: 'How can I place an order?',
        answer: 'Here is the step-by-step order process:<br/>➡ Custom Design Inquiry<br/>➡ Chat With Us<br/>➡ Explore Our Products<br/>➡ Place an Order<br/>➡ Deposit Token Amount<br/>➡ First Sample approval<br/>➡ Production<br/>➡ Pay the Balance<br/>➡ Dispatching of Goods'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept: Bank Transfer (India), PayPal, Payoneer, Western union, Money gram, Telegraphic Transfer T/T.'
      },
      {
        question: 'Is there advance payment?',
        answer: '<b>For Bulk orders:</b><br/>T/T (Telegraphic Transfer) PAYMENT: With new customers we prefer 50% advance and 50% at time of Dispatch.<br/><b>L/C (Letter of Credit):</b> For bigger quantity orders, we do accept LC issued by recognized bank on mutually agreed terms.<br/><b>For Sample Payment:</b> TT Payment only - We charge for sample development charges from new customer, Once the bulk order for the same is finalized, we adjust back the sampling charges paid by customer in the final bulk invoice as per agreed terms. Once the Customer do regular business with our company, we don\'t charge for proto samples development from them.'
      },
    ]
  },
  {
    section: 'Shipping & Delivery',
    qas: [
      {
        question: 'How long will my order take to arrive?',
        answer: 'Shipping typically takes 3-4 <b>business days</b> after dispatch. For <b>bulk orders</b>, the timeline may vary depending on the order size and customization requirements. In most cases, orders are delivered <b>within 7 days from the date of confirmation</b>. If ordered in bulk it may exceed given time frame, for that we will share the estimated delivery date at the time of order placement.'
      },
      {
        question: 'How much does shipping cost?',
        answer: 'Shipping charges depend on order weight, size, and delivery location. Bulk buyers may receive discounted rates.'
      },
      {
        question: 'How do I receive an order confirmation or a tracking number?',
        answer: "Once your order is placed and payment is confirmed, you'll receive an order confirmation via WhatsApp or email. Tracking details are shared as soon as the shipment is dispatched."
      },
    ]
  },
  {
    section: 'Customization & Design',
    qas: [
      {
        question: 'Can you provide customized/ OEM service? What are the steps for it?',
        answer: 'Yes, we are the OEM manufacturers. we provide custom fabric, labels, designs. For further details please contact us.'
      },
      {
        question: 'What is the process for customization?',
        answer: "1. Share your ideas, reference image, or theme with us via Alibaba, WhatsApp or Instagram.<br/>2. We'll suggest options and confirm feasibility, pricing, and timeline<br/>3. Once finalized, production begins and updates will be shared during the process."
      },
      {
        question: 'Do you provide samples to customers? If yes, what are the terms for it?',
        answer: "Yes, we provide samples to our customers. Terms we used for providing the samples to customers are:<ol><li>Sometimes samples help us to set a budget as per customers' requirements.</li><li>We can turn our samples into business.</li><li>Customers provide feedback, which helps us to improve our quality and designing which ultimately ease our business and build trust among customers.</li></ol>"
      },
    ]
  },
  {
    section: 'Customer Support & Returns',
    qas: [
      {
        question: 'How can I contact customer support?',
        answer: 'You can reach us through:<ul><li>WhatsApp: +917303083972</li><li>Mail: theglitterexports@gmail.com</li><li>Instagram: <a href="https://instagram.com/theglitter_exports" target="_blank">@theglitter_exports</a></li><li>Alibaba: <a href="https://theglitterexports.trustpass.alibaba.com" target="_blank">theglitterexports.trustpass.alibaba.com</a></li></ul>Our team typically responds within 24 hours.'
      },
      {
        question: 'Do you offer returns or exchanges?',
        answer: 'As most items are made to order or customized, we do not accept returns. However, in case of a manufacturing defect, we offer replacements or credit. Please report issues within 7 days of delivery.'
      },
    ]
  },
  {
    section: 'Extra Questions',
    qas: [
      {
        question: 'Do you offer private labelling?',
        answer: 'Yes, we do. We are one of the top private label clothing manufacturers in India and provide all kinds of clothing manufacturing services as per the requirements of our customer. We can offer customized styles, sizes, colors, fabrics, embroideries, packaging materials etc. From garments to custom tags and packaging, get everything you need made under one roof with us. Our all-rounded professional approach means we take care of the entire supply chain, so that you can save time, money and effort and channel them into back into your business.'
      },
      {
        question: 'What type of garments do you manufacture?',
        answer: 'Being a specialize all in one Indian apparel manufacturer, we manufacture almost all kinds of woven and knitted (hosiery) garments for Women, Mens and kids. We are proud to be one of the best clothes manufacturers in India with a dedicated division on producing ladies clothes like tops, dresses, skirts, shorts, blouses etc. As a company, we are continuously investing in new technologies and methods to stay relevant in a constantly changing world.'
      },
      {
        question: 'Can you do customized fabrics and prints?',
        answer: 'Yes, we can offer customized fabrics and customized printing services also. We do all kinds of Fabric printing like Digital prints, direct to fabric prints, sublimation prints, flat bed prints, rottary prints, hand block prints, hand painted prints, marble prints etc. Just discuss your exact requirement with us and we will come up with printing solution for the same.'
      },
      {
        question: 'What is your production capacity?',
        answer: 'Each design output is different depending upon detailing in particular style. Basic styles output are much higher then work intensive styles (styles with hand embroidery, specialize processes etc). On average our current production capacity is 50,000 pcs per month.'
      },
      {
        question: 'What are your Production Prices?',
        answer: 'Being a "Made to Order" apparels manufacturer, our production prices depends upon many factors. To quote you proper competitive production price we need to know your design details, Product specification, Fabric to be used and total quantity. Once we have all this information we will quote you production prices for the same.'
      },
      {
        question: 'Can I visit your factory?',
        answer: 'You are always welcome! You can call us at (+917303083972) or Email us theglitterexports@gmail.com and schedule a meeting ensuring that our concern persons are available to attend you and we can have a productive meeting at our facility. We also request you to share few details about your requirement in advance so that we can study the same and discuss the same in detail with you during our meeting.'
      },
    ]
  },
];
const Faq = () => {
  const [openKey, setOpenKey] = useState(null); // Track the currently open question

  const toggleAnswer = (key) => {
    setOpenKey((prev) => (prev === key ? null : key)); // toggle open/close
  };

  return (
    <div className='mt-24 px-4 lg:px-20 max-w-6xl mx-auto'>
      <h1 className='text-5xl md:text-6xl font-bold font-[Inter] text-[#514747] text-center mb-12'>
        Frequently <span className="font-['Dancing_Script',cursive]">Asked Questions</span>
      </h1>

      {faqs.map((section, sectionIdx) => (
        <div key={sectionIdx} className="mb-10">
          <p className='text-2xl md:text-3xl font-semibold font-["Dancing_Script",cursive] text-[#514747] border-b-2 border-gray-200 pb-3 mb-6'>
            {section.section}
          </p>

          {section.qas.map((faq, qIdx) => {
            const key = `${sectionIdx}-${qIdx}`;
            const isOpen = openKey === key;

            return (
              <div
                key={qIdx}
                className="mb-4 border-b border-gray-200 pb-4"
              >
                <h3
                  onClick={() => toggleAnswer(key)}
                  className="font-[Inter] text-[#514747] text-lg md:text-xl font-semibold cursor-pointer flex justify-between items-center py-3 hover:text-[#6B5B5B] transition-colors duration-200"
                >
                  {faq.question}
                  <span className="text-2xl font-bold ml-4 flex-shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        className="mt-3 text-[#5c7f4c] font-[Inter] text-base md:text-lg leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Faq;