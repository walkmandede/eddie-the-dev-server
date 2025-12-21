import express from "express";
import { experienceController } from "../controllers/experience.controller.ts";

const router = express.Router();

router.post("/", experienceController.create);
router.get("/", experienceController.getAll);
router.get("/:id", experienceController.getById);
router.put("/:id", experienceController.update);
router.delete("/:id", experienceController.delete);

export default router;
