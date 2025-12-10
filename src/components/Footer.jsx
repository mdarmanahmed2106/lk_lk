import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Heart, Globe, ShieldCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const FooterLink = ({ href, children }) => (
  <li>
    <a href={href} className="text-gray-400 hover:text-white transition-colors text-sm">
      {children}
    </a>
  </li>
);

const FooterColumn = ({ title, links }) => (
  <div>
    <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{title}</h3>
    <ul className="space-y-2">
      {links.map((link, idx) => (
        <FooterLink key={idx} href={link.href}>{link.label}</FooterLink>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-[#1C1C1C] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <ScrollReveal>
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
            
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <a href="/" className="text-2xl font-bold tracking-tight flex items-center gap-1 mb-4">
                <span className="text-white">Local</span>
                <span className="text-lk-teal">Konnect</span>
              </a>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
                The leading platform for home services. We connect you with verified professionals for all your home needs, ensuring quality and safety.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-lk-teal transition-colors text-white">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-lk-teal transition-colors text-white">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-lk-teal transition-colors text-white">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-lk-teal transition-colors text-white">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <FooterColumn 
              title="Company" 
              links={[
                { label: 'About Us', href: '#' },
                { label: 'Terms & Conditions', href: '#' },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Anti-discrimination Policy', href: '#' },
                { label: 'Impact', href: '#' },
                { label: 'Careers', href: '#' },
              ]} 
            />
            
            <FooterColumn 
              title="For Customers" 
              links={[
                { label: 'UC Reviews', href: '#' },
                { label: 'Categories', href: '#' },
                { label: 'Blog', href: '#' },
                { label: 'Contact Us', href: '#' },
                { label: 'Help Center', href: '#' },
              ]} 
            />

            <FooterColumn 
              title="For Partners" 
              links={[
                { label: 'Register as a Professional', href: '#' },
                { label: 'Partner Success Stories', href: '#' },
                { label: 'Partner Support', href: '#' },
                { label: 'Training Centers', href: '#' },
              ]} 
            />
          </div>
        </ScrollReveal>

        <hr className="border-gray-800 mb-8" />

        <ScrollReveal delay={0.2}>
          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <span>English (US)</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span>© 2025 Local Konnect Technologies.</span>
              <span className="hidden md:inline">Made with</span>
              <Heart size={12} className="fill-lk-mustard text-lk-mustard hidden md:inline" /> 
              <span className="hidden md:inline">for better living.</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                  <ShieldCheck size={16} className="text-lk-teal" />
                  <span>Verified Pros</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </footer>
  );
};

export default Footer;
