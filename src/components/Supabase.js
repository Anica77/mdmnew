import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_DATABASE_URL;
const supabaseKey = process.env.REACT_APP_DATABASE_ANOK;

const supabase = createClient(supabaseUrl, supabaseKey);

//get corporate images
export const getImages = async () => {
  try {
    const { data, error } = await supabase.storage
      .from("corporatephotos")
      .list();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching images from database:", error.message);
  }
};

//get images for a homepage
export const getBackgroundImages = async () => {
  try {
    const { data, error } = await supabase.storage
      .from("homepagebackground")
      .list();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching images from database:", error.message);
  }
};

//get reviews for contact page
export const getReviews = async () => {
  try {
    const { data, error } = await supabase.from("reviews").select("*");

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

//delete a picture
export const deletePhoto = async (bucketName, imageName) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .remove([imageName]);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error deleting image:", error.message);
  }
};

//add a photo
export const uploadPhoto = async (bucketName, file, fileName) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error uploading image:", error.message);
  }
};

export default supabase;
