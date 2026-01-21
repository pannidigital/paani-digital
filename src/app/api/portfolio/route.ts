import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { PortfolioData } from '@/types/portfolio';

const DATA_PATH = path.join(process.cwd(), 'src/data/portfolio.json');

export async function GET() {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf-8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load portfolio data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newData: PortfolioData = await request.json();
        await fs.writeFile(DATA_PATH, JSON.stringify(newData, null, 2));
        return NextResponse.json({ message: 'Portfolio updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update portfolio data' }, { status: 500 });
    }
}
