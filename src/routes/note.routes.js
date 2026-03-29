import { Router } from "express";
import {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
} from "../controllers/note.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// All note routes require authentication
router.use(verifyJWT);

router.route("/").post(createNote).get(getNotes);

router.route("/:noteId").get(getNoteById).patch(updateNote).delete(deleteNote);

export default router;
