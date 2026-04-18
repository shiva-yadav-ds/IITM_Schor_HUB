import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - IITM Scholar Hub</title>
        <meta name="description" content="Learn about IITM Scholar Hub, our mission, and the tools we provide to help IITM students succeed." />
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-8 text-iitm-dark dark:text-white">
            About IITM Scholar Hub
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-center mb-12">
              A comprehensive platform designed by students, for students, to enhance your academic journey at IIT Madras.
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-10">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p>
                IITM Scholar Hub was created with a simple goal: to provide IIT Madras students with all the tools they need to succeed in their academic journey in one convenient place.
                We understand the challenges of navigating through complex academic requirements, managing coursework, and preparing for the future.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-10">
              <h2 className="text-2xl font-semibold mb-4">Our Tools</h2>
              <p>We've developed a suite of tools to address common student needs:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Grade Calculator:</strong> Easily calculate and track your cumulative grade point average.</li>
                <li><strong>Quiz Platform:</strong> Practice with quizzes designed to help you prepare for exams and assessments.</li>
                <li><strong>Resume Generator:</strong> Create professional resumes tailored for academic and industry applications.</li>
                <li><strong>End Term Marks Predictor:</strong> Estimate your potential grades based on current performance.</li>
                <li><strong>AI Chat Assistant:</strong> Get quick answers to your questions about academics, campus resources, and more.</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-10">
              <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
              <p>
                IITM Scholar Hub is developed and maintained by a passionate team of IIT Madras students who understand firsthand the needs of our community.
                Our diverse team brings together expertise in web development, UX design, data science, and education.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
              <p>
                We're always looking to improve and expand our platform. If you have suggestions, feedback, or would like to contribute to the development of IITM Scholar Hub,
                we'd love to hear from you. Contact us at <a href="mailto:contact@iitmscholarhub.com" className="text-blue-600 dark:text-blue-400 hover:underline">contact@iitmscholarhub.com</a>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default About; 