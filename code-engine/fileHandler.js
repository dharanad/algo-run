const { spawn, execFile } = require("child_process");
const fs = require("fs");

/**
 * File Handler
 * This class takes in file id, extension such as cpp, java, txt etc, path and source code
 * This class creates and delete files
 *
 * TODO: Re write file for better maintainance
 */
class FileHanlder {
  isCreated = false; // to check if the file is created

  constructor(fid, ext, dir, sourceCode) {
    this.fid = fid;
    this.ext = ext;
    this.dir = dir;
    this.sourceCode = sourceCode;
  }
  /**
   * @param {string} path
   */
  set binFilePath(path){
    this._binFilePath = path;
  }

  createSourceFile = () =>
    new Promise((resolve, reject) => {
      const filePath = `${this.dir}/${this.fid}.${this.ext}`;
      fs.writeFile(filePath, this.sourceCode, (err) => {
        if (err) {
          reject(err);
        }
        this.filePath = filePath;
        this.isCreated = true;
        resolve(filePath);
      });
    });

  deleteFile = () =>
    new Promise((resolve, reject) => {
      if (!this.isCreated) {
        reject("File not created");
      }
      fs.unlink(this.filePath, (err) => {
        if (err) {
          reject(err);
        }
        this.isCreated = false;
        resolve(`Deleted file at location : ${this.filePath}`);
      });
    });

  deleteBinFile = () =>
    new Promise((resolve, reject) => {
      fs.unlink(this._binFilePath, (err) => {
        if (err) {
          reject(err);
        }
        resolve(`Deleted file at location : ${this.filePath}`);
      });
    });
}

module.exports = FileHanlder;
