// import { Food } from '../../models/food.js';
// import { Op } from 'sequelize';

// export const recommendFoodsByNutrient = async (nutrient, limit, maxCalories) => {
//   const whereClause = {
//     [`nutrients.${nutrient}`]: { [Op.gt]: 0 }
//   };

//   if (maxCalories) {
//     whereClause['nutrients.energy'] = { [Op.lte]: parseFloat(maxCalories) };
//   }

//   return await Food.findAll({
//     where: whereClause,
//     attributes: ['fdc_id', 'description', 'nutrients'],
//     limit ,
//     order: [[`nutrients.${nutrient}`, 'DESC']]
//   });
// };

import { Food } from '../../models/food.js';
import { Op, literal } from 'sequelize';

export const recommendFoodsByNutrient = async (nutrientName, limit = 10, maxCalories) => {
  const conditions = [];

  // Match nutrient in JSONB array with amount > 0
  conditions.push(
    literal(`
      EXISTS (
        SELECT 1 FROM jsonb_array_elements(nutrients) elem
        WHERE elem->>'nutrient_name' ILIKE '${nutrientName}'
        AND (elem->>'amount')::float > 0
      )
    `)
  );

  if (maxCalories) {
    conditions.push(
      literal(`
        EXISTS (
          SELECT 1 FROM jsonb_array_elements(nutrients) elem
          WHERE elem->>'nutrient_name' ILIKE 'Energy'
          AND (elem->>'amount')::float <= ${parseFloat(maxCalories)}
        )
      `)
    );
  }

  return await Food.findAll({
    where: {
      [Op.and]: conditions,
    },
    attributes: ['fdc_id', 'description', 'nutrients'],
    limit,
  });
};
