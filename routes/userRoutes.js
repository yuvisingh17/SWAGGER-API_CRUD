const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get("/user", (req, res) => {
  res.json([{ id: "1", name: "John Doe" }]);
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a specific user
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single user
 */
router.get("/user/:id", (req, res) => {
  res.json({ id: req.params.id, name: "John Doe" });
});

module.exports = router;
