import { StreamChat } from 'stream-chat';
import 'dotenv/config';

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream credentials missing");
  process.exit(1);
}



const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error(" Stream user error:", error.message);
    throw error;
  }
};

export const generateStreamToken = (userId) => {
  try {
    // ensure userid is a string 
    const userIdstr = userId.toString();
    return streamClient.createToken(userIdstr);
  } catch (error) {
    console.error(" Token error:", error.message);
    throw error;
  }
};
