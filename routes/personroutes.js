const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Person = require('../models/person');

// POST route to add a person
router.post('/', async (req, res) => {
  try {
    const data = req.body;

    // Potential Mistake: Ensure that 'data' includes all required fields according to the Person model schema
    const newPerson = new Person(data);

    const response = await newPerson.save();

    console.log("Data saved:", response);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error saving data:", error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route to fetch all persons
router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    
    console.log("Data fetched");

    // Potential Improvement: Check if 'data' is empty and respond accordingly
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET route to fetch persons by work type
router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;

    // Mistake: The validation only allows specific work types. Ensure the database uses the exact same strings.
    if (['chef', 'manager', 'waiter'].includes(workType)) {
      const response = await Person.find({ work: workType });

      console.log('Response fetched');

      // Potential Improvement: Check if 'response' is empty and respond accordingly
      res.status(200).json(response);
    } else {
      // Mistake: This error message might be unclear. Consider specifying the valid work types in the error message.
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT route to update a person by ID
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    console.log("Updating person with ID:", personId);
    console.log("New data:", updatedPersonData);

    // Mistake: Ensure 'personId' is a valid MongoDB ObjectId, or the query will fail silently.
    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,  // Return the updated document
      runValidators: true  // Run schema validators on the update
    });

    if (!response) {
      // Mistake: The person might not be found due to an invalid ID or if they don't exist in the database.
      return res.status(404).json({ error: "Person not found" });
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
    const personId = req.params.id;

    const response = await Person.findByIdAndRemove(personId);

    if (!response) {
      // Mistake: The person might not be found due to an invalid ID or if they don't exist in the database.
      return res.status(404).json({ error: "Person not found" });
    }
    console.log('Data deleted:');
    res.status(200).json({message: 'person deleted successfully'});

  } catch (error) {
    console.error("Error updating data:", error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
module.exports = router;
