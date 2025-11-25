// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiHeart, FiUsers, FiMapPin, FiShield, FiMail, FiPhone, FiClock } from 'react-icons/fi';
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

// const LandingPage = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [email, setEmail] = useState('');
//   const [submitted, setSubmitted] = useState(false);

//   const slides = [
//     {
//       title: "Share a Meal, Share a Smile",
//       subtitle: "Connecting surplus food with those in need",
//       image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//       cta: "Join Our Mission"
//     },
//     {
//       title: "Empowering Communities",
//       subtitle: "Through sustainable food distribution",
//       image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//       cta: "Become a Volunteer"
//     },
//     {
//       title: "Reducing Food Waste",
//       subtitle: "While fighting hunger in your neighborhood",
//       image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//       cta: "Partner With Us"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically connect to your backend
//     console.log('Submitted email:', email);
//     setSubmitted(true);
//     setTimeout(() => setSubmitted(false), 3000);
//     setEmail('');
//   };

//   return (
//     <div className="font-sans bg-gray-50 text-gray-800">
//       {/* Navigation */}
//       <nav className="fixed w-full z-50 bg-white shadow-md">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <FiHeart className="text-2xl text-red-500 mr-2" />
//               <span className="text-xl font-bold text-gray-800">Aahar Sathi</span>
//             </div>
            
//             {/* Desktop Navigation */}
//             <div className="hidden md:flex space-x-8">
//               <a href="#home" className="text-gray-800 hover:text-red-500 transition">Home</a>
//               <a href="#about" className="text-gray-800 hover:text-red-500 transition">About</a>
//               <a href="#how-it-works" className="text-gray-800 hover:text-red-500 transition">How It Works</a>
//               <a href="#testimonials" className="text-gray-800 hover:text-red-500 transition">Impact</a>
//               <a href="#contact" className="text-gray-800 hover:text-red-500 transition">Contact</a>
//             </div>
            
//             {/* Mobile menu button */}
//             <div className="md:hidden">
//               <button 
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 className="text-gray-800 focus:outline-none"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   {menuOpen ? (
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   ) : (
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                   )}
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div 
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               className="md:hidden bg-white shadow-lg overflow-hidden"
//             >
//               <div className="px-6 py-4 flex flex-col space-y-4">
//                 <a href="#home" className="text-gray-800 hover:text-red-500 transition">Home</a>
//                 <a href="#about" className="text-gray-800 hover:text-red-500 transition">About</a>
//                 <a href="#how-it-works" className="text-gray-800 hover:text-red-500 transition">How It Works</a>
//                 <a href="#testimonials" className="text-gray-800 hover:text-red-500 transition">Impact</a>
//                 <a href="#contact" className="text-gray-800 hover:text-red-500 transition">Contact</a>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>

//       {/* Hero Section */}
//       <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
//         <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentSlide}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.5 }}
//             className="absolute inset-0 bg-cover bg-center z-0"
//             style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
//           />
//         </AnimatePresence>
        
//         <div className="container mx-auto px-6 relative z-10">
//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="max-w-2xl text-center mx-auto"
//           >
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{slides[currentSlide].title}</h1>
//             <p className="text-xl text-white mb-8">{slides[currentSlide].subtitle}</p>
//             <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-full transition transform hover:scale-105 shadow-lg">
//               {slides[currentSlide].cta}
//             </button>
//           </motion.div>
//         </div>
        
//         <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
//             />
//           ))}
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-12 bg-gradient-to-r from-red-50 to-orange-50">
//         <div className="container mx-auto px-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//             <motion.div 
//               whileHover={{ scale: 1.05 }}
//               className="bg-white p-6 rounded-xl shadow-md"
//             >
//               <FiUsers className="text-4xl text-red-500 mx-auto mb-4" />
//               <h3 className="text-3xl font-bold text-gray-800 mb-2">1,250+</h3>
//               <p className="text-gray-600">Volunteers</p>
//             </motion.div>
            
//             <motion.div 
//               whileHover={{ scale: 1.05 }}
//               className="bg-white p-6 rounded-xl shadow-md"
//             >
//               <FiHeart className="text-4xl text-red-500 mx-auto mb-4" />
//               <h3 className="text-3xl font-bold text-gray-800 mb-2">5,000+</h3>
//               <p className="text-gray-600">Meals Shared</p>
//             </motion.div>
            
//             <motion.div 
//               whileHover={{ scale: 1.05 }}
//               className="bg-white p-6 rounded-xl shadow-md"
//             >
//               <FiMapPin className="text-4xl text-red-500 mx-auto mb-4" />
//               <h3 className="text-3xl font-bold text-gray-800 mb-2">25+</h3>
//               <p className="text-gray-600">Cities</p>
//             </motion.div>
            
//             <motion.div 
//               whileHover={{ scale: 1.05 }}
//               className="bg-white p-6 rounded-xl shadow-md"
//             >
//               <FiShield className="text-4xl text-red-500 mx-auto mb-4" />
//               <h3 className="text-3xl font-bold text-gray-800 mb-2">150+</h3>
//               <p className="text-gray-600">Partners</p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="about" className="py-20 bg-white">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col md:flex-row items-center">
//             <motion.div 
//               initial={{ x: -50, opacity: 0 }}
//               whileInView={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="md:w-1/2 mb-10 md:mb-0"
//             >
//               <div className="relative">
//                 <img 
//                   src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
//                   alt="About Aahar Sathi" 
//                   className="rounded-lg shadow-xl w-full h-auto"
//                 />
//                 <div className="absolute -bottom-6 -right-6 bg-red-500 p-4 rounded-lg shadow-lg">
//                   <FiHeart className="text-white text-4xl" />
//                 </div>
//               </div>
//             </motion.div>
            
//             <motion.div 
//               initial={{ x: 50, opacity: 0 }}
//               whileInView={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="md:w-1/2 md:pl-12"
//             >
//               <h2 className="text-3xl font-bold text-gray-800 mb-6">About Aahar Sathi</h2>
//               <p className="text-gray-600 mb-6">
//                 Aahar Sathi is a platform that bridges the gap between surplus food and hunger. We connect food providers 
//                 (hotels, restaurants, PGs) with NGOs and volunteers to ensure no food goes to waste while fighting hunger 
//                 in our communities.
//               </p>
//               <p className="text-gray-600 mb-8">
//                 Our mission is to create a sustainable ecosystem where excess food reaches those who need it most, 
//                 while reducing food waste and its environmental impact.
//               </p>
//               <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-full transition transform hover:scale-105">
//                 Learn More
//               </button>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section id="how-it-works" className="py-20 bg-gray-50">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Our simple three-step process makes food donation effortless and impactful
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <motion.div 
//               whileHover={{ y: -10 }}
//               className="bg-white p-8 rounded-xl shadow-md text-center"
//             >
//               <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <span className="text-red-500 text-2xl font-bold">1</span>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">Food Providers Register</h3>
//               <p className="text-gray-600">
//                 Hotels, restaurants, and PGs sign up and list their surplus food availability
//               </p>
//             </motion.div>
            
//             <motion.div 
//               whileHover={{ y: -10 }}
//               className="bg-white p-8 rounded-xl shadow-md text-center"
//             >
//               <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <span className="text-red-500 text-2xl font-bold">2</span>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">NGOs/Volunteers Respond</h3>
//               <p className="text-gray-600">
//                 Verified NGOs and volunteers coordinate pickup and distribution
//               </p>
//             </motion.div>
            
//             <motion.div 
//               whileHover={{ y: -10 }}
//               className="bg-white p-8 rounded-xl shadow-md text-center"
//             >
//               <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <span className="text-red-500 text-2xl font-bold">3</span>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">Food Reaches Those in Need</h3>
//               <p className="text-gray-600">
//                 Nutritious meals are delivered to shelters, communities, and individuals
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-red-500 to-orange-500 text-white">
//         <div className="container mx-auto px-6 text-center">
//           <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
//           <p className="text-xl mb-8 max-w-2xl mx-auto">
//             Join our network of food providers, NGOs, and volunteers to fight hunger in your community
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <button className="bg-white text-red-500 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full transition transform hover:scale-105 shadow-lg">
//               Become a Food Provider
//             </button>
//             <button className="bg-transparent border-2 border-white hover:bg-white hover:text-red-500 font-semibold px-8 py-3 rounded-full transition transform hover:scale-105">
//               Join as Volunteer
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section id="testimonials" className="py-20 bg-white">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Hear from those who've been part of our mission
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <motion.div 
//               whileHover={{ scale: 1.02 }}
//               className="bg-gray-50 p-8 rounded-xl shadow-sm"
//             >
//               <div className="flex items-center mb-4">
//                 <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
//                   <FiHeart className="text-red-500" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-gray-800">Rahul Sharma</h4>
//                   <p className="text-gray-600 text-sm">Hotel Owner, Delhi</p>
//                 </div>
//               </div>
//               <p className="text-gray-600 italic">
//                 "Aahar Sathi helped us reduce our food waste by 70% while supporting our local community. It's a win-win for everyone."
//               </p>
//             </motion.div>
            
//             <motion.div 
//               whileHover={{ scale: 1.02 }}
//               className="bg-gray-50 p-8 rounded-xl shadow-sm"
//             >
//               <div className="flex items-center mb-4">
//                 <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
//                   <FiUsers className="text-red-500" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-gray-800">Priya Patel</h4>
//                   <p className="text-gray-600 text-sm">NGO Director, Mumbai</p>
//                 </div>
//               </div>
//               <p className="text-gray-600 italic">
//                 "We've been able to serve 200 more meals daily since partnering with Aahar Sathi. Their platform is a game-changer."
//               </p>
//             </motion.div>
            
//             <motion.div 
//               whileHover={{ scale: 1.02 }}
//               className="bg-gray-50 p-8 rounded-xl shadow-sm"
//             >
//               <div className="flex items-center mb-4">
//                 <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
//                   <FiMapPin className="text-red-500" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-gray-800">Arjun Mehta</h4>
//                   <p className="text-gray-600 text-sm">Volunteer, Bangalore</p>
//                 </div>
//               </div>
//               <p className="text-gray-600 italic">
//                 "Volunteering with Aahar Sathi has been incredibly rewarding. The app makes coordination so easy."
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="py-20 bg-gray-50">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col md:flex-row">
//             <motion.div 
//               initial={{ x: -50, opacity: 0 }}
//               whileInView={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="md:w-1/2 mb-10 md:mb-0"
//             >
//               <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
//               <p className="text-gray-600 mb-8">
//                 Have questions or want to partner with us? Reach out and we'll get back to you soon.
//               </p>
              
//               <div className="space-y-6">
//                 <div className="flex items-start">
//                   <FiMail className="text-red-500 text-xl mt-1 mr-4" />
//                   <div>
//                     <h4 className="font-semibold text-gray-800">Email</h4>
//                     <p className="text-gray-600">contact@aaharsathi.org</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start">
//                   <FiPhone className="text-red-500 text-xl mt-1 mr-4" />
//                   <div>
//                     <h4 className="font-semibold text-gray-800">Phone</h4>
//                     <p className="text-gray-600">+91 98765 43210</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start">
//                   <FiClock className="text-red-500 text-xl mt-1 mr-4" />
//                   <div>
//                     <h4 className="font-semibold text-gray-800">Hours</h4>
//                     <p className="text-gray-600">Monday - Friday: 9AM - 6PM</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="mt-8">
//                 <h4 className="font-semibold text-gray-800 mb-4">Follow Us</h4>
//                 <div className="flex space-x-4">
//                   <a href="#" className="text-gray-600 hover:text-red-500 transition">
//                     <FaFacebook className="text-2xl" />
//                   </a>
//                   <a href="#" className="text-gray-600 hover:text-red-500 transition">
//                     <FaTwitter className="text-2xl" />
//                   </a>
//                   <a href="#" className="text-gray-600 hover:text-red-500 transition">
//                     <FaInstagram className="text-2xl" />
//                   </a>
//                   <a href="#" className="text-gray-600 hover:text-red-500 transition">
//                     <FaLinkedin className="text-2xl" />
//                   </a>
//                 </div>
//               </div>
//             </motion.div>
            
//             <motion.div 
//               initial={{ x: 50, opacity: 0 }}
//               whileInView={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="md:w-1/2 md:pl-12"
//             >
//               <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md">
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h3>
                
//                 <div className="mb-6">
//                   <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
//                   <input 
//                     type="text" 
//                     id="name" 
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                     required
//                   />
//                 </div>
                
//                 <div className="mb-6">
//                   <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
//                   <input 
//                     type="email" 
//                     id="email" 
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                     required
//                   />
//                 </div>
                
//                 <div className="mb-6">
//                   <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
//                   <textarea 
//                     id="message" 
//                     rows="4" 
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                     required
//                   ></textarea>
//                 </div>
                
//                 <button 
//                   type="submit" 
//                   className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition"
//                 >
//                   Send Message
//                 </button>
                
//                 <AnimatePresence>
//                   {submitted && (
//                     <motion.div 
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -20 }}
//                       className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center"
//                     >
//                       Thank you! Your message has been sent.
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </form>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-12">
//         <div className="container mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center mb-4">
//                 <FiHeart className="text-2xl text-red-500 mr-2" />
//                 <span className="text-xl font-bold">Aahar Sathi</span>
//               </div>
//               <p className="text-gray-400">
//                 Bridging the gap between surplus food and hunger through technology and community.
//               </p>
//             </div>
            
//             <div>
//               <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//               <ul className="space-y-2">
//                 <li><a href="#home" className="text-gray-400 hover:text-white transition">Home</a></li>
//                 <li><a href="#about" className="text-gray-400 hover:text-white transition">About</a></li>
//                 <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition">How It Works</a></li>
//                 <li><a href="#testimonials" className="text-gray-400 hover:text-white transition">Impact</a></li>
//                 <li><a href="#contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="text-lg font-semibold mb-4">Get Involved</h4>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white transition">Become a Food Provider</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition">Join as Volunteer</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition">Partner as NGO</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white transition">Donate</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
//               <p className="text-gray-400 mb-4">
//                 Subscribe to get updates on our initiatives
//               </p>
//               <form className="flex">
//                 <input 
//                   type="email" 
//                   placeholder="Your email" 
//                   className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-800 w-full"
//                 />
//                 <button 
//                   type="submit" 
//                   className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-r-lg transition"
//                 >
//                   Subscribe
//                 </button>
//               </form>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
//             <p>&copy; {new Date().getFullYear()} Aahar Sathi. All rights reserved.</p>
//           </div>
//         </div>
//       {/* </footer> */}
//     </div>
//   );
// };

// export default LandingPage;