import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Driver from '@/models/Driver';
import Activity from '@/models/Activity';

export async function GET() {
    try {
        await dbConnect();
        const drivers = await Driver.find({}).sort({ createdAt: -1 });

        // Auto-fix for existing drivers without IDs (Migration)
        for (const driver of drivers) {
            if (!driver.trackingId) {
                const newId = Math.floor(Math.random() * 9000000000000000 + 1000000000000000).toString();
                await Driver.findByIdAndUpdate(driver._id, { trackingId: newId });
                driver.trackingId = newId;
            }
        }

        return NextResponse.json(drivers);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        const trackingId = Math.floor(Math.random() * 9000000000000000 + 1000000000000000).toString();

        const driver = await Driver.create({
            ...body,
            trackingId
        });

        // Log Activity
        await Activity.create({
            action: 'New Driver Added',
            details: `Driver ${driver.name} was registered with ID ${trackingId}`,
            type: 'driver'
        });

        return NextResponse.json(driver, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
