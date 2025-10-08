import { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: "", content: "", tags: "" });
  const [filterTag, setFilterTag] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/api/notes"; // ⚙️ your backend URL

  // 🧠 Fetch notes from MongoDB
  const fetchNotes = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ➕ Add a new note
  const addNote = async () => {
    if (note.title.trim() && note.content.trim()) {
      try {
        const newNote = {
          title: note.title,
          content: note.content,
          tags: note.tags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t !== ""),
        };

        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newNote),
        });

        const savedNote = await res.json();
        setNotes([savedNote, ...notes]);
        setNote({ title: "", content: "", tags: "" });
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  // ❌ Delete a note
  const deleteNote = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setNotes(notes.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // 🎯 Filter notes by tag
  const filteredNotes = filterTag
    ? notes.filter((n) => n.tags.includes(filterTag))
    : notes;

  // 🧹 Clear tag filter
  const clearFilter = () => setFilterTag("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-200 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="flex items-center gap-3 mb-8">
          <span className="text-4xl">📝</span>
          <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
            Notes Keeper
          </h1>
        </header>

        {/* Filter Bar */}
        {filterTag && (
          <div className="mb-4 flex items-center gap-2">
            <p className="text-gray-700">
              Showing notes tagged with{" "}
              <span className="font-semibold text-yellow-700">#{filterTag}</span>
            </p>
            <button
              onClick={clearFilter}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Note Form */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6 hover:shadow-xl transition-all">
          <input
            type="text"
            placeholder="Note Title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            className="w-full mb-3 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
          <textarea
            placeholder="Note Content"
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
            className="w-full mb-3 border border-gray-300 rounded-lg p-2 h-24 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Tags (comma separated, e.g. work, personal)"
            value={note.tags}
            onChange={(e) => setNote({ ...note, tags: e.target.value })}
            className="w-full mb-3 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
          <button
            onClick={addNote}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold transition-all"
          >
            Add Note
          </button>
        </div>

        {/* Notes Display */}
        {loading ? (
          <p className="text-center text-gray-500">Loading notes...</p>
        ) : filteredNotes.length === 0 ? (
          <p className="text-gray-600 italic text-center">
            No notes yet. Add one!
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredNotes.map((n) => (
              <div
                key={n._id}
                className="bg-white shadow-md rounded-xl p-4 border-l-4 border-yellow-400 relative hover:shadow-lg transition-all"
              >
                {/* Delete button */}
                <button
                  onClick={() => deleteNote(n._id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-all"
                  title="Delete note"
                >
                  ❌
                </button>
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {n.title}
                </h3>
                <p className="text-gray-700 mb-3">{n.content}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {n.tags.map((tag, tIndex) => (
                    <span
                      key={tIndex}
                      onClick={() => setFilterTag(tag)}
                      className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full cursor-pointer hover:bg-yellow-200 transition-all"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Timestamp */}
                <p className="text-xs text-gray-400 mt-3">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
