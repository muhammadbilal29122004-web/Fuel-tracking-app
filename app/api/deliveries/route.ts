import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Delivery from '@/models/Delivery';
import Activity from '@/models/Activity';
import '@/models/Driver';

export async function GET() {
    try {
        await dbConnect();
        const deliveries = await Delivery.find({})
            .populate('driverId')
            .sort({ createdAt: -1 });
        return NextResponse.json(deliveries);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        const trackingNumber = Math.floor(Math.random() * 9000000000000000 + 1000000000000000).toString();

        const delivery = await Delivery.create({
            ...body,
            trackingNumber
        });

        const populatedDelivery = await Delivery.findById(delivery._id).populate('driverId');

        // Log Activity
        await Activity.create({
            action: 'Shipment Created',
            details: `New delivery #${trackingNumber} assigned to ${populatedDelivery.driverId?.name || 'Driver'}`,
            type: 'delivery'
        });

        return NextResponse.json(delivery, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
