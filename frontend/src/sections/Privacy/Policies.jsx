import Block from "../../components/layout/Block";

const sections = [
    {
      number: "01",
      title: "What Information We Collect",
      content: "When you interact with us or request a project audit, we may collect the following information:",
      list: [
        "Name and job title",
        "Contact information, including email address and phone number",
        "Company name and project details (e.g., current MarTech stack, CRO goals)",
        "Other information relevant to customer surveys, offers, or service inquiries",
      ],
    },
    {
      number: "02",
      title: "What We Do Not Collect",
      content:
        "We focus on digital strategy and data solutions, not financial processing. Therefore, we do not collect sensitive financial data such as credit card details or bank account passwords through our website.",
    },
    {
      number: "03",
      title: "How We Collect Information",
      content:
        "We may collect information about you whenever you interact with us. For example, when you fill out a lead form, request a MarTech audit, register for our insights/newsletters, or contact us directly, you specifically and knowingly provide us with your personal information. We may also receive information about you from third-party platforms (like LinkedIn), provided you have given them permission to share your data.",
    },
    {
      number: "04",
      title: "How We Use the Information We Gather",
      content: "We require this information to understand your business needs and provide you with high-quality consulting and execution services. Specifically, we use it for:",
      list: [
        "Internal record keeping: Managing client relationships and project scopes.",
        "Service Improvement: Enhancing our analytics, Agentic AI, and CEP offerings based on market needs.",
        "Communication: Periodically sending promotional emails about new digital strategies, thought leadership, or services that may benefit your business.",
        "Customization: Tailoring our website and service proposals to your specific interests.",
      ],
    },
    {
      number: "05",
      title: "Disclosure and Confidentiality",
      content:
        "Attributics does not sell, lease, or distribute your personal information to third parties unless we have your explicit permission or are required by law to do so. We may disclose Personal Information to law enforcement agencies, government bodies, or courts in India where legally mandated. Our website may contain links to external partner platforms or technology vendors. We are not responsible for the privacy of data collected by websites not owned or managed by Attributics. You should exercise caution and look at the privacy statements applicable to those specific websites.",
    },
    {
      number: "06",
      title: "Security",
      content:
        "We are committed to ensuring that your data is secure. To prevent unauthorized access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.",
    },
    {
      number: "07",
      title: "How We Use Cookies",
      content:
        "A cookie is a small file placed on your computer's hard drive that helps analyze web traffic. We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website to tailor it to customer needs. A cookie in no way gives us access to your computer or any personal information, other than the data you choose to share with us. You can choose to accept or decline cookies through your browser settings.",
    },
    {
      number: "08",
      title: "Making a Complaint & Grievance Redressal",
      content:
        "In accordance with Indian law, if you have any concerns or discrepancies regarding the processing of your personal data, you may contact our Grievance Officer. We will review your complaint, investigate the matter, and respond to you appropriately. We aim to complete this investigation within 15 working days of receiving your complaint.",
      contact: true,
    },
    {
      number: "09",
      title: "Access and Correction",
      content: (
        <>
          You have the right to request details of the personal information we hold about you, or to request the deletion or correction of your data at any time. To do so, please email us at{" "}
          <a href="mailto:hello@attributics.com" className="text-[#FF5A36] hover:underline">
            hello@attributics.com
          </a>
          .
        </>
      ),
    },
  ];
  
  const Policies = () => {
    return (
        <Block xpad="larger" topMargin="large">
            <div className="min-h-screen">
        
                {/* Header */}
                <div className="mb-4 pb-0 border-b border-slate-200">
                    <h1 className="section-title text-4xl md:text-5xl font-display !font-bold text-slate-900 mb-2">
                        Privacy Policy For Attributics
                    </h1>
                </div>
        
                {/* Intro */}
                <p className="section-description text-slate-600 leading-relaxed mb-16 text-base">
                    At <span className="font-semibold text-slate-900">Attributics</span> (www.attributics.com), we are committed to ensuring that your privacy is protected. This Privacy Policy outlines how we collect, use, disclose, and safeguard your Personal Information when you visit our website or engage with our MarTech, data engineering, and digital strategy services.
                    <br />
                    <br />
                    This policy is governed by the laws of India, including the Information Technology Act, 2000, and the Digital Personal Data Protection (DPDP) Act, 2023.
                    <br />
                </p>
        
                {/* Sections */}
                <div className="space-y-12">
                    {sections.map((section) => (
                    <div key={section.number} className="flex gap-8 group">
                        {/* Number */}
                        <div className="shrink-0 w-10 text-right">
                            <span className="section-eyebrow text-xs font-bold text-slate-300 tracking-widest">
                                {section.number}
                            </span>
                        </div>
        
                        {/* Divider */}
                        <div className="shrink-0 bg-slate-200 group-first:bg-[#FF5A36]" />
        
                        {/* Content */}
                        <div className="pb-12 flex-1">
                            <h2 className="section-title !text-lg font-bold text-slate-900 mb-3">
                                {section.title}
                            </h2>
                            <p className="section-description !text-slate-500 leading-relaxed text-sm mb-4">
                                {section.content}
                            </p>
                            {section.list && (
                                <ul className="space-y-2 mt-3">
                                {section.list.map((item, i) => (
                                    <li key={i} className="section-description flex items-start gap-3 !text-lg !text-slate-500">
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#FF5A36] shrink-0" />
                                        {item}
                                    </li>
                                ))}
                                </ul>
                            )}
                            {section.contact && (
                                <div className="section-description mt-4 p-4 bg-white rounded-xl border border-slate-100 !text-lg space-y-1">
                                    <p>
                                        <span className="font-semibold text-slate-700">Email: </span>
                                        <a href="mailto:hello@attributics.com" className="!text-slate-500 hover:underline">
                                            hello@attributics.com
                                        </a>
                                    </p>
                                    <p>
                                        <span className="font-semibold text-slate-700">Address: </span>
                                        <a href="#google-map-address-link" className="!text-slate-500 hover:underline">
                                            Pune, Maharashtra, India
                                        </a>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </Block>
    );
  };
  
  export default Policies;