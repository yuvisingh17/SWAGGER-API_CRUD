const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /workouts:
 *   get:
 *     tags:
 *       - "workouts"
 *     summary: Get all workouts
 *     responses:
 *       200:
 *         description: A list of workouts
 */
router.get('/', (req, res) => {
  res.json({ mssg: "GET all workouts" });
});

/**
 * @swagger
 * /workouts/{id}:
 *   get:
 *     tags:
 *       - "workouts"
 *     summary: Get a single workout by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The workout ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single workout
 */
router.get('/:id', (req, res) => {
  res.json({ msg: "GET a single workout" });
});

/**
 * @swagger
 * /workouts/india/{id}:
 *   get:
 *     tags:
 *       - "workouts"
 *     summary: Get two workouts by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The workout ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Two workouts
 */
router.get('/india/:id', (req, res) => {
  res.json({ msg: "GET two workouts" });
});

/**
 * @swagger
 * /workouts:
 *   post:
 *     tags:
 *       - "workouts"
 *     summary: Create a new workout
 *     responses:
 *       201:
 *         description: The created workout
 */
router.post('/', (req, res) => {
  res.json({ mssg: "POST a new workout" });
});

/**
 * @swagger
 * /workouts/{id}:
 *   delete:
 *     tags:
 *       - "workouts"
 *     summary: Delete a workout by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The workout ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Workout deleted
 */
router.delete('/:id', (req, res) => {
  res.json({ mssg: "DELETE a workout" });
});

/**
 * @swagger
 * /workouts/{id}:
 *   patch:
 *     tags:
 *       - "workouts"
 *     summary: Update a workout by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The workout ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The updated workout
 */
router.patch('/:id', (req, res) => {
  res.json({ mssg: "UPDATE a workout" });
});


//get all workouts
/**
 * @swagger
 * /workouts:
 *   get:
 *     tags:
 *       - "workouts"
 *     summary: Get all workouts
 *     description: Returns a list of all workout objects
 *     responses:
 *       200:
 *         description: A list of workout objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 
 */
router.get('/', (req,res) => {
  res.json({mssg:"GET all workout"})
})

//GET a single workout
router.get('/:id',(req,res) => {
  res.json({msg:"GET a single workout"})

})
//GET two workouts
router.get('/india/:id',(req,res) => {
  res.json({msg:"GET two  workouts"})

})
//POST a workout
router.post('/',(req,res) => {
  res.json({mssg:"POST a  new workout"})
})
//DELETE a workout
router.delete('/:id',(req,res) => {
  res.json({mssg:"DELETE a  workout"})
})
//UPDATE a workout
router.patch('/:id',(req,res) => {
  res.json({mssg:"UPDATE a workout"})
})

//POST a workout
router.post('/',(req,res) => {
  res.json({mssg:"POST a workout"})
})

module.exports = router