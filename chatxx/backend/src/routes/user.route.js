import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptFriendRequest, getFriendRequest, getMyFriends, getOutgoingFriendRequest, getRecommendedUsers,sendFriendRequest } from "../controllers/user.controller.js";


const router = express.Router();
// apply auth middleware to all routess
router.use(protectRoute)



router.get("/" ,getRecommendedUsers)
router.get("/friends" ,getMyFriends)

router.post("/friend-request/:id",sendFriendRequest);

// router.put("/friend-request/:id/accept",acceptFriendRequest);
router.put("/friend-requests/:id/accept", acceptFriendRequest);


// friend notification page 
router.get("/friend-requests",getFriendRequest);
router.get("/outgoing-friend-requests",getOutgoingFriendRequest);

export default router;