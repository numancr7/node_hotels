const mongoose = require("mongoose");

// Define the schema for the person collection
const personSchema = new mongoose.Schema({ // Corrected mongoose.schema to mongoose.Schema
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  work: {
    type: String,
    enum: ['chef', 'waiter', 'manager'], // Enum values should be lowercase for consistency
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String
  },
  salary: {
    type: Number,
    required: true
  }
});

// Create a model using the schema
const Person = mongoose.model('Person', personSchema); // Corrected 'person' to 'Person' to follow convention

// Export the model
module.exports = Person;
