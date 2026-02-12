import mongoose, { Schema, Document } from 'mongoose';

export interface IDelivery extends Document {
    trackingNumber: string;
    driverId: mongoose.Types.ObjectId;
    fuelType: 'Petrol' | 'Diesel';
    quantity: number;
    pickupLocation: string;
    deliveryLocation: string;
    currentLocation: string;
    status: 'Pending' | 'In Transit' | 'Delivered';
    createdAt: Date;
    updatedAt: Date;
}

const DeliverySchema = new Schema<IDelivery>({
    trackingNumber: { type: String, required: true, unique: true },
    driverId: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
    fuelType: { type: String, enum: ['Petrol', 'Diesel'], required: true },
    quantity: { type: Number, required: true },
    pickupLocation: { type: String, required: true },
    deliveryLocation: { type: String, required: true },
    currentLocation: { type: String, default: '' },
    status: {
        type: String,
        enum: ['Pending', 'In Transit', 'Delivered'],
        default: 'Pending'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    timestamps: true
});

export default mongoose.models.Delivery || mongoose.model<IDelivery>('Delivery', DeliverySchema);
