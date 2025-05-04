// src/services/aiService.js
import { UserFoodLog } from '../../models/userFoodLog.js';
import { Users } from '../../models/users.js';
import { Op } from 'sequelize';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const fetchAIMealSuggestions = async (userId) => {
  const user = await Users.findByPk(userId);

  if (!user) throw new Error('User not found');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const foodLogs = await UserFoodLog.findAll({
    where: {
      user_id: userId,
      logged_at: {
        [Op.gte]: today
      }
    }
  });

  const totalProtein = foodLogs.reduce((sum, f) => sum + f.protein, 0);
  const targetProtein = user.weight * 1.8;

  const prompt = `
You are a fitness meal expert AI.
The user weighs ${user.weight}kg, is trying to reach a goal of ${user.goal_weight}kg.
They have already consumed ${totalProtein}g protein today.
Recommend 3 high-protein meals with ingredients and estimated protein content to reach approx ${targetProtein}g protein in total.
Make it simple, balanced and real-life meals.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }]
  });

  return response.choices[0].message.content;
};
