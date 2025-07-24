import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 text-center py-4 mt-10">
      © {new Date().getFullYear()} Product Management. All rights reserved.
    </footer>
  );
}

export default Footer;
