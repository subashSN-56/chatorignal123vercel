// // export default function Example() {
// //     return (
// //         <form className="flex flex-col items-center text-sm text-slate-800">
// //             <p className="text-xs bg-indigo-200 text-indigo-600 font-medium px-3 py-1 rounded-full">Contact Us</p> 
// //             <h1 className="text-4xl font-bold py-4 text-center">Let’s Get In Touch.</h1>
// //             <p className="max-md:text-sm text-gray-500 pb-10 text-center">
// //                 Or just reach out manually to us at <a href="#" className="text-indigo-600 hover:underline">subash852488@gmail.com</a>
// //             </p>
            
// //             <div className="max-w-96 w-full px-4">
// //                 <label htmlFor="name" className="font-medium">Full Name</label>
// //                 <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
// //                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                         <path d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0" fill="#475569"/>
// //                     </svg>
// //                     <input type="text" className="h-full px-2 w-full outline-none bg-transparent" placeholder="Enter your full name" required />
// //                 </div>
        
// //                 <label htmlFor="email-address" className="font-medium mt-4">Email Address</label>
// //                 <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
// //                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                         <path d="M17.5 3.438h-15a.937.937 0 0 0-.937.937V15a1.563 1.563 0 0 0 1.562 1.563h13.75A1.563 1.563 0 0 0 18.438 15V4.375a.94.94 0 0 0-.938-.937m-2.41 1.874L10 9.979 4.91 5.313zM3.438 14.688v-8.18l5.928 5.434a.937.937 0 0 0 1.268 0l5.929-5.435v8.182z" fill="#475569"/>
// //                     </svg>
// //                     <input type="email" className="h-full px-2 w-full outline-none bg-transparent" placeholder="Enter your email address" required />
// //                 </div>
        
// //                 <label htmlFor="message" className="font-medium mt-4">Message</label>
// //                 <textarea rows="4" className="w-full mt-2 p-2 bg-transparent border border-slate-300 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-indigo-400 transition-all" placeholder="Enter your message" required></textarea>
                
// //                 <button type="submit" className="flex items-center justify-center gap-1 mt-5 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 w-full rounded-full transition">
// //                     Submit Form
// //                     <svg className="mt-0.5" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                         <path d="m18.038 10.663-5.625 5.625a.94.94 0 0 1-1.328-1.328l4.024-4.023H3.625a.938.938 0 0 1 0-1.875h11.484l-4.022-4.025a.94.94 0 0 1 1.328-1.328l5.625 5.625a.935.935 0 0 1-.002 1.33" fill="#fff"/>
// //                     </svg>
// //                 </button>
// //             </div>
// //         </form>
// //     );
// // };

// export default function Example() {
//   return (
//     <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 px-6 py-12 gap-8">
      
//       {/* Left Side Content (can be text, image, or your site link) */}
//       <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
//         <h2 className="text-3xl font-bold text-indigo-600">Welcome to Whats1</h2>
//         <p className="mt-4 text-gray-600 max-w-md">
//           This is your existing project at 
//           <a 
//             href="https://aslamaslam143.github.io/whats1/" 
//             target="_blank" 
//             className="text-indigo-500 hover:underline ml-1"
//           >
//             whats1
//           </a>.  
//           On the right side, you can reach out to us directly using the contact form.
//         </p>
//       </div>

//       {/* Right Side Contact Form */}
//       <div className="flex-1">
//         <form className="flex flex-col items-center text-sm text-slate-800 bg-white shadow-lg rounded-2xl p-6">
//           <p className="text-xs bg-indigo-200 text-indigo-600 font-medium px-3 py-1 rounded-full">Contact Us</p> 
//           <h1 className="text-3xl font-bold py-4 text-center">Let’s Get In Touch</h1>
//           <p className="max-md:text-sm text-gray-500 pb-6 text-center">
//             Or just reach out manually to us at 
//             <a href="mailto:subash852488@gmail.com" className="text-indigo-600 hover:underline ml-1">
//               subash852488@gmail.com
//             </a>
//           </p>
          
//           <div className="w-full">
//             {/* Full Name */}
//             <label htmlFor="name" className="font-medium">Full Name</label>
//             <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
//               <input type="text" className="h-full px-2 w-full outline-none bg-transparent" placeholder="Enter your full name" required />
//             </div>

//             {/* Email */}
//             <label htmlFor="email-address" className="font-medium mt-4">Email Address</label>
//             <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
//               <input type="email" className="h-full px-2 w-full outline-none bg-transparent" placeholder="Enter your email address" required />
//             </div>

//             {/* Message */}
//             <label htmlFor="message" className="font-medium mt-4">Message</label>
//             <textarea rows="4" className="w-full mt-2 p-2 bg-transparent border border-slate-300 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-indigo-400 transition-all" placeholder="Enter your message" required></textarea>
            
//             {/* Submit */}
//             <button type="submit" className="flex items-center justify-center gap-1 mt-5 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 w-full rounded-full transition">
//               Submit Form
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";

export default function WhatsAppContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const sendToWhatsApp = (e) => {
    e.preventDefault();
    let number = "918524881862"; // your WhatsApp number

    let url =
      "https://wa.me/" +
      number +
      "?text=" +
      "Name: " +
      encodeURIComponent(formData.name) +
      "%0a" +
      "Email: " +
      encodeURIComponent(formData.email) +
      "%0a" +
      "Phone: " +
      encodeURIComponent(formData.phone) +
      "%0a" +
      "Message: " +
      encodeURIComponent(formData.message);

    window.open(url, "_blank").focus();
    setSent(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-t from-black via-black to-green-950 p-6 gap-8">
      {/* Left Side WhatsApp Form */}
      <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-4">
          WhatsApp Contact Us
        </h2>
        <form onSubmit={sendToWhatsApp} className="space-y-3">
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="tel"
            id="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
          <textarea
            id="message"
            rows="4"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:ring-2 focus:ring-green-500 outline-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>
        {sent && (
          <p className="text-green-600 text-center mt-3 font-medium">
            ✅ Message Sent Successfully!
          </p>
        )}
      </div>

      {/* Right Side Content */}
      <div className="flex-1 bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Why Contact Us?
        </h2>
        <p className="text-gray-600 mb-4">
          We are always ready to help you with your queries. Whether you need
          support, have a business idea, or just want to say hello, feel free to
          reach out via WhatsApp.
        </p>
        <p className="text-gray-700">
          📞 Phone: <span className="font-medium">+91 8524881862</span>
          <br />
          📧 Email:{" "}
          <a
            href="mailto:subash852488@gmail.com"
            className="text-green-600 hover:underline"
          >
            subash852488@gmail.com
          </a>
        </p>
        <p className="mt-4 text-gray-600">
          Your satisfaction is our priority. We usually reply within a few
          hours, so don’t hesitate to contact us!
        </p>
      </div>
    </div>
  );
}
