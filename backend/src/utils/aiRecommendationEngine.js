// src/utils/aiRecommendationEngine.js
// Simple Linear Regression based protein recommendation

// export const recommendProteinIntake = ({ weight, age, gender, activity_level, fitness_goal }) => {
//     // Base protein per kg
//     let baseProtein = 1.2; // Sedentary default
  
//     if (activity_level === 'active') baseProtein = 1.5;
//     if (activity_level === 'athlete') baseProtein = 1.8;
  
//     // Adjust by fitness goal
//     if (fitness_goal === 'muscle_gain') baseProtein += 0.4;
//     if (fitness_goal === 'fat_loss') baseProtein -= 0.2;
  
//     // Gender adjustment (example: males slightly higher base metabolism)
//     if (gender === 'male') baseProtein += 0.1;
  
//     // Final Protein Requirement
//     const recommendedProtein = Math.round(weight * baseProtein); // grams/day
//     return recommendedProtein;
//   };
  
// export const recommendProteinIntake = ({ weight, goal_weight, age, gender, activity_level, fitness_goal }) => {
  
//     let baseProtein = 1.2; // Sedentary default
  
//     if (activity_level === 'active') baseProtein = 1.5;
//     if (activity_level === 'athlete') baseProtein = 1.8;
  
//     if (fitness_goal === 'muscle_gain') baseProtein += 0.3;
//     if ((goal_weight && goal_weight < weight) || (fitness_goal === 'fat_loss')) baseProtein -= 0.1;
  
//     if (gender === 'male') baseProtein += 0.1;
  
//     if (age && age > 50) baseProtein += 0.2; // Elderly people need more protein
  
//     const recommendedProtein = Math.ceil(weight * baseProtein); // grams/day
//     return recommendedProtein;
//   };
  

// src/utils/aiRecommendationEngine.js

export const recommendProteinIntake = ({
  weight,
  age,
  gender,
  activity_level,
  fitness_goal,
  goal_weight,
  height,
}) => {
  // Show the first popup with a message to the user
  // alert("Please provide the correct profile details to get the best AI-recommended result. Otherwise, the result might not be accurate.");

  let baseProtein = weight * 1.6; // Default: 1.6g of protein per kg of body weight

  // Age-specific adjustments:
  if (age >= 0 && age <= 1) {
    // Baby (0-1 years)
    baseProtein = weight * 2.2; // Babies need more protein, ~2.2g per kg of weight
  } else if (age > 1 && age <= 3) {
    // Toddler (1-3 years)
    baseProtein = weight * 2.0; // Toddlers need ~2g per kg of weight
  } else if (age > 3 && age <= 10) {
    // Child (3-10 years)
    baseProtein = weight * 1.8; // Children need around 1.8g per kg of weight
  } else if (age > 10 && age <= 19) {
    // Adolescent (10-19 years)
    baseProtein = weight * 1.7; // Adolescents need around 1.7g per kg of weight
  } else if (age > 19 && age <= 39) {
    // Early Adulthood (20-39 years)
    baseProtein = weight * 1.6; // Early adults need around 1.6g per kg of weight (same as default)
  } else if (age > 39 && age <= 59) {
    // Middle Adulthood (40-59 years)
    baseProtein = weight * 1.5; // Middle-aged adults may need slightly less protein (~1.5g per kg of weight)
  } else if (age > 59 && age <= 79) {
    // Senior Adult (60-79 years)
    baseProtein = weight * 1.4; // Seniors may need a bit less protein (~1.4g per kg of weight)
  } else if (age >= 80) {
    // Super Senior (80+ years)
    baseProtein = weight * 1.3; // Super seniors may need around 1.3g per kg of weight
  }

  console.log('Age Specific Protein Intake:', baseProtein);

  // Adjust protein based on activity level
  if (activity_level === 'active') baseProtein *= 1.1; // Slightly higher for active people
  if (activity_level === 'athlete') baseProtein *= 1.25; // Much higher for athletes

  console.log('Activity Level Protein Intake:', baseProtein);

  // Smart correction for user mistakes in goal weight
  if (fitness_goal === 'muscle_gain') {
    if (goal_weight && goal_weight > weight) {
      // Proper muscle gain goal: higher protein intake if goal weight is greater
      baseProtein += 0.35 * weight; // Increase protein by 35% of current weight
    } else {
      // If goal weight is incorrectly set lower, still treat as muscle gain
      baseProtein += 0.25 * weight; // Increase protein by 25% of current weight
    }
  } else if (fitness_goal === 'fat_loss') {
    if (goal_weight && goal_weight < weight) {
      // Proper fat loss goal: less protein if goal weight is lower
      baseProtein -= 0.15 * weight; // Decrease protein by 15% of current weight
    } else {
      // If goal weight is wrongly higher, still treat as fat loss
      baseProtein -= 0.10 * weight; // Decrease protein by 10% of current weight
    }
  } else if (fitness_goal === 'maintenance') {
    // No change in base protein for maintenance
  }

  console.log('Fitness Goal Weight Goal Protein Intake:', baseProtein);

  // **Height Adjustment**: Taller individuals typically require more protein
  if (height && height > 180) {
    baseProtein *= 1.05; // +5% for taller individuals (180cm and above)
  } else if (height && height < 160) {
    baseProtein *= 0.95; // -5% for shorter individuals (below 160cm)
  }

  console.log('Height Adjustment Protein Intake:', baseProtein);

  // **Additional Factors**:
  // - Increase protein for older individuals (age > 50)
  if (age && age > 50) {
    baseProtein += 0.2 * weight; // Increase protein by 20% for elderly
  }

  console.log('Age and Weight Adjustment Protein Intake:', baseProtein);

  // - Gender-based adjustment (males generally need more protein)
  if (gender === 'male') {
    baseProtein += 0.1 * weight; // Add 10% more protein for males
  }

  console.log('Gender Adjustment Protein Intake:', baseProtein);

  // **More Detailed Factors for Enhanced Accuracy**:
  // Additional correction for body composition and muscle mass (if available)
  if (fitness_goal === 'muscle_gain' && age < 25) {
    baseProtein += 0.15 * weight; // Younger individuals may need more for muscle growth
  }
  
  console.log('Additional Factors muscle_gain Protein Intake:', baseProtein);

  // Smart upper and lower bound capping for extreme cases (prevents overly high/low recommendations)
  if (baseProtein < weight * 1.2) {
    baseProtein = weight * 1.2; // Minimum recommended protein is 1.2g per kg of weight
  }
  if (baseProtein > weight * 3.0) {
    baseProtein = weight * 3.0; // Maximum safe protein intake is 3g per kg of weight
  }

  console.log('Smart Capping Protein Intake:', baseProtein);

  // Calculate the final protein recommendation
  const recommendedProtein = Math.round(baseProtein); // Round to nearest whole number for ease

  // Returning the recommendation, which can be displayed in the Dashboard
  return recommendedProtein;
};
