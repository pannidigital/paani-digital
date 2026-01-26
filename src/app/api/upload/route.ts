import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // In production, upload to Vercel Blob
        if (process.env.NODE_ENV === 'production') {
            const blob = await put(file.name, buffer, {
                access: 'public',
            });
            return NextResponse.json({
                message: 'File uploaded to Vercel Blob successfully',
                url: blob.url
            });
        }

        // Local development: Save to public/uploads
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, file.name);
        await fs.writeFile(filePath, buffer);

        return NextResponse.json({
            message: 'File uploaded locally successfully',
            url: `/uploads/${file.name}`
        });
    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({
            error: 'Failed to upload file',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
