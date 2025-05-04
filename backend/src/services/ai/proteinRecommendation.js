// src/services/aiRecommendationService.js
import { Users } from '../../models/users.js';
import { recommendProteinIntake } from '../../utils/aiRecommendationEngine.js';

export const fetchUserProteinRecommendation = async (userId) => {
  const user = await Users.findByPk(userId);

  if (!user) throw new Error('User not found');

  // Check if important fields are filled
  const { weight, age, gender, activity_level, fitness_goal } = user;

  if (!weight || !age || !gender || !activity_level || !fitness_goal) {
    throw new Error('Incomplete profile. Please update your weight, age, gender, activity level, and fitness goal.');
  }

  const recommendedProtein = recommendProteinIntake({
    weight,
    age,
    gender,
    activity_level,
    fitness_goal,
  });

  return {
    recommendedProtein,
    message: `Your daily protein goal is ${recommendedProtein}g`,
  };
};
