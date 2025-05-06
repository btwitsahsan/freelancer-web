import axios from "axios";
import { SignInUserType } from "@/types";
import { toast } from "react-toastify";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const signIn = async (data: SignInUserType) => {
  try {
    const response = await axios.post( `${apiUrl}/auth/login`, data);
    return response; // Return the uploaded image URL
  
  } catch (error) {
    toast.error("Login Failed");
  }
}

export const sendMessage = async (formData: FormData) => {
  console.log("sendMessage", formData);
  try {
    await axios.post( `${apiUrl}/messages/send`, formData);  
  } catch (error) { 
    toast.error(error.response.data.message);
  }

}

export const getMessage = async (senderId: string, receiverId: string) => {
  try {
    const response = await axios.get( `${apiUrl}/messages/${senderId}/${receiverId}`);  
    return response.data.messages; // Return the messages array
  } catch (error) { 
    toast.error(error.response.data.message);
  }
}

export const newMsgInit = async (senderId: string, receiverId: string) => {
  console.log("senderId", senderId);
  console.log("receiverId", receiverId);
  try {
    const response = await axios.post( `${apiUrl}/messages/newMessageInit/${senderId}/${receiverId}`);  
    return response.data.newMessages; // Return the messages array
  } catch (error) { 
    toast.error(error.response.data.message);
  }
}

export const createServer = async (formData: FormData) => {
  console.log("axios");
  try {
    const response = await axios.post( `${apiUrl}/servers/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response; // Return the uploaded image URL
  
  } catch (error) {
    console.log("Upload Failed", error);
    throw new Error("Upload Failed");
  }
}

export const getAllServer = async () => { 

  try {
    const response = await axios.get(`${apiUrl}/servers`);
    return response.data.servers; // Return the uploaded image URL
  } catch (error) { 
    console.error("Error", error);
    throw new Error("Error");
  }

}

export const addMessageRequest = async (requester: string, recipient: string) => { 

  const data = {requester, recipient};

  try {
    const response = await axios.post( `${apiUrl}/friendRequests/send`, data);
    toast.success(response.data.message);
    return response.data.success;
  } catch (error) { 
    toast.error(error.response.data.message);
  }

}

export const getFriendRequest = async (userId: string) => {
  try {
    const response = await axios.get( `${apiUrl}/friendRequests/${userId}`);
    return response.data.friendRequests;
    
  } catch (error) { 
    console.error("Error", error);
    throw new Error("Error");
  }
}

export const deleteServer = async (serverId: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/servers/${serverId}`);
    console.log("response", response.data);
    return response.data.requests; // Return the uploaded image URL
  } catch (error) { 
   console.error("Error", error);
    throw new Error("Error");
  }
}

export const requestAccept = async (requestId: string) => { 

    try {
      const response = await axios.put( `${apiUrl}/friendRequests/respond/${requestId}`, {status: 'accepted'});
      toast.success(response.data.message);
      return response.data.friendRequests;
      
    } catch (error) { 
      console.error("Error", error);
      throw new Error("Error");
    }

}

export const requestCancel = async (requestId: string) => { 

  try {
    const response = await axios.put( `${apiUrl}/friendRequests/respond/${requestId}`, {status: 'cancel'});
    toast.success(response.data.message);
  } catch (error) { 
    console.error("Error", error);
    throw new Error("Error");
  }

}

export const getDM = async (uid: string) => {
  const response = await axios.get( `${apiUrl}/friendRequests/friendList/${uid}` )
  console.log(response.data.friendLists);
  console.log(response.data.newMessages);
  return response.data;
}