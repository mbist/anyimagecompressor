// const path = require('path');
// const { execSync } = require('child_process');

// const publicFolderPath = path.join(__dirname, 'public');

// function processFilesInDirectory(directoryPath) {
//   const files = execSync(`find "${directoryPath}" -type f -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp"`).toString().split('\n').filter(Boolean);

//   files.forEach(file => {
//     const outputPath = file.replace(publicFolderPath, path.join(publicFolderPath, 'compressed'));
//     const command = `imagemin "${file}" --out-dir="${path.dirname(outputPath)}" --plugin=mozjpeg --plugin=pngquant --plugin=gifsicle`;
//     try {
//       execSync(command);
//       console.log(`Minified image: ${file}`);
//     } catch (error) {
//       console.error(`Error minifying image ${file}:`, error.message);
//     }
//   });
// }

// processFilesInDirectory(publicFolderPath);
const path = require('path');
const { execSync } = require('child_process');

const publicFolderPath = path.join(__dirname, 'public');

// Determine the appropriate find command based on the operating system
const findCommand = process.platform === 'win32' ? 'dir /b /s' : 'find';

function processFilesInDirectory(directoryPath) {
  const files = execSync(`${findCommand} "${directoryPath}" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \)`).toString().split('\n').filter(Boolean);

  files.forEach(file => {
    const outputPath = file.replace(publicFolderPath, path.join(publicFolderPath, 'compressed'));
    const command = `imagemin "${file}" --out-dir="${path.dirname(outputPath)}" --plugin=mozjpeg --plugin=pngquant --plugin=gifsicle`;
    try {
      execSync(command);
      console.log(`Minified image: ${file}`);
    } catch (error) {
      console.error(`Error minifying image ${file}:`, error.message);
    }
  });
}

processFilesInDirectory(publicFolderPath);
