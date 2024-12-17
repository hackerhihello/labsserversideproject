const Room = require('../models/Room');
const User = require('../models/User');
const Booking = require('../models/Booking');

// Create a new room
exports.createRoom = async (req, res) => {
  const { name, building, type, capacity, price } = req.body;

  try {
    const room = new Room({ name, building, type, capacity, price });
    await room.save();
    res.status(201).json({ message: 'Room created successfully', room });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find(); // Fetch all rooms from the database
    if (rooms.length === 0) {
      return res.status(404).json({ message: 'No rooms found' });
    }
    res.status(200).json({ rooms });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Book a room
exports.bookRoom = async (req, res) => {
  const { roomId, startDate, endDate, userId } = req.body;

  try {
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check room availability
    const isAvailable = room.availability;
    if (!isAvailable) return res.status(400).json({ message: 'Room not available' });

    const newBooking = new Booking({
      userId,
      roomId,
      roomName: room.name,
      roomType: room.type,
      roomCapacity: room.capacity,
      startDate,
      endDate,
      price: room.price,
      status: 'booked',
    });

    await newBooking.save();
    res.status(200).json({ message: 'Room booked successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
