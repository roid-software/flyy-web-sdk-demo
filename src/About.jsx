import React from 'react';

function About() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Flyy Web SDK</h1>
        
        <section className="bg-white rounded-lg shadow-sm mb-6 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is Flyy?</h2>
          <p className="text-gray-600 leading-relaxed">
            Flyy is a comprehensive rewards and engagement platform that helps businesses 
            increase user retention and engagement through gamification, rewards, and 
            referral programs.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-sm mb-6 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Rewards System</strong> - Points, cashback, and gift cards</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Gamification</strong> - Spin the wheel, daily check-ins, tournaments</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Referral Programs</strong> - Invite and earn functionality</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Engagement Tools</strong> - Polls, surveys, and trivia</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Wallet Management</strong> - Track and redeem rewards</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Customizable UI</strong> - Theme colors and branding options</span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow-sm mb-6 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Integration</h2>
          <p className="text-gray-600 leading-relaxed">
            The Flyy Web SDK can be integrated into any web application with just a few 
            lines of code. It supports multiple attach modes including popup, drawer, 
            chatbox, and embedded modes to fit seamlessly into your application's UX.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Documentation</h2>
          <p className="text-gray-600 leading-relaxed">
            For detailed documentation and API reference, please visit our 
            developer portal or contact our support team.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;