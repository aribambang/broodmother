import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password.toString(), salt);
  } catch (err) {
    throw new Error(err);
  }
};

export const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
