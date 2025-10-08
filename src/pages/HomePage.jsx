import { useState, useEffect } from "react";
import axios from "axios";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const API_URL = "http://localhost:5000/api/notes"; // ⚡ update if backend runs on different port

  // 🟢 Fetch all notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get(API_URL);
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // 🟢 Add or update a note
  const handleSave = async (noteData) => {
    try {
      if (selectedNote) {
        await axios.put(`${API_URL}/${selectedNote._id}`, noteData);
        setSelectedNote(null);
      } else {
        await axios.post(API_URL, noteData);
      }
      fetchNotes();
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  // 🟢 Edit handler
  const handleEdit = (note) => {
    setSelectedNote(note);
  };

  // 🟢 Delete handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-yellow-800">
        📝 Notes Keeper
      </h1>

      <div className="max-w-2xl mx-auto">
        <NoteForm onSave={handleSave} selectedNote={selectedNote} />

        <div className="grid gap-4">
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">No notes yet. Add one!</p>
          )}
        </div>
      </div>
    </div>
  );
}
