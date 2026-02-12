import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
    action: string;
    details: string;
    type: 'driver' | 'delivery' | 'system';
    createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>({
    action: { type: String, required: true },
    details: { type: String, required: true },
    type: { type: String, enum: ['driver', 'delivery', 'system'], required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);
