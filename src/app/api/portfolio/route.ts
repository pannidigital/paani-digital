import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { PortfolioData } from '@/types/portfolio';
import { kv } from '@vercel/kv';

const DATA_PATH = path.join(process.cwd(), 'src/data/portfolio.json');

async function getPortfolioData(): Promise<PortfolioData> {
    // In production, try to get from KV first
    if (process.env.NODE_ENV === 'production') {
        try {
            const data = await kv.get<PortfolioData>('portfolio');
            if (data) return data;
        } catch (error) {
            console.error('KV Get Error:', error);
        }
    }

    // Fallback to local file
    const fileContent = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(fileContent);
}

export async function GET() {
    try {
        const data = await getPortfolioData();
        return NextResponse.json(data);
    } catch (error) {
        console.error('GET Portfolio Error:', error);
        return NextResponse.json({ error: 'Failed to fetch portfolio data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newData: PortfolioData = await request.json();

        if (process.env.NODE_ENV === 'production') {
            await kv.set('portfolio', newData);
            return NextResponse.json({ message: 'Portfolio updated in KV successfully' });
        }

        // Local development: Ensure directory exists and write to file
        const dir = path.dirname(DATA_PATH);
        try {
            await fs.access(dir);
        } catch {
            await fs.mkdir(dir, { recursive: true });
        }

        await fs.writeFile(DATA_PATH, JSON.stringify(newData, null, 2));
        return NextResponse.json({ message: 'Portfolio updated locally successfully' });
    } catch (error) {
        console.error('POST Portfolio Error:', error);
        return NextResponse.json({
            error: 'Failed to update portfolio data',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
