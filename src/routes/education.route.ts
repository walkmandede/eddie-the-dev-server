import express from "express";
import { educationController } from "../controllers/education.controller.ts";

const router = express.Router();

router.post("/", educationController.create);

router.get("/", educationController.getAll);

router.get("/:id", educationController.getById);

router.put("/:id", educationController.update);

router.delete("/:id", educationController.delete);


export default router;