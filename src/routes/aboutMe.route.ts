import express from "express";
import { upload } from "../config/fileUpload.ts";
import { aboutMeController } from "../controllers/aboutMe.controller.ts";

const router = express.Router();

router.get("/", aboutMeController.get);

router.put(
  "/",
  upload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'gallery', maxCount: 20 }
  ]),
  aboutMeController.update
);

export default router;