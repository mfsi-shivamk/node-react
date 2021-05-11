import cmd from 'node-cmd';
export default {
  
  // To update git and build react and node app
  async index(req, res, next) {
    try {
      cmd.run(
        `
          git pull
          npm install
          npm run build
          forever restartall
          cd ..
          cd client
          npm install
          npm run build
        `,
        function(err, data, stderr){
            console.log('Git Webhook')
        }
      )
    }
    catch(e) {
      next(e)
    }
  },

};
