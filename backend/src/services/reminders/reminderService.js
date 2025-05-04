// src/services/reminderService.js
import { Reminder } from '../../models/reminders.js';

export const createReminderService = async (userId, data) => {
  return await Reminder.create({ ...data, user_id: userId });
};

export const getRemindersService = async (userId) => {
  return await Reminder.findAll({ where: { user_id: userId } });
};

export const updateReminderService = async (id, data, userId) => {
  const reminder = await Reminder.findOne({ where: { id, user_id: userId } });
  if (!reminder) throw new Error('Reminder not found');
  return await reminder.update(data);
};

export const deleteReminderService = async (id, userId) => {
  const reminder = await Reminder.findOne({ where: { id, user_id: userId } });
  if (!reminder) throw new Error('Reminder not found');
  return await reminder.destroy();
};
