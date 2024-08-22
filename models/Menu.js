const mongoose = require('mongoose')


const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  taste:{
    type: String,
    enum:['sweet','spicy','sour'],
    required:true
  },
  is_drink:{
    type: Boolean,
    default:false
  },
  ingredients:{
    type:[String],
    default:[]
  },
  num_sales:{
    type:Number,
    default:0
  }
})

// Create a model using the schema
const Menu = mongoose.model('Menu', MenuSchema); // Corrected 'person' to 'Person' to follow convention

// Export the model
module.exports = Menu;
