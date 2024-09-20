import mongoose from "mongoose";
import {ScopeNames} from "@domain/entities/scopes/scope-enum";

const { Schema } = mongoose;

const scopeSchema = new Schema({
    name: {
        type: String,
        enum: Object.values(ScopeNames), 
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
});

// Create the model
const ScopeModel = mongoose.model('Scope', scopeSchema);

export { ScopeModel };
