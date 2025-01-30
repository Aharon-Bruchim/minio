import { Client } from 'minio';
import File, { IFile } from '../models/fileModel';
import dotenv from "dotenv";

dotenv.config();

const FILE_URL = process.env.FILE_URL as string;
const BUCKET_NAME = "uploads";

const minioClient = new Client({
  endPoint: 'minio',
  port: 9000,
  useSSL: false,
  accessKey: 'adminuser',
  secretKey: 'strongpassword123',
});

const bucketName = BUCKET_NAME;

const ensureBucketExists = async () => {
  try {
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    if (!exists) {
      await minioClient.makeBucket(BUCKET_NAME, 'us-east-1');
      console.log(`✅ Bucket '${BUCKET_NAME}' created successfully.`);
    } else {
      console.log(`✅ Bucket '${BUCKET_NAME}' already exists.`);
    }
  } catch (err) {
    console.error(`❌ Error checking/creating bucket:`, err);
    throw new Error("MinIO Bucket Error");
  }
};

ensureBucketExists();

export const uploadFile = async (file: Express.Multer.File): Promise<IFile> => {
  const fileName = `${Date.now()}-${file.originalname}`;

  try {
    await ensureBucketExists();

    await minioClient.putObject(bucketName, fileName, file.buffer);
    console.log(`✅ File uploaded successfully: ${fileName}`);

    const fileUrl = `${FILE_URL}/${bucketName}/${fileName}`;

    const newFile = new File({
      fileName,
      originalName: file.originalname,
      fileUrl,
    });
    console.log('newFile:', newFile);

    return await newFile.save();
  } catch (err) {
    console.error('Error uploading file:', err);
    throw new Error('Error uploading file');
  }
};

export const getFiles = async (): Promise<IFile[]> => {
  return await File.find();
};

export const getFile = async (id: string): Promise<IFile | null> => {
    const file = await File.findById(id);
    if (!file) {
      throw new Error('File not found');
    }
    return file;
  };

  export const deleteFile = async (id: string): Promise<void> => {
    const file = await File.findById(id);
  
    if (!file) {
      throw new Error('File not found');
    }
  
    try {
      await minioClient.removeObject(bucketName, file.fileName);
    } catch (minioError) {
      console.error('Error deleting file from MinIO:', minioError);
      throw new Error('Error deleting file from storage');
    }
  
    try {
      await File.findByIdAndDelete(id);
    } catch (dbError) {
      console.error('Error deleting file from database:', dbError);
      throw new Error('Error deleting file from database');
    }
  };
  