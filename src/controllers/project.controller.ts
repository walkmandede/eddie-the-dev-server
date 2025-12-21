import type { Request, Response } from "express";
import { projectService } from "../services/project.service.ts";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const projectController = {
  create: async (req: Request, res: Response) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      
      
      const projectData = {
        projectName: req.body.projectName,
        shortDescription: req.body.shortDescription || '',
        description: req.body.description || '',
        techStacks: req.body.techStacks ? JSON.parse(req.body.techStacks) : [],
        responsibilities: req.body.responsibilities ? JSON.parse(req.body.responsibilities) : [],
        links: req.body.links ? JSON.parse(req.body.links) : [],
        projectLogo: files?.logo ? `/uploads/${files.logo[0].filename}` : '',
        images: files?.images ? files.images.map(file => `/uploads/${file.filename}`) : []
      };

      const project = await projectService.create(projectData);
      res.status(201).json({ 
        status: true, 
        message: "Project created successfully",
        data: project 
      });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  },

  getAll: async (_req: Request, res: Response) => {
    try {
      const data = await projectService.getAll();
      res.json({ status: true, data });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const project = await projectService.getById(req.params.id);
      if (!project) {
        return res.status(404).json({ status: false, message: "Project not found" });
      }
      res.json({ status: true, data: project });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      
      
      const existingProject = await projectService.getById(req.params.id);
      if (!existingProject) {
        return res.status(404).json({ status: false, message: "Project not found" });
      }

      
      const projectData = {
        projectName: req.body.projectName || existingProject.project_name,
        shortDescription: req.body.shortDescription || existingProject.short_description,
        description: req.body.description || existingProject.description,
        techStacks: req.body.techStacks ? JSON.parse(req.body.techStacks) : existingProject.tech_stacks,
        responsibilities: req.body.responsibilities ? JSON.parse(req.body.responsibilities) : existingProject.responsibilities,
        links: req.body.links ? JSON.parse(req.body.links) : existingProject.links,
        projectLogo: files?.logo ? `/uploads/${files.logo[0].filename}` : existingProject.project_logo,
        images: files?.images ? files.images.map(file => `/uploads/${file.filename}`) : existingProject.images
      };

      
      if (files?.logo && existingProject.project_logo) {
        const oldLogoPath = path.join(__dirname, '../../', existingProject.project_logo);
        if (fs.existsSync(oldLogoPath)) {
          fs.unlinkSync(oldLogoPath);
        }
      }

      if (files?.images && existingProject.images?.length > 0) {
        existingProject.images.forEach((img: string) => {
          const oldImagePath = path.join(__dirname, '../../', img);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        });
      }

      const updated = await projectService.update(req.params.id, projectData);
      res.json({ 
        status: true, 
        message: "Project updated successfully",
        data: updated 
      });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      
      const project = await projectService.getById(req.params.id);
      if (!project) {
        return res.status(404).json({ status: false, message: "Project not found" });
      }

      
      if (project.project_logo) {
        const logoPath = path.join(__dirname, '../../', project.project_logo);
        if (fs.existsSync(logoPath)) {
          fs.unlinkSync(logoPath);
        }
      }

      
      if (project.images && project.images.length > 0) {
        project.images.forEach((img: string) => {
          const imagePath = path.join(__dirname, '../../', img);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        });
      }

      const deleted = await projectService.delete(req.params.id);
      if (deleted) {
        res.json({ status: true, message: "Project deleted successfully" });
      } else {
        res.status(404).json({ status: false, message: "Project not found" });
      }
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  }
};