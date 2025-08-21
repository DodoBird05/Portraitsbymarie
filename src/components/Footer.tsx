import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hello@photography.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Your City, State</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>Portrait Photography</li>
              <li>Event Photography</li>
              <li>Commercial Photography</li>
              <li>Photo Editing</li>
            </ul>
          </div>

          {/* Copyright */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Photography Studio</h3>
            <p className="text-sm text-gray-300">
              Capturing life&apos;s precious moments with artistic vision and professional quality.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Photography Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}