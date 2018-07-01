import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  address: String,
  telephone: String,
  zipCode: String,
  state: String,
  city: String,
  login: String,
  password: String,
  userType: String,
});

export default mongoose.model('User', UserSchema);
