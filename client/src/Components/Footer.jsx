import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-8 ">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Navigation Links */}
                    <div>
                        <h4 className="font-bold mb-2">About Us</h4>
                        <ul>
                            <li><Link to="/about" className="hover:underline">Our Story</Link></li>
                            <li><Link to="/careers" className="hover:underline">Careers</Link></li>
                            <li><Link to="/blog" className="hover:underline">Blog</Link></li>
                            <li><Link to="/help" className="hover:underline">Help Center</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="font-bold mb-2">Support</h4>
                        <ul>
                            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
                            <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
                            <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h4 className="font-bold mb-2">Follow Us</h4>
                        <ul className="flex space-x-4">
                            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a></li>
                            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a></li>
                            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a></li>
                            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h4 className="font-bold mb-2">Contact</h4>
                        <p>Email: <a href="mailto:support@airbnbclone.com" className="hover:underline">support@airbnbclone.com</a></p>
                        <p>Phone: <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a></p>
                    </div>
                </div>
            </div>
            <div className="text-center mt-8">
                <p className="text-sm">&copy; {new Date().getFullYear()} Airbnb. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;