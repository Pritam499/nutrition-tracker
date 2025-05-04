// src/controllers/reminderController.js
import {
    createReminderService,
    getRemindersService,
    updateReminderService,
    deleteReminderService
  } from '../../services/reminders/reminderService.js';
  
  export const createReminder = async (req, res) => {
    try {
      const reminder = await createReminderService(req.user.id, req.body);
      res.status(201).json(reminder);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  export const getReminders = async (req, res) => {
    try {
      const reminders = await getRemindersService(req.user.id);
      res.json(reminders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const updateReminder = async (req, res) => {
    try {
      const updated = await updateReminderService(req.params.id, req.body, req.user.id);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  export const deleteReminder = async (req, res) => {
    try {
      await deleteReminderService(req.params.id, req.user.id);
      res.status(204).end();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  