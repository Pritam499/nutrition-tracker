// src/services/auth/updateProfileService.js
import { Users } from '../../models/users.js';

const updateProfileService = async (userId, updateData) => {
  const user = await Users.findByPk(userId);
  if (!user) throw new Error('User not found');

  await user.update(updateData);
  return { id: user.id, name: user.name, email: user.email, ...updateData };
};

export default updateProfileService;
