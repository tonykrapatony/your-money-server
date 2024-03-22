import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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