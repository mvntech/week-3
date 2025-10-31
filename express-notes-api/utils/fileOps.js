const fs = require("fs/promises");
const path = require("path");

const notesFilePath = path.join(__dirname, "../data/notes.json");

async function readNotes() {
  const data = await fs.readFile(notesFilePath, "utf-8");
  return JSON.parse(data);
}

async function writeNotes(notes) {
  await fs.writeFile(notesFilePath, JSON.stringify(notes, null, 2));
}

module.exports = { readNotes, writeNotes };
