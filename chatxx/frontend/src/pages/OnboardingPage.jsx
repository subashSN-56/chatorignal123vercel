// import { useState } from 'react';
// import useAuthUser from '../hooks/useAuthUser';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { LoaderIcon, toast } from 'react-hot-toast';
// import { completeOnboarding } from '../lib/api.js';
// import { MapPin, Camera, ShipWheel, CameraIcon, ShuffleIcon } from 'lucide-react';
// import { LANGUAGES } from '../constants/index.js';
// // const LANGUAGES = [
// //   'English', 'Spanish', 'French', 'German', 'Hindi', 'Tamil', 'Telugu', 'Japanese'
// // ];

// const LOCATIONS = [
//   // Union Territories
//   'Andaman and Nicobar Islands',
//   'Chandigarh',
//   'Dadra and Nagar Haveli and Daman and Diu',
//   'Delhi',
//   'Jammu and Kashmir',
//   'Ladakh',
//   'Lakshadweep',
//   'Puducherry',

//   // States
//   'Andhra Pradesh',
//   'Arunachal Pradesh',
//   'Assam',
//   'Bihar',
//   'Chhattisgarh',
//   'Goa',
//   'Gujarat',
//   'Haryana',
//   'Himachal Pradesh',
//   'Jharkhand',
//   'Karnataka',
//   'Kerala',
//   'Madhya Pradesh',
//   'Maharashtra',
//   'Manipur',
//   'Meghalaya',
//   'Mizoram',
//   'Nagaland',
//   'Odisha',
//   'Punjab',
//   'Rajasthan',
//   'Sikkim',
//   'Tamil Nadu',
//   'Telangana',
//   'Tripura',
//   'Uttar Pradesh',
//   'Uttarakhand',
//   'West Bengal'
// ];


// const OnboardingPage = () => {
//   const { user: authUser } = useAuthUser();
//   const queryClient = useQueryClient();

//   const [formState, setFormState] = useState({
//     fullName: authUser?.fullName || '',
//     bio: authUser?.bio || '',
//     nativeLanguage: authUser?.nativeLanguage || '',
//     learningLanguage: authUser?.learningLanguage || '',
//     location: authUser?.location || '',
//     profilePic: authUser?.profilePic || '',
//   });

//   const { mutate: onboardingMutation, isPending } = useMutation({
//     mutationFn: completeOnboarding,
//     onSuccess: () => {
//       toast.success('Profile onboarded successfully!');
//       queryClient.invalidateQueries({ queryKey: ['authUser'] });
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Onboarding failed');
//     },
//   });

//   const handleChange = (e) => {
//     setFormState({ ...formState, [e.target.name]: e.target.value });
//   };

//   const handleRandomAvatar = () => {
//     const idx = Math.floor(Math.random() * 100) + 1;
//     const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
//     setFormState((prev) => ({ ...prev, profilePic: randomAvatar }));
//     toast.success("Random profile picture generated!");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onboardingMutation(formState);
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl animate-fadeIn">
//       <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
//         Complete Your Profile
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
        
//         {/* Profile Picture */}
//         <div className="flex flex-col items-center justify-center space-y-4">
//           <div className="size-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 p-1">
//             {formState.profilePic ? (
//               <img
//                 src={formState.profilePic}
//                 alt="Profile Preview"
//                 className="w-full h-full object-cover rounded-full"
//               />
//             ) : (
//               <div className="flex items-center justify-center h-full bg-gray-200 rounded-full">
//                 <CameraIcon className="size-12 text-gray-500 opacity-60" />
//               </div>
//             )}
//           </div>
//           <button
//             type="button"
//             onClick={handleRandomAvatar}
//             className="btn btn-accent flex items-center gap-2"
//           >
//             <ShuffleIcon className="size-4" />
//             Generate Random Avatar
//           </button>
//         </div>

//         {/* Full Name */}
//         <div>
//           <label className="block mb-1 font-semibold text-gray-700">Full Name</label>
//           <input
//             type="text"
//             name="fullName"
//             value={formState.fullName}
//             onChange={handleChange}
//             className="w-full input input-bordered focus:outline-none focus:ring-2 focus:ring-green-400"
//             required
//           />
//         </div>

//         {/* Bio */}
//         <div>
//           <label className="block mb-1 font-semibold text-gray-700">Bio</label>
//           <textarea
//             name="bio"
//             value={formState.bio}
//             onChange={handleChange}
//             className="w-full textarea textarea-bordered focus:outline-none focus:ring-2 focus:ring-purple-400"
//             rows="3"
//           ></textarea>
//         </div>

//         {/* Native Language */}
//         <div>
//           <label className="block mb-1 font-semibold text-gray-700">Native Language</label>
//           <select
//             name="nativeLanguage"
//             value={formState.nativeLanguage}
//             onChange={handleChange}
//             className="w-full select select-bordered focus:outline-none focus:ring-2 focus:ring-pink-400"
//           >
//             <option value="">Select your native language</option>
//             {LANGUAGES.map((lang) => (
//               <option key={`native-${lang}`} value={lang}>
//                 {lang}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Learning Language */}
//         <div>
//           <label className="block mb-1 font-semibold text-gray-700">Learning Language</label>
//           <select
//             name="learningLanguage"
//             value={formState.learningLanguage}
//             onChange={handleChange}
//             className="w-full select select-bordered focus:outline-none focus:ring-2 focus:ring-purple-400"
//           >
//             <option value="">Select learning language</option>
//             {LANGUAGES.map((lang) => (
//               <option key={`learn-${lang}`} value={lang}>
//                 {lang}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Location */}
//         <div>
//           <label className="block mb-1 font-semibold text-gray-700">Location</label>
//           <select
//             name="location"
//             value={formState.location}
//             onChange={handleChange}
//             className="w-full select select-bordered focus:outline-none focus:ring-2 focus:ring-purple-400"
//           >
//             <option value="">Select your location</option>
//             {LOCATIONS.map((loc) => (
//               <option key={`location-${loc}`} value={loc}>
//                 {loc}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Submit Button */}
//         <div>
//           <button
//             type="submit"
//             // className="w-full py-3 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 hover:shadow-lg flex items-center justify-center gap-2"
//   className="relative w-full py-3 text-white font-semibold rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 hover:shadow-lg flex items-center justify-center gap-2"

//             disabled={isPending}
//           >
//             {isPending ? (
//               <>
//                 <LoaderIcon className="animate-spin size-5" />
//                 Onboarding...
//               </>
//             ) : (
//               <>
//                 <ShipWheel className="size-5" />
//                 Complete Onboarding
//               </>
//             )}
//           </button>
//         </div>
//       </form>

//       {/* Animation */}
//       <style>
//         {/* {`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(10px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//           .animate-fadeIn {
//             animation: fadeIn 0.6s ease-in-out;
//           }
//         `} */}
//         {`
// button::before {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: -100%;
//   width: 200%;
//   height: 100%;
//   background: url('https://svgshare.com/i/14YF.svg') repeat-x;
//   background-size: contain;
//   opacity: 0.3;
//   animation: wave 3s linear infinite;
// }

// @keyframes wave {
//   0% { transform: translateX(0); }
//   100% { transform: translateX(50%); }
// }
// `}


//       </style>
//     </div>
//   );
// };

// export default OnboardingPage;
import { useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoaderIcon, toast } from 'react-hot-toast';
import { completeOnboarding } from '../lib/api.js';
import { CameraIcon, ShuffleIcon, ShipWheel } from 'lucide-react';
import { LANGUAGES } from '../constants/index.js';

const LOCATIONS = [
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const OnboardingPage = () => {
  const { user: authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || '',
    bio: authUser?.bio || '',
    nativeLanguage: authUser?.nativeLanguage || '',
    learningLanguage: authUser?.learningLanguage || '',
    location: authUser?.location || '',
    profilePic: authUser?.profilePic || '',
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success('Profile onboarded successfully!');
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Onboarding failed');
    },
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState((prev) => ({ ...prev, profilePic: randomAvatar }));
    toast.success("Random profile picture generated!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-green-100 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Complete Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Profile Picture */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="size-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 p-1">
              {formState.profilePic ? (
                <img
                  src={formState.profilePic}
                  alt="Profile Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200 rounded-full">
                  <CameraIcon className="size-12 text-gray-500 opacity-60" />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleRandomAvatar}
              className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white flex items-center gap-2 shadow-md transition-all"
            >
              <ShuffleIcon className="size-4" />
              Random Avatar
            </button>
          </div>

          {/* Full Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formState.fullName}
              onChange={handleChange}
              className="w-full input input-bordered focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formState.bio}
              onChange={handleChange}
              className="w-full textarea textarea-bordered focus:outline-none focus:ring-2 focus:ring-purple-400"
              rows="3"
            ></textarea>
          </div>

          {/* Native Language */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Native Language</label>
            <select
              name="nativeLanguage"
              value={formState.nativeLanguage}
              onChange={handleChange}
              className="w-full select select-bordered focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Select your native language</option>
              {LANGUAGES.map((lang) => (
                <option key={`native-${lang}`} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Learning Language */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Learning Language</label>
            <select
              name="learningLanguage"
              value={formState.learningLanguage}
              onChange={handleChange}
              className="w-full select select-bordered focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select learning language</option>
              {LANGUAGES.map((lang) => (
                <option key={`learn-${lang}`} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Location</label>
            <select
              name="location"
              value={formState.location}
              onChange={handleChange}
              className="w-full select select-bordered focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select your location</option>
              {LOCATIONS.map((loc) => (
                <option key={`location-${loc}`} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="wave-button relative w-full py-3 text-white font-semibold rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 hover:shadow-lg flex items-center justify-center gap-2"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <LoaderIcon className="animate-spin size-5" />
                  Onboarding...
                </>
              ) : (
                <>
                  <ShipWheel className="size-5" />
                  Complete Onboarding
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Animations & Wave Effect */}
      <style>
      {`
      .animate-fadeIn {
        animation: fadeIn 0.6s ease-in-out;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .wave-button::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 200%;
        height: 100%;
        background: url('/3.jpg') repeat-x;
        background-size: contain;
        opacity: 0.3;
        animation: wave 3s linear infinite;
        pointer-events: none;
      }
      @keyframes wave {
        0% { transform: translateX(0); }
        100% { transform: translateX(50%); }
      }
      `}
      </style>
    </div>
  );
};

export default OnboardingPage;
