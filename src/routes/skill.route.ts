import express from "express";
import { skillController } from "../controllers/skill.controller.ts";

const router = express.Router();

router.post("/", skillController.create);

router.get("/", skillController.getAll);

router.get("/:id", skillController.getById);

router.put("/:id", skillController.update);

router.delete("/:id", skillController.delete);


export default router;