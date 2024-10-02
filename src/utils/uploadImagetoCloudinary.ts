/* eslint-disable @typescript-eslint/no-explicit-any */
export const uploadImageToCloudinary = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("cloud_name", import.meta.env.VITE_Cloud_Name as string);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_UpLoad_preset as string
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_Cloud_Name
    }/image/upload`,
    { method: "POST", body: formData }
  );

  const data = await res.json();
  return data?.url;
};
