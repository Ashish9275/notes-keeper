import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// ✅ Create a new note (supports tags)
router.post("/", async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    // Clean up tags (if provided)
    const cleanTags = Array.isArray(tags)
      ? tags.map((t) => t.trim()).filter((t) => t !== "")
      : [];

    const newNote = new Note({ title, content, tags: cleanTags });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get all notes (newest first)
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Update a note (supports tags)
router.put("/:id", async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const cleanTags = Array.isArray(tags)
      ? tags.map((t) => t.trim()).filter((t) => t !== "")
      : [];

    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, tags: cleanTags },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Delete a note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
