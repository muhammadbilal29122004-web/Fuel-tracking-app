import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Delivery from '@/models/Delivery';
import Driver from '@/models/Driver';

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ number: string }> }
) {
    try {
        const params = await context.params;
        const { number } = params;

        // Validate 16 digits
        if (!/^\d{16}$/.test(number)) {
            return NextResponse.json({ error: 'Invalid tracking number format. Must be 16 digits.' }, { status: 400 });
        }

        await dbConnect();

        // 1. Try to find by Delivery Tracking Number
        let delivery = await Delivery.findOne({ trackingNumber: number }).populate('driverId');

        // 2. If not found, try to find by Driver Tracking ID
        if (!delivery) {
            const driver = await Driver.findOne({ trackingId: number });
            if (driver) {
                delivery = await Delivery.findOne({ driverId: driver._id })
                    .sort({ createdAt: -1 })
                    .populate('driverId');
            }
        }

        if (!delivery) {
            return NextResponse.json({ error: 'Tracking number not found. If this is a new driver, please assign a delivery first.' }, { status: 404 });
        }

        return NextResponse.json(delivery);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
