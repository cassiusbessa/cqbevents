import { genSaltSync, hashSync, compare } from 'bcrypt';

export default {
  encryptPassword: (password: string) => {
    const salt = genSaltSync(5);
    const encryptedPassword = hashSync(password, salt);
    return encryptedPassword;
  },
  comparePassword: async (pass: string, encrypted: string) => compare(pass, encrypted),
};
