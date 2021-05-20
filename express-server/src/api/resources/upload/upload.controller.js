
import multiparty from 'multiparty';
import rimraf from 'rimraf';
import {onSimpleUpload, onChunkedUpload} from './upload.module';
import path from 'path';

const uploadedFilesPath = path.join(path.dirname(require.main.filename), 'public/'),
fileInputName = process.env.FILE_INPUT_NAME || "qqfile";


export default {
  async onUpload(req, res, next) {
      try{
          const { movieId } = req.params;
          console.log(req.user);
          const data = { id: movieId, userId: req.user.id }; 
          const form = new multiparty.Form();
          form.parse(req, function (err, fields, files) {
            var partIndex = fields.qqpartindex;
            res.set("Content-Type", "text/plain");
            if (partIndex == null) {
              onSimpleUpload(fields, files[fileInputName][0], res, data);
            }
            else {
              onChunkedUpload(fields, files[fileInputName][0], res, data);
            }
          });
      }
      catch(e){
          console.log(e);
          next(e);
      }
  },
  async onDeleteFile(req, res, next) {
      
      try{
          const { movieId } = req.params;
          const data = { id: movieId, userId: req.user.id };
          const uuid = req.params.uuid,
              dirToDelete = uploadedFilesPath + uuid;
        
          rimraf(dirToDelete, function(error) {
              if (error) {
                  res.status(500);
              }
              res.send();
          });
      }
      catch(e){
          next(e);
      }
  }
};
