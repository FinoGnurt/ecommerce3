import toast from "react-hot-toast";

const uploadToCloudinary = async (image) => {
  const formData = new FormData();

  // Add required fields
  formData.append("file", image); // File object
  formData.append("upload_preset", "ecommerce2"); // Replace with your upload preset
  formData.append("cloud_name", import.meta.env.VITE_API_NAME_CLOUDINARY); // Replace with your cloud_name

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_API_NAME_CLOUDINARY}/image/upload`, // Update resource type if needed
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();

    //console.log("Upload successful:", data);
    return data; // Contains public_id, URL, etc.
    //return data.secure_url; // Return secure_url for use in the product model
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error("Đã có lỗi trong quá trình tải ảnh lên server!");
  }
};

export default uploadToCloudinary;
