import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'users.json');

async function getDB() {
  try {
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    return { citizens: [], authorities: [] };
  }
}

export async function POST(request: Request) {
  try {
    const { role, email, password } = await request.json();
    const db = await getDB();

    let user = null;
    if (role === 'citizen') {
      user = db.citizens.find((c: any) => c.email === email && c.password === password);
    } else if (role === 'authority') {
      user = db.authorities.find((a: any) => a.email === email && a.password === password);
    }

    if (user) {
      const { password: _, ...userWithoutPassword } = user as any;
      return NextResponse.json({ success: true, user: userWithoutPassword });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
