import { v2 as cloudinary } from 'cloudinary';

console.log('DEBUG cloud_name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('DEBUG api_key:', process.env.CLOUDINARY_API_KEY);
console.log('DEBUG api_secret exists:', !!process.env.CLOUDINARY_API_SECRET);
console.log('DEBUG api_secret length:', process.env.CLOUDINARY_API_SECRET?.length);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

