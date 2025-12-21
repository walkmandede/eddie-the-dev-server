import type { Request, Response } from "express";
import { aboutMeService } from "../services/aboutMe.service.ts";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const aboutMeController = {
  get: async (_req: Request, res: Response) => {
    try {
      const data = await aboutMeService.get();
      res.json({ 
        status: true, 
        data 
      });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      // Get current data
      const currentData = await aboutMeService.get();
      
      // Handle file uploads
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      
      let images = currentData.images;
      
      // Update profile image
      if (files?.profile && files.profile.length > 0) {
        // Delete old profile image
        if (currentData.images.profile) {
          const oldProfilePath = path.join(__dirname, '../../', currentData.images.profile);
          if (fs.existsSync(oldProfilePath)) {
            fs.unlinkSync(oldProfilePath);
          }
        }
        images.profile = `/uploads/${files.profile[0].filename}`;
      }
      
      // Update gallery images
      if (files?.gallery && files.gallery.length > 0) {
        // Delete old gallery images
        if (currentData.images.gallery && currentData.images.gallery.length > 0) {
          currentData.images.gallery.forEach((img: string) => {
            const oldImagePath = path.join(__dirname, '../../', img);
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
            }
          });
        }
        images.gallery = files.gallery.map(file => `/uploads/${file.filename}`);
      }

      // Parse JSON fields if they exist
      const updateData = {
        fullName: req.body.fullName || currentData.fullName,
        otherName: req.body.otherName || currentData.otherName,
        expertises: req.body.expertises ? JSON.parse(req.body.expertises) : currentData.expertises,
        links: req.body.links ? JSON.parse(req.body.links) : currentData.links,
        contact: req.body.contact ? JSON.parse(req.body.contact) : currentData.contact,
        images: images
      };

      const updated = await aboutMeService.update(updateData);
      
      res.json({ 
        status: true, 
        message: "About me updated successfully",
        data: updated 
      });
    } catch (err: any) {
      res.status(500).json({ status: false, error: err.message });
    }
  }
};