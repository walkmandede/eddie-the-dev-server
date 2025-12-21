import type { Request, Response } from "express";
import { experienceService } from "../services/endpointServices/experience.service.ts";

export const experienceController = {
  create: async (req: Request, res: Response) => {
    try {
      const experience = await experienceService.create(req.body);
      res.status(201).json({ status: true, data: experience });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  },

  getAll: async (_req: Request, res: Response) => {
    try {
      const data = await experienceService.getAll();
      res.json({ status: true, data });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const experience = await experienceService.getById(req.params.id);
      if (!experience) return res.status(404).json({ status: false, message: "Not found" });
      res.json({ status: true, data: experience });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const updated = await experienceService.update(req.params.id, req.body);
      res.json({ status: true, data: updated });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const result = await experienceService.delete(req.params.id);
      res.json({ status: true, ...result });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  }
};
