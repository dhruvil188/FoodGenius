import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function Privacy() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-16 px-4 max-w-7xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-none py-1.5 px-4">
            LEGAL
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Privacy <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We value your privacy and are committed to protecting your personal data.
          </p>
        </div>

        <motion.div 
          className="prose prose-slate max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Recipe Snap ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services (collectively, the "Service").
            </p>
            <p className="mb-4">
              Please read this Privacy Policy carefully. By using our Service, you consent to the practices described in this policy.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <p className="mb-4">
              We collect several types of information from and about users of our Service, including:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li><strong>Personal Data:</strong> Information that can be used to identify you, such as your name, email address, and account credentials.</li>
              <li><strong>Usage Data:</strong> Information about how you use our Service, including your browsing history, search queries, and interaction with features.</li>
              <li><strong>Device Data:</strong> Information about your device, such as IP address, browser type, operating system, and device identifiers.</li>
              <li><strong>User Content:</strong> Food images, recipe preferences, comments, and other content you submit to the Service.</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">3. How We Collect Information</h2>
            <p className="mb-4">
              We collect information through:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li><strong>Direct Interactions:</strong> Information you provide when creating an account, uploading content, or communicating with us.</li>
              <li><strong>Automated Technologies:</strong> Information collected automatically through cookies, web beacons, and similar technologies.</li>
              <li><strong>Third Parties:</strong> Information we may receive from third-party services you connect to our Service.</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">4. How We Use Your Information</h2>
            <p className="mb-4">
              We use your information for various purposes, including:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Providing, maintaining, and improving our Service</li>
              <li>Processing and fulfilling your requests</li>
              <li>Analyzing usage patterns to enhance user experience</li>
              <li>Training and improving our AI algorithms for recipe generation</li>
              <li>Communicating with you about updates, promotions, and news</li>
              <li>Detecting, preventing, and addressing technical issues and security risks</li>
              <li>Complying with legal obligations</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Information Sharing and Disclosure</h2>
            <p className="mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li><strong>Service Providers:</strong> Third parties that help us operate our Service, such as cloud storage, payment processing, and analytics providers.</li>
              <li><strong>Business Partners:</strong> Companies we partner with to offer integrated services or joint promotions.</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
            </ul>
            <p className="mb-4">
              We do not sell your personal data to third parties.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Your Data Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal data, including:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>The right to access your personal data</li>
              <li>The right to rectify inaccurate or incomplete data</li>
              <li>The right to erase your personal data</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, please contact us using the information provided in the "Contact Us" section.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some parts of our Service may not function properly.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
            <p className="mb-4">
              Our Service is not intended for children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will take steps to delete that information as quickly as possible.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            <p className="mb-4">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="font-medium text-primary">argonpatel835@gmail.com</p>
          </div>

          <div className="text-center text-slate-500 text-sm mt-12">
            Last updated: March 31, {currentYear}
          </div>
        </motion.div>
      </div>
    </div>
  );
}