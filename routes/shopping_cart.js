const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /shoppingdetails:
 *   get:
 *     tags:
 *       - "shoppingdetails"
 *     summary: Get shopping details
 *     responses:
 *       200:
 *         description: A list of shopping details
 */
router.get('/shoppingdetails', (req, res) => {
   return res.json({ mssg: "GET shopping details" });
});


module.exports = router;