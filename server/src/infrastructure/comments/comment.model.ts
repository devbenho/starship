import mongoose, { Schema, Document, Types } from 'mongoose';


const CommentSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId,ref: 'User', required: true },
    text: { type: String, required: true },
    starshipId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId,ref:'User',  required: true },
    updatedBy: { type: Schema.Types.ObjectId,ref:'User', required: false },
});

const CommentModel = mongoose.model('Comment', CommentSchema);

export { CommentModel };