import mongoose, { Schema, Document } from 'mongoose';

export interface IDriver extends Document {
    name: string;
    cnic: string;
    vehicleNumber: string;
    phone: string;
    address: string;
    trackingId: string; // 16-digit tracking ID for the driver
    createdAt: Date;
}

const DriverSchema = new Schema<IDriver>({
    name: { type: String, required: true },
    cnic: { type: String, required: true, unique: true },
    vehicleNumber: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    trackingId: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Driver || mongoose.model<IDriver>('Driver', DriverSchema);
