import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Note } from "../models/note.model.js";

const createNote = asyncHandler(async (req, res) => {
    const { title, content, tags } = req.body;

    // Validation
    if (!title || !title.trim()) {
        throw new ApiError(400, "Title is required");
    }

    if (!content || !content.trim()) {
        throw new ApiError(400, "Content is required");
    }

    const note = await Note.create({
        title: title.trim(),
        content: content.trim(),
        tags: tags || [],
        owner: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(201, note, "Note created successfully")
    );
});

const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ owner: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, notes, "Notes retrieved successfully")
    );
});

const getNoteById = asyncHandler(async (req, res) => {
    const { noteId } = req.params;

    const note = await Note.findById(noteId);

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    // Authorization check - owner only
    if (note.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Access denied");
    }

    return res.status(200).json(
        new ApiResponse(200, note, "Note retrieved successfully")
    );
});

const updateNote = asyncHandler(async (req, res) => {
    const { noteId } = req.params;
    const { title, content, tags } = req.body;

    // Get the note
    const note = await Note.findById(noteId);

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    // Authorization check - owner only
    if (note.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Access denied");
    }

    // Validation - at least one field required
    if (!title?.trim() && !content?.trim() && !tags) {
        throw new ApiError(400, "At least one field is required to update");
    }

    // Update fields if provided
    if (title?.trim()) {
        note.title = title.trim();
    }
    if (content?.trim()) {
        note.content = content.trim();
    }
    if (tags) {
        note.tags = tags;
    }

    const updatedNote = await note.save();

    return res.status(200).json(
        new ApiResponse(200, updatedNote, "Note updated successfully")
    );
});

const deleteNote = asyncHandler(async (req, res) => {
    const { noteId } = req.params;

    const note = await Note.findById(noteId);

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    // Authorization check - owner only
    if (note.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Access denied");
    }

    const deletedNote = await Note.findByIdAndDelete(noteId);

    return res.status(200).json(
        new ApiResponse(200, deletedNote, "Note deleted successfully")
    );
});

export {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
};
