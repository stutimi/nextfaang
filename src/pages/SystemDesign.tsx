import React from 'react';

const SystemDesign: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">System Design Mastery</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Architecture Patterns</h2>
          <p className="mb-4">Learn scalable system design principles that power modern applications.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Microservices Architecture</li>
            <li>Event-Driven Design</li>
            <li>Serverless Computing</li>
            <li>Monolithic vs Distributed Systems</li>
            <li>API Gateway Patterns</li>
          </ul>
        </div>
        
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Technology Deep Dives</h2>
          <p className="mb-4">Explore essential technologies for building scalable systems.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Database Selection & Optimization</li>
            <li>Caching Strategies</li>
            <li>Load Balancing Techniques</li>
            <li>Microservices Communication</li>
            <li>Containerization & Orchestration</li>
          </ul>
        </div>
        
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Case Studies</h2>
          <p className="mb-4">Real-world system design examples from industry leaders.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Netflix's Microservices Architecture</li>
            <li>Uber's Geospatial Platform</li>
            <li>Instagram's Scaling Journey</li>
            <li>Stripe's Payment Processing System</li>
            <li>Airbnb's Search Infrastructure</li>
          </ul>
        </div>
        
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Interview Preparation</h2>
          <p className="mb-4">Comprehensive resources for system design interviews.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>System Design Interview Framework</li>
            <li>Requirement Analysis Techniques</li>
            <li>Capacity Estimation & Constraints</li>
            <li>High-Level Design Approaches</li>
            <li>Data Schema & API Design</li>
          </ul>
        </div>
        
        <div className="bg-card rounded-lg p-6 shadow-md col-span-1 md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Resource Library</h2>
          <p className="mb-4">Curated collection of system design learning materials.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-medium mb-2">Books</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>System Design Interview by Alex Xu</li>
                <li>Designing Data-Intensive Applications</li>
                <li>Building Microservices</li>
                <li>Clean Architecture by Robert C. Martin</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Online Resources</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>System Design Primer (GitHub)</li>
                <li>High Scalability Blog</li>
                <li>AWS Architecture Center</li>
                <li>Google Cloud Architecture Framework</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Course Information</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-card rounded-lg shadow-md">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left">Course</th>
                <th className="py-3 px-4 text-left">Level</th>
                <th className="py-3 px-4 text-left">Duration</th>
                <th className="py-3 px-4 text-left">Completion Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 font-medium">System Design Mastery</td>
                <td className="py-3 px-4">Advanced</td>
                <td className="py-3 px-4">3 months</td>
                <td className="py-3 px-4">89%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemDesign;