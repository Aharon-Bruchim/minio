import { Request, Response } from 'express';
import  * as fileService from '../services/fileService';

export const uploadFileController = async (req: Request, res: Response): Promise<void> => {
    const file: Express.Multer.File | undefined = req.file;
    
  if (!file) {
    res.status(400).json({ error: 'No file uploaded.' });
    return;
  }

  try {
    const uploadedFile = await fileService.uploadFile(file);
    res.status(201).json({
      message: 'File uploaded successfully',
      file: uploadedFile,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getFilesController = async (_req: Request, res: Response):Promise<void> => {
  try {
    const files = await fileService.getFiles();
    res.json(files);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getFileController = async (req: Request, res: Response):Promise<void> => {
  try {
    const file = await fileService.getFile(req.params.id);
    res.json(file);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteFileController = async (req: Request, res: Response):Promise<void> => {
  try {
    await fileService.deleteFile(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
