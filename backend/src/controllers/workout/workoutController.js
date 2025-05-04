import {
    logWorkoutService,
    getWorkoutHistoryService,
  } from '../../services/workout/workoutService.js';
  import generateResponse from '../../utils/generateResponse.js';
  
  export const logWorkoutController = async (req, res) => {
    try {
      const workout = await logWorkoutService(req.user.userId, req.body);
      res.status(201).json(generateResponse(true, workout, 'Workout logged successfully'));
    } catch (err) {
      res.status(400).json(generateResponse(false, {}, 'Failed to log workout', err.message));
    }
  };
  
  export const getWorkoutHistoryController = async (req, res) => {
    try {
      const history = await getWorkoutHistoryService(req.user.userId);
      res.status(200).json(generateResponse(true, history, 'Workout history'));
    } catch (err) {
      res.status(400).json(generateResponse(false, {}, 'Failed to fetch workout history', err.message));
    }
  };
  