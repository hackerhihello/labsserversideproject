const express = require('express');
const { getAllRooms, createRoom, bookRoom } = require('../controllers/roomController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * api/rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []  # Define that this route requires authentication via bearer token
 *     responses:
 *       200:
 *         description: A list of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   building:
 *                     type: string
 *                   type:
 *                     type: string
 *                   capacity:
 *                     type: number
 *                   price:
 *                     type: number
 *                   available:
 *                     type: boolean
 *       401:
 *         description: Unauthorized - Invalid token
 *       403:
 *         description: Forbidden - Access denied
 */
router.get('/', authenticateToken, getAllRooms);

/**
 * @swagger
 * api/rooms:
 *   post:
 *     summary: Create a new room
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []  # Define that this route requires authentication via bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - building
 *               - type
 *               - capacity
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               building:
 *                 type: string
 *               type:
 *                 type: string
 *               capacity:
 *                 type: number
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Room created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized - Invalid token
 *       403:
 *         description: Forbidden - Access denied
 */
router.post('/', authenticateToken, createRoom);

/**
 * @swagger
 * api/rooms/book:
 *   post:
 *     summary: Book a room
 *     tags: [Room]
 *     security:
 *       - bearerAuth: []  # Define that this route requires authentication via bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *               - userId
 *               - startDate
 *               - endDate
 *             properties:
 *               roomId:
 *                 type: string
 *               userId:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Room booked successfully
 *       400:
 *         description: Room not available
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized - Invalid token
 *       403:
 *         description: Forbidden - Access denied
 */
router.post('/book', authenticateToken, bookRoom);

module.exports = router;
