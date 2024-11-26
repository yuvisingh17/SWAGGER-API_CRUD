const express = require('express');
const router = express.Router();

 
app.get('/user', (req, res) => {
  res.json({
    username: 'johndoe',
    email: 'john.doe@example.com',
  });
});

// Define API endpoints
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user info
 *     security:
 *       - OAuth2: [read]
 *     responses:
 *       200:
 *         description: Successfully retrieved user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 */
app.get('/user', (req, res) => {
  res.json({
    username: 'johndoe',
    email: 'john.doe@example.com',
  });
});

/**
 * @swagger
 * /workouts:
 *   get:
 *     tags:
 *       - "workouts"
 *     security:
 *       - BearerAuth: "lion"
 *     summary: Get all workouts
 *     responses:
 *       200:
 *         description: A list of workouts
 * components:
 *   securitySchemes:
 *     basicAuth:
 *       type: http
 *       scheme: basic
 */
router.get('/', (req, res) => {
    res.json({ mssg: "GET all workout" });
});
