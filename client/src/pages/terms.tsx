import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function Terms() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-16 px-4 max-w-7xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-none py-1.5 px-4">
            LEGAL
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Terms and <span className="bg-gradient-to-r from-emerald-600 to-primary bg-clip-text text-transparent">Conditions</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using Recipe Snap.
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
              Welcome to Recipe Snap ("we," "our," or "us"). These Terms and Conditions govern your use of the Recipe Snap website, mobile application, and services (collectively, the "Service").
            </p>
            <p className="mb-4">
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access the Service.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">2. User Accounts</h2>
            <p className="mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            <p className="mb-4">
              You are responsible for safeguarding the password you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Content and User Submissions</h2>
            <p className="mb-4">
              Our Service allows you to upload, submit, store, send, or receive content including food images, recipes, and comments. You retain ownership of any intellectual property rights that you hold in that content.
            </p>
            <p className="mb-4">
              When you upload, submit, store, send, or receive content to or through our Service, you give Recipe Snap a worldwide license to use, host, store, reproduce, modify, create derivative works, communicate, publish, publicly perform, publicly display, and distribute such content.
            </p>
            <p className="mb-4">
              You are solely responsible for the content you submit, including its legality, reliability, and appropriateness.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
            <p className="mb-4">
              The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Recipe Snap and its licensors.
            </p>
            <p className="mb-4">
              Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Recipe Snap.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall Recipe Snap, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Your access to or use of or inability to access or use the Service;</li>
              <li>Any conduct or content of any third party on the Service;</li>
              <li>Any content obtained from the Service; and</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Food Safety and Recipe Accuracy</h2>
            <p className="mb-4">
              While we strive to provide accurate and safe recipes through our AI-powered recipe generation, we cannot guarantee the complete accuracy or safety of all recipes generated. The generated recipes are for informational purposes only.
            </p>
            <p className="mb-4">
              Users are responsible for ensuring proper food handling, preparation, and cooking techniques. Recipe Snap is not responsible for any adverse reactions, health issues, or injuries that may result from following generated recipes.
            </p>
            <p className="mb-4">
              Always use your best judgment when preparing and consuming food, especially regarding food allergies, dietary restrictions, and cooking temperatures.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">7. AI-Generated Content Disclaimer</h2>
            <p className="mb-4">
              Recipe Snap uses artificial intelligence to analyze food images and generate recipe suggestions. The accuracy and quality of these suggestions may vary based on image quality, lighting conditions, and other factors.
            </p>
            <p className="mb-4">
              We do not guarantee that our AI will correctly identify all ingredients or provide suitable recipes in all cases. Our AI-generated content is provided "as is" without warranties of any kind.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
            </p>
            <p className="mb-4">
              Your continued use of the Service after any such changes constitutes your acceptance of the new Terms. Please review these Terms periodically for changes.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed and construed in accordance with the laws applicable in your jurisdiction, without regard to its conflict of law provisions.
            </p>
            <p className="mb-4">
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at:
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