// import User from '../models/User.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import { upsertStreamUser, generateStreamToken } from '../lib/stream.js';

// // SIGNUP
// // export async function signup(req, res) {
// //   const { email, password, fullName } = req.body;

// //   try {
// //     if (!email || !password || !fullName) {
// //       return res.status(400).json({ message: 'All fields are required' });
// //     }

// //     if (password.length < 6) {
// //       return res.status(400).json({ message: 'Password must be at least 6 characters long' });
// //     }

// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
// //     if (!emailRegex.test(email)) {
// //       return res.status(400).json({ message: 'Invalid email format' });
// //     }

// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: 'Email already in use, please use a different one' });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const idx = Math.floor(Math.random() * 100) + 1;
// //     const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

// //     const newUser = await User.create({
// //       email,
// //       password: hashedPassword,
// //       fullName,
// //       profilePic: randomAvatar
// //     });

// //     try {
// //       await upsertStreamUser({
// //         id: newUser._id,
// //         name: newUser.fullName,
// //         image: newUser.profilePic || "",
// //       });
// //       console.log(`Stream user created for ${newUser.fullName}`);
// //     } catch (error) {
// //       console.error("Error creating Stream user: ", error);
// //     }

// //     const token = jwt.sign(
// //       { userId: newUser._id },
// //       process.env.JWT_SECRET_KEY || "default_secret",
// //       { expiresIn: '7d' }
// //     );

// //     res.cookie("jwt", token, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === "production",
// //       sameSite: "Strict",
// //       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
// //     });

// //     res.status(201).json({
// //       message: "User registered successfully",
// //       success: true,
// //       user: {
// //         id: newUser._id,
// //         fullName: newUser.fullName,
// //         email: newUser.email,
// //         profilePic: newUser.profilePic
// //       }
// //     });

// //   } catch (error) {
// //     console.error("Signup error:", error);
// //     res.status(500).json({ message: 'Something went wrong. Please try again later.' });
// //   }
// // }
// // SIGNUP
// export async function signup(req, res) {
//   const { email, password, fullName } = req.body;

//   try {
//     if (!email || !password || !fullName) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     if (password.length < 6) {
//       return res.status(400).json({ message: 'Password must be at least 6 characters long' });
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ message: 'Invalid email format' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already in use, please use a different one' });
//     }

//     // ✅ Ensure hashing happens before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const idx = Math.floor(Math.random() * 100) + 1;
//     const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

//     const newUser = new User({
//       email,
//       password: hashedPassword, // ✅ store hash
//       fullName,
//       profilePic: randomAvatar
//     });

//     await newUser.save();

//     // Stream user creation (optional)
//     try {
//       await upsertStreamUser({
//         id: newUser._id,
//         name: newUser.fullName,
//         image: newUser.profilePic || "",
//       });
//     } catch (error) {
//       console.error("Error creating Stream user: ", error);
//     }

//     // JWT token
//     const token = jwt.sign(
//       { userId: newUser._id },
//       process.env.JWT_SECRET_KEY || "default_secret",
//       { expiresIn: '7d' }
//     );

//     res.cookie("jwt", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production" ? true : false,
//       sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       success: true,
//       user: {
//         id: newUser._id,
//         fullName: newUser.fullName,
//         email: newUser.email,
//         profilePic: newUser.profilePic
//       }
//     });

//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(500).json({ message: 'Something went wrong. Please try again later.' });
//   }
// }


// // LOGIN
// // export async function login(req, res) {
// //   const { email, password } = req.body;

// //   try {
// //     if (!email || !password) {
// //       return res.status(400).json({ message: "Email and password are required" });
// //     }
    

// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(401).json({ message: "Invalid email or password" });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(401).json({ message: "Invalid email or password" });
// //     }

// //     const token = jwt.sign(
// //       { userId: user._id },
// //       process.env.JWT_SECRET_KEY || "default_secret",
// //       { expiresIn: '7d' }
// //     );

// //     res.cookie("jwt", token, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === "production",
// //       sameSite: "Strict",
// //       maxAge: 7 * 24 * 60 * 60 * 1000,
// //     });

// //     res.status(200).json({
// //       message: "Logged in successfully",
// //       success: true,
// //       user: {
// //         id: user._id,
// //         fullName: user.fullName,
// //         email: user.email,
// //         profilePic: user.profilePic
// //       }
// //     });

// //   } catch (error) {
// //     console.error("Login error:", error);
// //     res.status(500).json({ message: "Login failed. Please try again later." });
// //   }
// // }


// // =================== LOGIN ===================
// // LOGIN
// export async function login(req, res) {
//   const { email, password } = req.body;

//   try {
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log("Login failed: No user found with email", email);
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log("Login failed: Incorrect password for", email);
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Generate JWT
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET_KEY || "default_secret",
//       { expiresIn: '7d' }
//     );

//     // Set cookie (development-safe)
//     res.cookie("jwt", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production" ? true : false, // only secure in prod
//       sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       message: "Logged in successfully",
//       success: true,
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//         profilePic: user.profilePic
//       }
//     });

//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Login failed. Please try again later." });
//   }
// }





// // LOGOUT
// export async function logout(req, res) {
//   res.clearCookie("jwt", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "Strict",
//   });

//   res.status(200).json({ message: "Logged out successfully" });
// }

// // PROFILE 

// export async function onboard(req, res) {
//   try {
//     const userId = req.user._id;

//     const {
//       fullName,
//       bio,
//       nativeLanguage,
//       learningLanguage,
//       location
//     } = req.body;

//     // Check for missing fields
//     const missingFields = [];
//     if (!fullName) missingFields.push("fullName");
//     if (!bio) missingFields.push("bio");
//     if (!nativeLanguage) missingFields.push("nativeLanguage");
//     if (!learningLanguage) missingFields.push("learningLanguage");
//     if (!location) missingFields.push("location");

//     if (missingFields.length > 0) {
//       return res.status(400).json({
//         message: "All fields are required",
//         missingFields
//       });
//     }

//     // Update the user document
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         fullName,
//         bio,
//         nativeLanguage,
//         learningLanguage,
//         location,
//         isOnboarded: true
//       },
//       { new: true, runValidators: true }
//     ).select("-password");

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // ✅ Update the User INFO IN STREAM
//     try {
//       await upsertStreamUser({
//         id: updatedUser._id.toString(),
//         name: updatedUser.fullName,
//         image: updatedUser.profilePic || "", // If available
//       });
//       console.log(`✅ Stream user updated for ${updatedUser.fullName}`);
//     } catch (streamError) {
//       console.error("⚠️ Failed to update Stream user:", streamError.message);
//     }

//     res.status(200).json({
//       message: "User onboarded successfully",
//       success: true,
//       user: updatedUser
//     });

//   } catch (error) {
//     console.error("❌ Onboarding error:", error.message);
//     res.status(500).json({
//       message: "Something went wrong during onboarding",
//       error: error.message
//     });
//   }
// }

import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  const { email, password, fullName } = req.body;

  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists, please use a diffrent one" });
    }

    const idx = Math.floor(Math.random() * 100) + 1; // generate a num between 1-100
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await User.create({
      email,
      fullName,
      password,
      profilePic: randomAvatar,
    });

    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
      console.log(`Stream user created for ${newUser.fullName}`);
    } catch (error) {
      console.log("Error creating Stream user:", error);
    }

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout successful" });
}

export async function onboard(req, res) {
  try {
    const userId = req.user._id;

    const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

    if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
      });
      console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
    } catch (streamError) {
      console.log("Error updating Stream user during onboarding:", streamError.message);
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Onboarding error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
