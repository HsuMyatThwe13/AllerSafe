import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-emerald-700">AllerSafe</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Your trusted meal safety guardian. Making dining safer for everyone with allergies and dietary restrictions.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-emerald-100 transition-colors">
                <Facebook className="w-4 h-4 text-gray-600" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-emerald-100 transition-colors">
                <Twitter className="w-4 h-4 text-gray-600" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-emerald-100 transition-colors">
                <Instagram className="w-4 h-4 text-gray-600" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-emerald-100 transition-colors">
                <Linkedin className="w-4 h-4 text-gray-600" />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-emerald-700 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Allergen Database
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Safety Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Meal Planning Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Emergency Response
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Community Forum
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-emerald-700 mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Partner With Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-emerald-700 mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-600">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:support@allersafe.com" className="hover:text-emerald-600 transition-colors">
                  support@allersafe.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-emerald-600 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  123 Health Street<br />
                  San Francisco, CA 94102
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 text-center md:text-left">
              © {currentYear} AllerSafe. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Accessibility
              </a>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            AllerSafe is a meal safety information platform. Always consult with healthcare professionals for medical advice regarding allergies and dietary restrictions.
          </p>
        </div>
      </div>
    </footer>
  );
}
