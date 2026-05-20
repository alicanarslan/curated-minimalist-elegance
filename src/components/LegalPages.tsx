import React, { useState } from "react";
import { Mail, Shield, Info, ArrowLeft, Send } from "lucide-react";

interface LegalPagesProps {
  initialSection: "about" | "contact" | "privacy";
  onBack: () => void;
  isDarkMode: boolean;
}

export const LegalPages: React.FC<LegalPagesProps> = ({
  initialSection,
  onBack,
  isDarkMode
}) => {
  const [section, setSection] = useState<"about" | "contact" | "privacy">(initialSection);
  const [emailSent, setEmailSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real serverless app, this would post to an API endpoint.
    // For now, simulate a successful message send.
    setEmailSent(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setEmailSent(false);
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 font-sans text-xs tracking-wider text-current hover:text-gold-leaf uppercase font-semibold mb-8 group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Curation
      </button>

      {/* Tab Switcher */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-800 mb-10 overflow-x-auto">
        <button
          onClick={() => setSection("about")}
          className={`flex items-center gap-2 pb-4 px-4 text-xs uppercase tracking-widest font-bold border-b-2 transition-all whitespace-nowrap ${
            section === "about"
              ? "border-gold-leaf text-gold-leaf"
              : "border-transparent opacity-60 hover:opacity-100"
          }`}
        >
          <Info className="w-4 h-4" /> About Us
        </button>
        <button
          onClick={() => setSection("contact")}
          className={`flex items-center gap-2 pb-4 px-4 text-xs uppercase tracking-widest font-bold border-b-2 transition-all whitespace-nowrap ${
            section === "contact"
              ? "border-gold-leaf text-gold-leaf"
              : "border-transparent opacity-60 hover:opacity-100"
          }`}
        >
          <Mail className="w-4 h-4" /> Contact Us
        </button>
        <button
          onClick={() => setSection("privacy")}
          className={`flex items-center gap-2 pb-4 px-4 text-xs uppercase tracking-widest font-bold border-b-2 transition-all whitespace-nowrap ${
            section === "privacy"
              ? "border-gold-leaf text-gold-leaf"
              : "border-transparent opacity-60 hover:opacity-100"
          }`}
        >
          <Shield className="w-4 h-4" /> Privacy Policy
        </button>
      </div>

      {/* About Us Page */}
      {section === "about" && (
        <article className="prose dark:prose-invert max-w-none">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-6">About CURATED</h1>
          <div className="font-sans text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed space-y-6">
            <p>
              Welcome to <strong>CURATED</strong>, a dedicated design discovery platform created for interior design enthusiasts, minimalist lovers, and home decorator curators. Our mission is simple: to bridge the gap between visual inspiration and physical reality.
            </p>
            <p>
              We know how frustrating it can be to scroll through Pinterest, save beautiful boards of living rooms, warm lighting concepts, or modern home offices, only to have no idea where to purchase those items. <strong>CURATED</strong> is built to solve that friction. We scan, verify, and select high-quality products available on Amazon that perfectly match the clean, organic, and minimalist Pinterest aesthetic.
            </p>
            <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white mt-8">Our Standards</h3>
            <p>
              Every product featured on our boards undergoes a rigorous review process. We look for clean geometric lines, premium sustainable materials (like solid white oak, linen, and brushed brass), high user satisfaction scores, and reliable seller logistics. We prioritize products that carry "Prime Verified" stamps to ensure quick and dependable delivery right to your door.
            </p>
            <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white mt-8">Affiliate Disclosure Transparency</h3>
            <p>
              CURATED is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. We believe in total transparency: all product links on our platform are cloaked internal links that redirect to official Amazon listings containing our affiliate tags. This comes at absolutely no extra cost to you, but it helps us maintain this platform and keep bringing you design inspiration daily.
            </p>
          </div>
        </article>
      )}

      {/* Contact Us Page */}
      {section === "contact" && (
        <article className="max-w-xl">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-6">Contact Us</h1>
          <p className="font-sans text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed mb-8">
            Have questions about a featured product, design collaboration, or technical feedback? Feel free to reach out to us. We try to respond to all inquiries within 24–48 hours.
          </p>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-neutral-500/5 border border-neutral-500/10 mb-8">
            <div className="w-10 h-10 rounded-full bg-gold-leaf/10 flex items-center justify-center text-gold-leaf">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] text-neutral-450 uppercase tracking-widest font-bold">Email Address</span>
              <a href="mailto:alicanarslan.dev@gmail.com" className="font-mono text-sm text-gold-leaf hover:underline">
                alicanarslan.dev@gmail.com
              </a>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-2">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full font-sans text-sm px-4 py-3 rounded-lg border focus:outline-none transition-colors ${
                  isDarkMode
                    ? "bg-[#181a19] border-neutral-800 focus:border-neutral-700 text-white"
                    : "bg-white border-neutral-200 focus:border-neutral-350 text-neutral-900"
                }`}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-2">Your Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full font-sans text-sm px-4 py-3 rounded-lg border focus:outline-none transition-colors ${
                  isDarkMode
                    ? "bg-[#181a19] border-neutral-800 focus:border-neutral-700 text-white"
                    : "bg-white border-neutral-200 focus:border-neutral-350 text-neutral-900"
                }`}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full font-sans text-sm px-4 py-3 rounded-lg border focus:outline-none transition-colors resize-none ${
                  isDarkMode
                    ? "bg-[#181a19] border-neutral-800 focus:border-neutral-700 text-white"
                    : "bg-white border-neutral-200 focus:border-neutral-350 text-neutral-900"
                }`}
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-200 dark:hover:bg-neutral-300 dark:text-neutral-900 text-white font-sans text-[10px] font-bold tracking-widest py-3 rounded uppercase flex items-center justify-center gap-1.5 transition-colors"
            >
              {emailSent ? "Message Sent Successfully!" : <>Send Message <Send className="w-3.5 h-3.5" /></>}
            </button>
          </form>
        </article>
      )}

      {/* Privacy Policy Page */}
      {section === "privacy" && (
        <article className="prose dark:prose-invert max-w-none">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
          <div className="font-sans text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed space-y-6">
            <p><strong>Last Updated: May 20, 2026</strong></p>
            <p>
              At CURATED, accessible from our domain name, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by CURATED and how we use it.
            </p>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:alicanarslan.dev@gmail.com" className="text-gold-leaf font-bold hover:underline">alicanarslan.dev@gmail.com</a>.
            </p>

            <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white mt-8">Log Files</h3>
            <p>
              CURATED follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
            </p>

            <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white mt-8">Cookies and Web Beacons</h3>
            <p>
              Like any other website, CURATED uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>

            <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white mt-8">Amazon Associates & Third-Party Cookies</h3>
            <p>
              We work in partnership with the Amazon Services LLC Associates Program. When you click on buttons marked "Check Price on Amazon" or similar links, you will be redirected to Amazon.com. During this process, Amazon may place cookies on your browser to trace purchases back to our website, allowing us to earn qualifying commissions. You should consult the respective Privacy Policies of these third-party ad servers (Amazon.com) for more detailed information on their practices.
            </p>

            <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white mt-8">CCPA & GDPR Privacy Rights</h3>
            <p>
              We respect your data privacy rights. Visitors have the right to request access to their collected data, request erasure, or object to processing. Because CURATED is a static catalog application that does not run user account databases, we do not store, sell, or process personal identifying records of visitors except for standard diagnostic web logs described above.
            </p>

            <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white mt-8">Consent</h3>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms and conditions.
            </p>
          </div>
        </article>
      )}
    </div>
  );
};
