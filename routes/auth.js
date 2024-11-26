const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportJWT = require('passport-jwt');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user and return a JWT token
 *     description: This endpoint authenticates a user by validating credentials and returns a JWT token for subsequent requests.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: 'user1'
 *               password:
 *                 type: string
 *                 example: 'password123'
 *     responses:
 *       200:
 *         description: Successful authentication, returns a JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *       401:
 *         description: Unauthorized, invalid credentials
 *       400:
 *         description: Bad request, missing or invalid input
 */
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
  
    // Simple validation for the example
    if (username === 'user1' && password === 'password123') {
      // Generate JWT token (for simplicity, no expiration here)
      const token = jwt.sign({ username }, SECRET_KEY);
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
  
  /**
   * @swagger
   * /auth/protected:
   *   get:
   *     summary: A protected route that requires authentication
   *     description: This endpoint is protected and requires a valid JWT token to access.
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Successfully accessed the protected route
   *       401:
   *         description: Unauthorized, invalid or missing token
   */
  app.get('/auth/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({ message: 'Protected content accessed successfully' });
  });
  
  // Passport JWT strategy for protected routes
  passport.use(new passport.Strategy(
    {
      jwtFromRequest: (req) => req.headers.authorization?.split(' ')[1], // Extract token from the 'Authorization' header
      secretOrKey: SECRET_KEY,
    },
    (payload, done) => {
      // In a real app, you would fetch the user from the database
      if (payload) {
        return done(null, payload);
      } else {
        return done(null, false);
      }
    }
  ));
  

module.exports = router;