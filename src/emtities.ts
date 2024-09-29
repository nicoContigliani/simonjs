const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

// Directorio donde se encuentran las entidades
const entitiesDir = './entities';
// Archivo de índice a generar en la raíz de src
const indexFile = './src/index.ts';

// Función para generar el archivo de índice
function generateIndexFile() {
  fs.readdir(entitiesDir, (err: any, files: any[]) => {
    if (err) {
      console.error('Error al leer el directorio de entidades:', err);
      return;
    }

    // Filtrar solo los archivos TypeScript
    const entityFiles = files.filter((file: any) => path.extname(file) === '.ts');

    // Crear las importaciones y la exportación de las entidades
    const imports = entityFiles.map((file: any) => `import { ${path.basename(file, '.ts')} } from './${entitiesDir}/${file}';`).join('\n');
    const exports = `export { ${entityFiles.map((file: any) => path.basename(file, '.ts')).join(', ')} };`;

    // Contenido completo del archivo index.ts
    const content = `${imports}\n${exports}`;

    fs.writeFile(indexFile, content, (err: any) => {
      if (err) {
        console.error('Error al escribir el archivo de índice:', err);
      } else {
        console.log('Archivo de índice generado correctamente en src/index.ts');
      }
    });
  });
}

// Ejecutar el script al inicio
generateIndexFile();

// Utilizar chokidar para vigilar cambios en el directorio de entidades y regenerar el archivo
chokidar.watch(entitiesDir, { ignored: /[\/\\]\./ })
  .on('add', generateIndexFile)
  .on('change', generateIndexFile);

console.log('Vigilando cambios en la carpeta entities...');