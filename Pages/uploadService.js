import { storage } from './firebaseConfig'; // Ensure this import path is correct
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Function to upload an image and return its download URL
export const uploadImageAsync = async (uri) => {
  try {
    // Convert the image URI to a blob
    const response = await fetch(uri);
    if (!response.ok) throw new Error('Failed to fetch image');
    
    const blob = await response.blob();
    
    // Create a reference to the storage location
    const filename = uri.split('/').pop();
    const storageRef = ref(storage, `images/${filename}`);
    
    // Upload the blob to Firebase Storage
    await uploadBytes(storageRef, blob);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error('Image upload error:', error);
    throw new Error('Failed to upload image: ' + error.message);
  }
};
