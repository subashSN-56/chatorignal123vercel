import User from "../models/User.js";
import FriendRequest from '../models/FriendRequest.js'





export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const currentUser = await User.findById(currentUserId)
      .select("friends blocked")
      .lean();

    const friendIds = currentUser.friends || [];
    const blockedIds = currentUser.blocked || [];

    const recommendedUsers = await User.find({
      _id: { $ne: currentUserId, $nin: [...friendIds, ...blockedIds] },
      isOnboarded: true // ✅ Now a separate filter
    }).select("-password");

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error fetching recommended users:", error.message);
    res.status(500).json({ message: "Failed to fetch recommended users" });
  }
};



export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user._id).select("friends").populate(
      "friends", "fullName profilePic nativeLanguage learningLanguage"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error fetching friends:", error.message);
    res.status(500).json({ message: "Failed to fetch friends" });
  }
}


export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user._id;
    const { id: recipientId } = req.params;

    // Prevent sending request to yourself
    if (myId.toString() === recipientId) {
      return res.status(400).json({
        message: "You can't send a friend request to yourself"
      });
    }

    // Check if recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // Check if already friends
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({
        message: "You are already friends with this user"
      });
    }

    // Check if a request already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });
    if (existingRequest) {
      return res.status(400).json({
        message: "A friend request already exists between you and this user"
      });
    }

    // Create friend request
    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);

  } catch (error) {
    console.error("Error in sendFriendRequest controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}



export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendrequest = await FriendRequest.findById(requestId);

    if (!friendrequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendrequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to accept this request" });
    }

    friendrequest.status = "accepted";
    await friendrequest.save();

    await User.findByIdAndUpdate(friendrequest.sender, {
      $addToSet: { friends: friendrequest.recipient },
    });

    await User.findByIdAndUpdate(friendrequest.recipient, {
      $addToSet: { friends: friendrequest.sender },
    });

    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getFriendRequest(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",

    }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",

    }).populate("recipient", "fullName profilePic ");

    res.status(200).json({ incomingReqs, acceptedReqs })

  } catch (error) {
    console.log("error in getPending friends controller ", error.message);
    res.status(500).json({ message: "Internal server error" });



  }

}
export async function getOutgoingFriendRequest(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",

    }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

  
    res.status(200).json(outgoingRequests)

  } catch (error) {
    console.log("error in get outgoing friends controller ", error.message);
    res.status(500).json({ message: "Internal server error" });



  }

}


