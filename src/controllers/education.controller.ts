import type { Request, Response } from "express";
import { educationService } from "../services/education.service.ts";

export const educationController = {
  create: async (req: Request, res: Response) => {
    try {
      const education = await educationService.create(req.body);
      res.status(201).json({ 
        status: true, 
        message: "Education created successfully",
        data: education 
      });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  },

  getAll: async (_req: Request, res: Response) => {
    try {
      const data = await educationService.getAll();
      res.json({ status: true, data });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const education = await educationService.getById(req.params.id);
      if (!education) {
        return res.status(404).json({ status: false, message: "Education not found" });
      }
      res.json({ status: true, data: education });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const updated = await educationService.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ status: false, message: "Education not found" });
      }
      res.json({ 
        status: true, 
        message: "Education updated successfully",
        data: updated 
      });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const deleted = await educationService.delete(req.params.id);
      if (deleted) {
        res.json({ status: true, message: "Education deleted successfully" });
      } else {
        res.status(404).json({ status: false, message: "Education not found" });
      }
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  }
};