import { User } from '../../models/User';
import { IUserCreate, ISignIn } from '../../utils/interfaces';
import bcrypt from 'bcrypt';
import ApiError from '../../utils/error-handler/api-error';
import { services } from './index';

const signUp = async (userData: IUserCreate): Promise<User> => {
  await services.validation.authValidation.validate(userData, {
    abortEarly: true,
  });

  const emailExist: User | null = await User.findOne({
    where: { email: userData.email },
    rejectOnEmpty: false,
  });
  if (emailExist) {
    throw ApiError.BadRequest('email already used');
  }

  if (userData.password !== userData.passwordCheck) {
    throw ApiError.BadRequest(`Password doesn't match with password check`);
  }
  userData.password = await bcrypt.hash(userData.password, 7);

  return await User.create(userData);
};

const signIn = async (args: ISignIn): Promise<User> => {
  await services.validation.authValidation.validate(args, { abortEarly: true });

  const user = await User.findOne({
    rejectOnEmpty: false,
    where: { email: args.email },
  });

  if (!user) {
    throw ApiError.BadRequest('Wrong email or password');
  }

  const validPassword = await bcrypt.compare(args.password, user.password);
  if (!validPassword) {
    throw ApiError.BadRequest('Wrong email or password');
  }

  return user;
};

export default {
  signIn,
  signUp,
};
