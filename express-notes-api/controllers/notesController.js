const { readNotes, writeNotes } = require("../utils/fileOps");

// get: fetch all notes
const getAllNotes = async (req, res, next) => {
  try {
    const notes = await readNotes();
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// get: fetch note by id
const getNoteById = async (req, res, next) => {
  try {
    const notes = await readNotes();
    const noteId = parseInt(req.params.id);
    const note = notes.find((n) => n.id === noteId);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    next(err);
  }
};

// post: create note
const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const notes = await readNotes();
    const newNotes = {
      id: Date.now(),
      title,
      content,
    };
    notes.push(newNotes);
    await writeNotes(notes);
  } catch (error) {
    next(error);
  }
};

// put: update note
const updateNote = async (req, res, next) => {
  try {
    const noteId = parseInt(req.params.id);
    const { title, content } = req.body;
    const notes = await readNotes();
    const index = notes.findIndex((n) => n.id === noteId);
    if (index === -1) return res.status(404).json({ error: "Note not found" });
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    notes[index] = { id: noteId, title, content };
    await writeNotes(notes);
    res.json(notes[index]);
  } catch (error) {
    next(error);
  }
};

// delete: delete note
const deleteNote = async (req, res, next) => {
  try {
    const noteId = parseInt(req.params.id);
    const notes = await readNotes();
    const note = notes.filter((n) => n.id !== noteId);
    if (notes.length === note.length)
      return res.status(404).json({ error: "Note not found!" });
    await writeNotes(note);
    res.json({ message: "Note deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
