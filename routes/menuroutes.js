const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Menu = require('../models/Menu');

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new Menu(data);
    const response = await newMenu.save();
    console.log("Data saved:", response);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error saving data:", error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Menu.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:taste', async (req, res) => {
  try {
    const taste = req.params.taste; // Corrected from workType to taste
    if (['sweet', 'spicy', 'sour'].includes(taste)) {
      const response = await Menu.find({ taste: taste });
      console.log('Response fetched');
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste type" });
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// PUT route to update a menu by ID
router.put('/:id', async (req, res) => {
  try {
    const menuId = req.params.id;
    const updatedmenuData = req.body;

    console.log("Updating menu with ID:", menuId);
    console.log("New data:", updatedmenuData);

    // Mistake: Ensure 'menuId' is a valid MongoDB ObjectId, or the query will fail silently.
    const response = await Menu.findByIdAndUpdate(menuId, updatedmenuData, {
      new: true,  // Return the updated document
      runValidators: true  // Run schema validators on the update
    });

    if (!response) {
      // Mistake: The menu might not be found due to an invalid ID or if they don't exist in the database.
      return res.status(404).json({ error: "menu not found" });
    }

    console.log('Data Updated:', response);
    res.status(200).json(response);
  } catch (error) {
    // Mistake: The error message here is generic. Logging the full error might help in debugging.
    console.error("Error updating data:", error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.delete('/:id', async(req, res) => {
  try {
    const menuId = req.params.id;

    const response = await Menu.findByIdAndRemove(menuId);

    if (!response) {
      // Mistake: The menu might not be found due to an invalid ID or if they don't exist in the database.
      return res.status(404).json({ error: "menu not found" });
    }
    console.log('Data deleted:');
    res.status(200).json({message: 'menu deleted successfully'});

  } catch (error) {
    console.error("Error updating data:", error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = router;
