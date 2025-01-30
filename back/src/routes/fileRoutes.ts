import express from 'express';
import multer from 'multer';
import * as fileController from '../controllers/fileController';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.route('/upload').post(upload.single('file'), fileController.uploadFileController);
router.route('/files').get(fileController.getFilesController);
router.route('/files/:id').get(fileController.getFileController);
router.route('/files/:id').delete(fileController.deleteFileController);

export default router;
