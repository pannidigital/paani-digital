import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { PortfolioData } from '@/types/portfolio';

const DATA_PATH = path.join(process.cwd(), 'src/data/portfolio.json');

export async function GET() {
    try {
        if (!(await fs.access(DATA_PATH).then(() => true).catch(() => false))) {
            return NextResponse.json({ error: 'Portfolio data file not found' }, { status: 404 });
        }
        const data = await fs.readFile(DATA_PATH, 'utf-8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        console.error('GET Portfolio Error:', error);
        return NextResponse.json({ error: 'Failed to load portfolio data', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        if (process.env.NODE_ENV === 'production') {
            return NextResponse.json({
                error: 'Updates are disabled in production due to a read-only file system.',
                details: 'To enable updates, please migrate to a database (e.g., Vercel Postgres or MongoDB).'
            }, { status: 403 });
        }

        const newData: PortfolioData = await request.json();

        // Ensure directory exists
        const dir = path.dirname(DATA_PATH);
        try {
            await fs.access(dir);
        } catch {
            await fs.mkdir(dir, { recursive: true });
        }

        await fs.writeFile(DATA_PATH, JSON.stringify(newData, null, 2));
        return NextResponse.json({ message: 'Portfolio updated successfully' });
    } catch (error) {
        console.error('POST Portfolio Error:', error);
        return NextResponse.json({
            error: 'Failed to update portfolio data',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
