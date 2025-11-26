
import fs from 'fs/promises';
import path from 'path';

async function test() {
    console.log('Testing FormData behavior...');
    const formData = new FormData();
    formData.append('imageUrls', 'uploads/missing-file.jpg');
    console.log('FormData appended string path.');

    try {
        console.log('Testing fs.open on missing file...');
        const handle = await fs.open('uploads/missing-file.jpg', 'r');
        await handle.close();
    } catch (error: any) {
        console.log('Caught expected error:', error);
        console.log('Error code:', error.code);
        console.log('Error syscall:', error.syscall);
        console.log('Error path:', error.path);
    }
}

test();
