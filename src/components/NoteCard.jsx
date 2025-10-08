export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="bg-yellow-100 p-4 rounded-2xl shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
      <p className="text-gray-700">{note.content}</p>

      <div className="flex justify-end gap-2 mt-3">
        <button
          onClick={() => onEdit(note)}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
