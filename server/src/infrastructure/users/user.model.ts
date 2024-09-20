import {Schema, model} from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  scopeId: { type: Schema.Types.ObjectId, ref: 'Scope', required: true },
  createdAt: { type: Date, required: true },
  createdBy: { type: String, required: true },
  updatedAt: { type: Date, required: false },
  updatedBy: { type: String, required: false },
  deletedAt: { type: Date, required: false },
});


const UserModel = model('User', userSchema);

export {  UserModel };


