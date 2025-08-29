import React from 'react';
import './TermsAndConditions.css';
import logo from "../Icons/logo/opport-logo-small.png"
const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <div className="terms-card">
        <img src={logo}  width={220}/>
        <h1 className="terms-title">Terms and Conditions</h1>
        <p className="last-updated">Last updated: [8/26/2025]</p>

        <div className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using our Service, you agree to be bound by these T&C, our Privacy Policy, and any other applicable terms provided by us. If you do not agree to these terms, you must not use the Service.
          </p>
        </div>

        <div className="terms-section">
          <h2>2. User Eligibility</h2>
          <ul>
            <li>Be at least 18 years of age, or have the consent of a parent or guardian.</li>
            <li>Provide accurate, current, and complete information as required during registration.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>3. User Accounts and Profile Visibility</h2>
          <p>
            When you create an account with us, you will provide personal information, including your:
          </p>
          <ul>
            <li><strong>Email Address:</strong> Your email address will be visible to other users of the platform.</li>
            <li><strong>Username:</strong> Your username will be visible to other users.</li>
            <li><strong>Location:</strong> Your location (or approximate location) will be visible to other users.</li>
            <li><strong>Description:</strong> Any description or bio you provide will be visible to other users and organizations on the platform.</li>
          </ul>
          <p>By using the Service, you consent to the visibility of these details to other users and organizations within the platform.</p>
        </div>

        <div className="terms-section">
          <h2>4. Data Access by AI</h2>
          <p>
            By using our Service, you acknowledge and consent to the following:
          </p>
          <ul>
            <li>Our AI systems may access and process your email address for purposes related to providing the service, including but not limited to improving user experience, personalizing recommendations, or other AI-driven features.</li>
            <li>We may also use your email to communicate with you about your account, the Service, or other important matters.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>5. User Responsibilities</h2>
          <p>You agree to use our Service only for lawful purposes and in accordance with these T&C. You shall not:</p>
          <ul>
            <li>Post or share any content that is illegal, abusive, harmful, or violates the rights of others.</li>
            <li>Impersonate another person or provide false information.</li>
            <li>Access or interfere with other users' accounts or data without authorization.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>6. Privacy and Data Collection</h2>
          <p>We collect personal data from you to provide, improve, and personalize our Service. By using the Service, you consent to the collection and use of your data as described in our Privacy Policy.</p>
          <ul>
            <li><strong>Your email:</strong> Will be visible to other users and may be accessed by our AI systems.</li>
            <li><strong>User profile data:</strong> (e.g., username, location, description) will be visible to other organizations and users on the platform.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>7. Intellectual Property</h2>
          <ul>
            <li><strong>Ownership:</strong> All content, including text, images, and design, on the Service is owned by us or licensed to us and is protected by intellectual property laws.</li>
            <li><strong>License to Use:</strong> We grant you a non-exclusive, non-transferable license to use the Service for its intended purpose.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>8. Third-Party Services</h2>
          <p>Our Service may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the content or practices of these third-party sites and encourage you to review their terms and policies.</p>
        </div>

        <div className="terms-section">
          <h2>9. Limitation of Liability</h2>
          <ul>
            <li>We are not liable for any direct, indirect, incidental, or consequential damages arising from your use or inability to use the Service.</li>
            <li>The Service is provided "as is," without warranties of any kind, express or implied.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>10. Termination</h2>
          <p>We reserve the right to suspend or terminate your account and access to the Service at any time, without notice, for any reason, including but not limited to violation of these T&C.</p>
          <p>Upon termination, your right to use the Service will end, and you must stop using the Service immediately.</p>
        </div>

        <div className="terms-section">
          <h2>11. Changes to Terms and Conditions</h2>
          <p>We may update these T&C at any time. When we do, we will post the revised version on this page and update the "Last Updated" date. Your continued use of the Service after any changes constitutes your acceptance of the updated T&C.</p>
        </div>

        <div className="terms-section">
          <h2>12. Indemnity</h2>
          <p>You agree to indemnify and hold harmless [Your Project Name], its employees, partners, and affiliates from any claims, damages, or expenses arising from your use of the Service or violation of these T&C.</p>
        </div>

        <div className="terms-section">
          <h2>13. Governing Law</h2>
          <p>These T&C are governed by the laws of [Your Country/State]. Any disputes will be handled in the courts of [Your Location].</p>
        </div>

        <div className="terms-section">
          <h2>14. Contact Information</h2>
          <p>If you have any questions or concerns about these T&C, please contact us at:</p>
          <ul>
            <li>Email: [frvnkkwizigira@gmail.com]</li>
        
          </ul>
        </div>

        <div className="terms-section">
          <h2>15. Severability</h2>
          <p>If any provision of these T&C is found to be unenforceable or invalid, the remaining provisions will remain in full force and effect.</p>
        </div>

        <div className="terms-section">
          <h2>16. Force Majeure</h2>
          <p>We will not be liable for any failure or delay in performance due to causes beyond our reasonable control, such as natural disasters, wars, or technical failures.</p>
        </div>

        <div className="terms-section">
          <h2>Conclusion</h2>
          <p>By accessing or using the Service, you acknowledge that you have read, understood, and agree to these Terms and Conditions.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
