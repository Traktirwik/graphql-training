import { User } from '../../models/User';
import { IUser, IUserUpdate } from '../../utils/interfaces';
import ApiError from '../../utils/error-handler/api-error';

const getAllUsers = (): Promise<User[]> => {
  return User.findAll();
};

const getUserById = (id: number): Promise<User | null> => {
  return User.findByPk(id);
};

const updateUserById = async (
  id: number,
  params: IUserUpdate
): Promise<IUser> => {
  const [rowCount, userUpdated] = await User.update(params, {
    where: { id },
    returning: true,
  });
  if (!rowCount) {
    throw ApiError.BadRequest('user was not updated');
  }
  return userUpdated[0];
};

const deleteUserById = async (id: number): Promise<boolean> => {
  const deleteUser = await User.destroy({ where: { id } });
  return !!deleteUser;
};

export default {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
