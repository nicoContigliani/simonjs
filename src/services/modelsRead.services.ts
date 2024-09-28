import fs from 'fs';
import path from 'path';

export const modelsRead = ()=>{
    const entitiesDir = path.join(__dirname, '../entities');
    const modelFiles = fs.readdirSync(entitiesDir);
    
    const modelNames = modelFiles
        .filter(file => file.endsWith('.ts') && file !== 'index.ts') // Filter for TypeScript files, excluding index
        .map(file => path.basename(file, '.ts')); // Get the file name without the extension
    return modelNames; 
}