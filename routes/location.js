const express = require('express');
const router = express.Router();


/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user information
 *     security:
 *       - OAuth2: [read]  # Require read scope for this endpoint
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
router.get('/user', (req, res) => {
  res.json({
    username: 'john_doe',
    email: 'john.doe@example.com',
  });
});

module.exports = router;
//faridabad location

/**
 * @swagger
 * /faridabad:
 *   get:
 *     tags:
 *       - "location"
 *     summary: Get location  details
 *     responses:
 *       200:
 *         description: A list of shopping details
 */

router.get('/faridabad', (req, res) => {
    res.json({ mssg: "GET faridabad location" });
});
/**
 * @swagger
 * /delhi:
 *   get:
 *     tags:
 *       - "location"
 *     summary: Get delhi location  details
 *     responses:
 *       200:
 *         description: get the delhi location
 */

//delhi location
router.get('/delhi', (req, res) => {
    res.json({ mssg: "GET delhi location" });
});
/**
 * @swagger
 * /noida:
 *   get:
 *     tags:
 *       - "location"
 *     summary: Get noida location  details
 *     responses:
 *       200:
 *         description: get the noida location
 */



//noida location
router.get('/noida', (req, res) => {
    res.json({ mssg: "GET noida location" });
});

/**
 * @swagger
 * /newlocation:
 *   post:
 *     tags:
 *       - "location"
 *     summary: Get location  details
 *     responses:
 *       200:
 *         description: get the  location
 */


//POST a new location
router.post("/",(req,res) =>{
    res.json({mssg:"POST a new location"});
});

/**
 * @swagger
 * /newlocation:
 *   put:
 *     tags:
 *       - "location"
 *     summary: PUT location  details
 *     responses:
 *       200:
 *         description: PUT the  location
 */

//put a new location
router.put("/",(req,res)=>{
    res.json({mssg:"PUT a new location"});
});

//delete
router.delete("/delete",(req,res)=>{
    res.json({mssg:"DELETE a new location"});
});
//connect
router.connect("/connect",(req,res)=>{
    res.json({mssg: "CONNECT a new location"});
});


module.exports = router;