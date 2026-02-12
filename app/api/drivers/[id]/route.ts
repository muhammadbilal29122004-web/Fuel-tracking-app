import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Driver from '@/models/Driver';

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        await dbConnect();
        const driver = await Driver.findById(params.id);
        if (!driver) {
            return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
        }
        return NextResponse.json(driver);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        await dbConnect();
        const body = await req.json();
        const driver = await Driver.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });
        if (!driver) {
            return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
        }
        return NextResponse.json(driver);
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
        const driver = await Driver.findByIdAndDelete(params.id);
        if (!driver) {
            return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Driver deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
