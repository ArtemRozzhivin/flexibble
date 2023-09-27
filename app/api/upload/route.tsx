import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (requst: Request) => {
  const { path } = await requst.json();

  if (!path) return NextResponse.json({ error: 'Image path is required' }, { status: 500 });

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overvrite: true,
      transformation: [{ width: 500, height: 500, crop: 'scale' }],
    };

    const result = await cloudinary.uploader.upload(path, options);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
