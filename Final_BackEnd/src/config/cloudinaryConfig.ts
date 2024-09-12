import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dstpvt64c',
  api_key: process.env.CLOUDINARY_API_KEY || '659547838485621',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'dw0Xe5oOjGFNVOdN_sxxAew-dzY',
});

export default cloudinary.v2;
