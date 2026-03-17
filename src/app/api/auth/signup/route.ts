import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'users.json');

async function getDB() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    const initialDB = { citizens: [], authorities: [] };
    await fs.writeFile(DATA_FILE, JSON.stringify(initialDB, null, 2));
    return initialDB;
  }
}

export async function POST(request: Request) {
  try {
    const { role, data } = await request.json();
    const db = await getDB();

    if (role === 'citizen') {
      if (db.citizens.find((c: any) => c.email === data.email)) {
        return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
      }
      db.citizens.push({ id: Date.now().toString(), ...data });
    } else if (role === 'authority') {
      if (!(data.email.endsWith('@gov.in') || data.email.endsWith('@nic.in'))) {
        return NextResponse.json({ error: 'Please use an official government email (@gov.in or @nic.in).' }, { status: 400 });
      }
      if (db.authorities.find((a: any) => a.email === data.email)) {
        return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
      }
      db.authorities.push({ id: Date.now().toString(), ...data });
    } else {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    await fs.writeFile(DATA_FILE, JSON.stringify(db, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
