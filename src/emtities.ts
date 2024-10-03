const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

// Directory where the entities are located
const entitiesDir = './entities';
// Index file to be generated at the root of src
const indexFile = './src/index.ts';

// Function to generate the index file
function generateIndexFile() {
  fs.readdir(entitiesDir, (err: any, files: any[]) => {
    if (err) {
      console.error('Error reading entities directory:', err);
      return;
    }

    // Filter only TypeScript files
    const entityFiles = files.filter((file: any) => path.extname(file) === '.ts');

    // Create imports and exports for entities
    const imports = entityFiles.map((file: any) => `import { ${path.basename(file, '.ts')} } from './${entitiesDir}/${file}';`).join('\n');
    const exports = `export { ${entityFiles.map((file: any) => path.basename(file, '.ts')).join(', ')} };`;

    // Complete content of the index.ts file
    const content = `${imports}\n${exports}`;

    fs.writeFile(indexFile, content, (err: any) => {
      if (err) {
        console.error('Error writing index file:', err);
      } else {
        console.log('Index file generated successfully at src/index.ts');
      }
    });
  });
}

// Execute the script initially
generateIndexFile();

// Use chokidar to watch for changes in the entities directory and regenerate the file
chokidar.watch(entitiesDir, { ignored: /[\/\\]\./ })
  .on('add', generateIndexFile)
  .on('change', generateIndexFile);

console.log('Watching for changes in entities folder...');