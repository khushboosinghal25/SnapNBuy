import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                <span className="text-lg font-bold">ProductHub</span>
              </div>
              <p className="text-sm text-gray-500">
                Providing quality products since 2010. Your satisfaction is our priority.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                    Warranty
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Contact Us</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-500">123 Product Street</li>
                <li className="text-gray-500">Tech City, TC 12345</li>
                <li className="text-gray-500">info@producthub.com</li>
                <li className="text-gray-500">(123) 456-7890</li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} ProductHub. All rights reserved.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    )

}
export default Footer;