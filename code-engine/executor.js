const { spawn, exec } = require("child_process");

/**
 * This class excutes code
 * FIXME: Currently only for C++
 */
class Executor {
  constructor(fid, sourcepath, outputpath) {
    this.fid = fid;
    this.sourcepath = sourcepath;
    this.outputpath = outputpath;
  }

  compile = () =>
    new Promise((resolve, reject) => {
      let binaryPath = `${this.outputpath}/${this.fid}.out`;
      let cmp = exec(
        `g++ ${this.sourcepath} -std=c++17 -o ${binaryPath}`,
        (err, stdout, stderr) => {
          if (err) {
            reject(stderr);
          }
          resolve(binaryPath);
        }
      );
    });

  run = () =>
    new Promise((resolve, reject) => {
      let cpprun = exec(
        `cd ${this.outputpath} && ./${this.fid}.out`,
        (error, stdout, stderr) => {
          if (error) {
            reject(stderr);
          }
          resolve(stdout);
        }
      );
    });
}

module.exports = Executor;
