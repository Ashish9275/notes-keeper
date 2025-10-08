import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String], // 🏷️ Array of tag names
      default: [],
    },
  },
  { timestamps: true } // 🕒 Adds createdAt & updatedAt
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
