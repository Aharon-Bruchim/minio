import mongoose, {  Schema } from "mongoose";

export interface IFile extends mongoose.Document {
  fileName: string, 
  originalName: string,
  fileUrl: string,  
  uploadedAt: { type: Date }
}

const FileSchema = new Schema<IFile>({
  fileName: { type: String, required: true },
  originalName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});



export default mongoose.model<IFile>("File", FileSchema);
