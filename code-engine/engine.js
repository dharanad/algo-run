const FileHandler = require("./fileHandler");
const Executor = require("./executor");
const { tempSrcPath, tempBinPath } = require("./utils");

const run = (fid, sourceCode) =>
  new Promise((resolve, reject) => {
    let fh = new FileHandler(fid, "cpp", tempSrcPath, sourceCode);
    fh.createSourceFile().then((filePath) => {
      let executor = new Executor(fid, filePath, tempBinPath);
      executor
        .compile()
        .then(() => {
          return executor.run();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((reason) => {
          reject(reason);
        })
        .finally(() => {
          //TODO: Delete the binary file
          fh.deleteFile();
        });
    });
  });

exports.run = run;
