import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        content: {
            type: String,
            required: true
        },
        tags: {
            type: [String],
            default: []
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        }
    },
    {
        timestamps: true
    }
);

export const Note = mongoose.model("Note", noteSchema);
