// /app/api/pets/route.js

import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Pet from '../../../models/Pet';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import formidable from 'formidable';
import fs from 'fs';

export const routeSegmentConfig = {
  api: {
    bodyParser: false, // Required for formidable to parse form-data
  },
};

export async function POST(req) {
  try {
    await connectDB();

    // Ensure the uploads directory exists
    const uploadDir = join(process.cwd(), '/public/uploads');
    await mkdir(uploadDir, { recursive: true });

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      multiples: false,
    });

    const formData = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const { fields, files } = formData;

    let imageUrl = '';
    if (files.image) {
      const imageFile = files.image;
      const fileName = imageFile.newFilename;
      imageUrl = `/uploads/${fileName}`;
    }

    const pet = await Pet.create({
      name: fields.name,
      species: fields.species,
      breed: fields.breed,
      age: fields.age,
      description: fields.description,
      image: imageUrl,
      status: 'available',
    });

    return NextResponse.json(pet, { status: 201 });

  } catch (error) {
    console.error('Error creating pet:', error);
    return NextResponse.json({ error: 'Error creating pet' }, { status: 500 });
  }
}
