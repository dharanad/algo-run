const { spawn, exec } = require("child_process");

/**
 * This class excutes code
 * FIXME: Currently only for C++
 */
class Executor {
  constructor(fid, srcFilePath, binDirPath) {
    this.fid = fid;
    this.srcFilePath = srcFilePath; // source code dir path
    this.binDirPath = binDirPath; // bin output dir path
  }

  compile = () => {
    let binFilePath = `${this.binDirPath}/${this.fid}.out`;
    const compile = spawn("g++", [
      this.srcFilePath,
      "-std=c++17",
      "-o",
      binFilePath,
    ]);

    return new Promise((resolve, reject) => {
      let err = [];
      let response = {
        status: "OK",
        error: [],
      };
      compile.stderr.on("data", (data) => {
        let op = data.toString();
        if (op) {
          op = op.split("\n");
          err.push(...op);
        }
      });
      compile.stdout.on("close", () => {
        if (err.length) {
          response["status"] = "CE";
          response["error"] = err;
          reject(response);
        } else {
          response["binFilePath"] = binFilePath;
          resolve(response);
        }
      });
    });
  };

  run = () => {
    return new Promise((resolve, reject) => {
      let response = {
        status: "OK",
        output: [],
        error: [],
      };
      let output = [];
      let err = [];
      const cpprun = exec(
        `./${this.fid}.out`,
        { cwd: this.binDirPath, timeout: 10 * 1000 }, // maxBuffer = 1024 * 1024 B
        (error, stdout, stderr) => {
          if (error) {
            if (error.signal === "SIGTERM") {
              response["status"] = "TLE";
              reject(response);
            }
            console.log(error);
            return;
          }
          if (stderr) {
            let eop = stderr.split("\n");
            err.push(...eop);
            response["status"] = "ERR";
            response["error"] = err;
            reject(response);
            return;
          }
          let op = stdout.split("\n");
          if (op) output.push(...op);
          response["output"] = output;
          resolve(response);
        }
      );
    });
  };
}

module.exports = Executor;
