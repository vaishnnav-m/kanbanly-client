"use client";
import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Documentation', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ];

  const socialIcons = [
    { icon: <Facebook className="h-6 w-6" />, href: '#', name: 'Facebook' },
    { icon: <Twitter className="h-6 w-6" />, href: '#', name: 'Twitter' },
    { icon: <Linkedin className="h-6 w-6" />, href: '#', name: 'LinkedIn' },
    { icon: <Instagram className="h-6 w-6" />, href: '#', name: 'Instagram' },
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-slate-100 dark:bg-slate-800 text-foreground/70 py-12"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-2">Kanbanly</h3>
            <p className="text-sm">Streamlining teamwork and project management.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground/90 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-primary transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground/90 mb-3">Connect With Us</h4>
            <div className="flex space-x-4">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm">
          <p>&copy; {currentYear} Kanbanly. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
