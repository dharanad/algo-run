const path = require('path');

const projectPath = path.dirname(require.main.filename);
const tempPath = path.join(projectPath, 'temp');
const tempSrcPath = path.join(tempPath, 'src');
const tempBinPath = path.join(tempPath, 'bin');

exports.tempPath = tempPath;
exports.tempBinPath = tempBinPath;
exports.tempSrcPath = tempSrcPath;