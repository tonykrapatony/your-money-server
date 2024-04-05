import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';

export const passwordEncryption = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const secretpass = await bcrypt.hash(password, salt);

  return secretpass;
}

export const passwordCompare = async (password, secretpass) => {
  const chechPass = await bcrypt.compareSync(password, secretpass);
  return chechPass;
}

export const jwtTokenGenerator = async (id, email) => {
  const payload = {
    id, email
  };
  return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "12h"});
}

export const fileUpload = async (file) => {
  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET, 
  });
  let data = await cloudinary.uploader.upload(file).then(result => {
    return result;
  })
  return data.secure_url;
}