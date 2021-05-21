import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import rimraf from 'rimraf';
import { db } from '../../../models';

const uploadedFilesPath = path.join(path.dirname(require.main.filename), 'public/'),
chunkDirName = "chunks",
maxFileSize = process.env.MAX_FILE_SIZE || 0;
function isValid(size) {
    return maxFileSize === 0 || size < maxFileSize;
  }
  function onSimpleUpload(fields, file, res, where) {
  
    var uuid = fields.qquuid,
        responseData = {
            success: false
        };
    file.name = fields.qqfilename;
  
  
    if (isValid(file.size)) {
  
  
        moveUploadedFile(file, uuid, function() {
                responseData.success = true;
                db.movie.update({ key: uuid[0] }, { where });
                res.send(responseData);
            },
            function() {
                responseData.error = "Problem copying the file!";
                res.send(responseData);
            });
  
  
    }
    else {
  
    
        failWithTooBigFile(responseData, res);
  
    }
  }
  
  function  onChunkedUpload(fields, file, res, where) {
      
      var size = parseInt(fields.qqtotalfilesize),
      uuid = fields.qquuid,
      index = fields.qqpartindex,
      totalParts = parseInt(fields.qqtotalparts),
      responseData = {
          success: false
      };
      console.log("onChunkedUpload",uuid);
  
    file.name = fields.qqfilename;
  
    if (isValid(size)) {
        storeChunk(file, uuid, index, totalParts, function() {
            if (index < totalParts - 1) {
                responseData.success = true;
                res.send(responseData);
            }
            else {
                combineChunks(file, uuid, function() {
                        db.movie.update({ key: uuid[0] }, { where });
                        responseData.success = true;
                        res.send(responseData);
                    },
                    function() {
                        responseData.error = "Problem conbining the chunks!";
                        res.send(responseData);
                    });
            }
        },
        function(reset) {
            responseData.error = "Problem storing the chunk!";
            res.send(responseData);
        });
    }
    else {
        failWithTooBigFile(responseData, res);
    }
  
  
  }
  
  function  failWithTooBigFile(responseData, res) {
    responseData.error = "Too big!";
    responseData.preventRetry = true;
    res.send(responseData);
  }
  

  
  function  moveFile(destinationDir, sourceFile, destinationFile, success, failure) {
    
    mkdirp(destinationDir, {})
    .then(r =>{
  
      var sourceStream, destStream;
      sourceStream = fs.createReadStream(sourceFile);
      destStream = fs.createWriteStream(destinationFile);
  
      sourceStream
          .on("error", function(error) {
            
              destStream.end();
              failure();
          })
          .on("end", function(){
              destStream.end();
              success();
          })
          .pipe(destStream);
    }).catch(error => {
      if (error) {
        
          failure();
      }
    });
  }
  
  function moveUploadedFile(file, uuid, success, failure) {
    
    var destinationDir = uploadedFilesPath + uuid + "/",
        fileDestination = destinationDir + file.name;
  
    moveFile(destinationDir, file.path, fileDestination, success, failure);
  
  
  }
  
  function storeChunk(file, uuid, index, numChunks, success, failure) {
    var destinationDir = uploadedFilesPath + uuid + "/" + chunkDirName + "/",
        chunkFilename = getChunkFilename(index, numChunks),
        fileDestination = destinationDir + chunkFilename;
  
    moveFile(destinationDir, file.path, fileDestination, success, failure);
  }
  
  function combineChunks(file, uuid, success, failure) {
    var chunksDir = uploadedFilesPath + uuid + "/" + chunkDirName + "/",
        destinationDir = uploadedFilesPath + uuid + "/",
        fileDestination = destinationDir + file.name;
  
  
    fs.readdir(chunksDir, function(err, fileNames) {
        var destFileStream;
  
        if (err) {
          
            failure();
        }
        else {
            fileNames.sort();
            destFileStream = fs.createWriteStream(fileDestination, {flags: "a"});
  
            appendToStream(destFileStream, chunksDir, fileNames, 0, function() {
                rimraf(chunksDir, function(rimrafError) {
                    if (rimrafError) {
                      
                    }
                });
                success();
            },
            failure);
        }
    });
  }
  
  function appendToStream(destStream, srcDir, srcFilesnames, index, success, failure) {
    if (index < srcFilesnames.length) {
        fs.createReadStream(srcDir + srcFilesnames[index])
            .on("end", function() {
                appendToStream(destStream, srcDir, srcFilesnames, index + 1, success, failure);
            })
            .on("error", function(error) {
              
                destStream.end();
                failure();
            })
            .pipe(destStream, {end: false});
    }
    else {
        destStream.end();
        success();
    }
  }
  
  function getChunkFilename(index, count) {
    var digits = new String(count).length,
        zeros = new Array(digits + 1).join("0");
  
    return (zeros + index).slice(-digits);
  }
module.exports = {onSimpleUpload, onChunkedUpload};