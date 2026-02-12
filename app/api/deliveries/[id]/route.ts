import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Delivery from '@/models/Delivery';
import Activity from '@/models/Activity';
import '@/models/Driver';

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        await dbConnect();
        const delivery = await Delivery.findById(params.id).populate('driverId');
        if (!delivery) {
            return NextResponse.json({ error: 'Delivery not found' }, { status: 404 });
        }
        return NextResponse.json(delivery);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        await dbConnect();
        const body = await req.json();

        const oldDelivery = await Delivery.findById(params.id);

        const delivery = await Delivery.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        }).populate('driverId');

        if (!delivery) {
            return NextResponse.json({ error: 'Delivery not found' }, { status: 404 });
        }

        // Log Activity for updates
        let logAction = 'Shipment Updated';
        let logDetails = `Delivery #${delivery.trackingNumber} was modified.`;

        if (body.status && body.status !== oldDelivery.status) {
            logAction = 'Status Updated';
            logDetails = `Delivery #${delivery.trackingNumber} status changed to ${body.status}`;
        } else if (body.currentLocation && body.currentLocation !== oldDelivery.currentLocation) {
            logAction = 'Location Updated';
            logDetails = `Driver at #${delivery.trackingNumber} reached ${body.currentLocation}`;
        }

        await Activity.create({
            action: logAction,
            details: logDetails,
            type: 'delivery'
        });

        return NextResponse.json(delivery);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        await dbConnect();
        const delivery = await Delivery.findByIdAndDelete(params.id);
        if (!delivery) {
            return NextResponse.json({ error: 'Delivery not found' }, { status: 404 });
        }

        await Activity.create({
            action: 'Shipment Cancelled',
            details: `Delivery record #${delivery.trackingNumber} was deleted.`,
            type: 'delivery'
        });

        return NextResponse.json({ message: 'Delivery deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
