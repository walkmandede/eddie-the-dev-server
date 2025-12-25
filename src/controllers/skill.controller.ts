import type { Request, Response } from "express";
import { skillService } from "../services/endpointServices/skill.service.ts";

export const skillController = {
  create: async (req: Request, res: Response) => {
    try {
      const education = await skillService.create(req.body);
      res.status(201).json({ 
        status: true, 
        message: "Skill created successfully",
        data: education 
      });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  },

  getAll: async (_req: Request, res: Response) => {
    try {
      const data = await skillService.getAll();
      res.json({ status: true, data });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const education = await skillService.getById(req.params.id);
      if (!education) {
        return res.status(404).json({ status: false, message: "Skill not found" });
      }
      res.json({ status: true, data: education });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const updated = await skillService.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ status: false, message: "Skill not found" });
      }
      res.json({ 
        status: true, 
        message: "Skill updated successfully",
        data: updated 
      });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const deleted = await skillService.delete(req.params.id);
      if (deleted) {
        res.json({ status: true, message: "Skill deleted successfully" });
      } else {
        res.status(404).json({ status: false, message: "Skill not found" });
      }
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  }
};