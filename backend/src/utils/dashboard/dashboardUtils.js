// src/utils/dashboard/dashboardUtils.js

export const calculateMacros = (user, foodLogs) => {
    const { protein, fat, carbs } = foodLogs.reduce(
      (acc, log) => ({
        protein: acc.protein + log.protein,
        fat: acc.fat + log.fat,
        carbs: acc.carbs + log.carbs
      }),
      { protein: 0, fat: 0, carbs: 0 }
    );
  
    const recommendedProtein = user.weight * 1.8;
    const recommendedCalories = calculateTDEE(user);
  
    return {
      consumed: { protein, fat, carbs },
      recommended: {
        protein: recommendedProtein,
        calories: recommendedCalories
      }
    };
  };
  
  export const calculateTDEE = (user) => {
    const BMR = 10 * user.weight + 6.25 * user.height - 5 * user.age + (user.gender === 'male' ? 5 : -161);
    const activityMultiplier = 1.55; // Moderate activity
    return Math.round(BMR * activityMultiplier);
  };
  
  export const suggestAITips = (user, foodLogs) => {
    const macros = calculateMacros(user, foodLogs);
  
    const tips = [];
  
    if (macros.consumed.protein < macros.recommended.protein * 0.8) {
      tips.push('Increase your protein intake – add eggs, chicken, or legumes.');
    }
  
    if (macros.consumed.fat > 80) {
      tips.push('Reduce fat intake – avoid fried foods and processed snacks.');
    }
  
    if (macros.consumed.carbs > 250) {
      tips.push('Cut down on carbs – reduce sugar and white bread.');
    }
  
    if (macros.consumed.protein > macros.recommended.protein) {
      tips.push('Great protein intake today – keep it up!');
    }
  
    return tips;
  };
  