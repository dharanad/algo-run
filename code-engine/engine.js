const FileHandler = require("./fileHandler");
const Executor = require("./executor");
const { tempSrcPath, tempBinPath } = require("./utils");

const run = (fid, sourceCode) => {
  let fh = new FileHandler(fid, "cpp", tempSrcPath, sourceCode);
  return new Promise(async (resolve, reject) => {
    try {
      let sourceFilePath = await fh.createSourceFile();
      let excutor = new Executor(fid, sourceFilePath, tempBinPath);
      let { binFilePath } = await excutor.compile();
      fh.binFilePath = binFilePath;
      let runProgramStatus = await excutor.run();
      resolve(runProgramStatus);
    } catch (error) {
      reject(error);
    } finally {
      fh.deleteFile();
      fh.deleteBinFile();
    }
  });
};

exports.run = run;
