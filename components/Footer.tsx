import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-wedding-cream py-8 border-t border-gray-200">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-script text-3xl text-wedding-gold mb-2">Thank You</h2>
        <p className="text-gray-500 font-sans text-sm">We can't wait to see you there!</p>
        <div className="w-16 h-[1px] bg-wedding-gold mx-auto my-4"></div>
        <p className="text-gray-400 text-xs">Made with ❤️ for our special day</p>
      </div>
    </footer>
  );
};

export default Footer;
