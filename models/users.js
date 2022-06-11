const mongoose = require("mongoose")
const {Schema} = mongoose
const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    select: false
  },
  avatar_url: {
    type: String,
    default: ""
  },
  headline: {
    type: String,
    default: '介绍下自己吧...'
  },
})

module.exports = mongoose.model('Users', userSchema)