import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0033A0] text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold mb-4">GW Connect</h3>
            <p className="text-gray-300">Connecting students, faculty, and alumni for a stronger academic community.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-300 hover:text-white">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/study-materials" className="text-gray-300 hover:text-white">
                  Study Materials
                </Link>
              </li>
              <li>
                <Link href="/study-groups" className="text-gray-300 hover:text-white">
                  Study Groups
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <Facebook />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Twitter />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Instagram />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Linkedin />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Student Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
