import express from "express";
import { upload } from "../config/fileUpload.ts";
import { projectController } from "../controllers/project.controller.ts";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]),
  projectController.create
);

router.get("/", projectController.getAll);

router.get("/:id", projectController.getById);

router.put(
  "/:id",
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]),
  projectController.update
);

router.delete("/:id", projectController.delete);

export default router;