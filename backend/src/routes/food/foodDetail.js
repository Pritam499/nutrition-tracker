// // src/routes/food/foodDetails.js
// import express from 'express';
// import foodDetailsController from '../../controllers/food/foodDetailsController.js';

// const router = express.Router();

// router.get('/:fdc_id', foodDetailsController);

// export default router;

import express from 'express';
import { getFoodDetail } from '../../controllers/food/foodDetailsController.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { param, validationResult } from 'express-validator';
import generateResponse from '../../utils/generateResponse.js';

const router = express.Router();

router.get(
  '/:fdcId',
  authMiddleware,
  [param('fdcId').isNumeric().withMessage('Valid FDC ID is required')],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(generateResponse(false, {}, 'Validation failed', { errors: errors.array() }));
    }
    next();
  },
  getFoodDetail
);

export default router;
