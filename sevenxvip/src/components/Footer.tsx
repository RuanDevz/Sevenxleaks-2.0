import { Link } from "react-router-dom";
import { Flame, Sparkles, Menu } from 'lucide-react';
const Footer = () => {

  
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-900 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
        <Link to="/" className="group flex items-center">
          <Flame className="w-8 h-8 text-red-500 group-hover:text-red-400 transition-all duration-300 transform group-hover:scale-110" />
          <div className="ml-2 text-2xl font-black bg-gradient-to-r from-red-500 via-red-400 pb-3 to-red-500 bg-clip-text text-transparent hover:from-red-400 hover:via-red-300 hover:to-red-400 transition duration-300">
            SEVENXLEAKS
          </div>
        </Link>
          <p className="text-gray-600">© {new Date().getFullYear()} SEVENXLEAKS. All rights reserved.</p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-gray-600">Contact: <a href="mailto:dmca@sevenxleaks.com" className="text-red-500 hover:text-red-600 hover:underline transition-colors">dmca@sevenxleaks.com</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;