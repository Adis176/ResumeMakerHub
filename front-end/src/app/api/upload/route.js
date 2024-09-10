import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../../utils/supabase/client';
// const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

export async function POST(request) {
  const data = await request.formData();
  const file = data.get('file');
  const priv = data?.get('priv')==='private';

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  let path;
  path = priv ? `public/storage/privateDoc/${file.name}` : `public/storage/publicDoc/${file.name}`;
  await writeFile(path, buffer);
  console.log(`open ${path} to see the uploaded file`);

  if(priv){
    try{
      const { data, error } = await supabase.storage.from('docPrivate').upload(path, file);
      console.log("Data - private: ", data);
      if(error) throw(error);
    }
    catch(error){
      console.log("Error in uploading doc to private bucket: ", error);
    }
  }
  else{
    try{
      const { data, error } = await supabase.storage.from('docPublic').upload(path, file);
      console.log("Data - public: ", data);
      if(error) throw(error);
    }
    catch(error){
      console.log("Error in uploading doc to public bucket: ", error);
    }
  }
  return NextResponse.json({ success: true });
}
