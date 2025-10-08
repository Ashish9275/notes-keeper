import { useState, useEffect } from "react";

export default function NoteForm({ onSave, selectedNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [selectedNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow-md mb-4">
      <input
        className="border p-2 rounded-md w-full mb-2"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="border p-2 rounded-md w-full mb-2"
        placeholder="Note Content"
        rows="3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
        {selectedNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}
