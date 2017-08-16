var cloudinary = require('cloudinary').v2;
var envs = require('envs');


var cloudinary_key = process.env['CLOUDINARY_API_KEY'];
var cloudinary_sec = process.env['CLOUDINARY_API_SECRET'];

var uploads = {};


cloudinary.config({
  cloud_name: 'toucans456',
  api_key: cloudinary_key,
  api_secret: cloudinary_sec
});

cloudinary.uploader.upload("IMG_5741.JPG", // TODO: make image path dynamic
    // { // This sizing might be OK for primary view
    //   width: 2000,
    //   height: 1000,
    //   crop: "limit",
    //   effect: 'art:incognito',
    //   tags: ['endive', 'roquefort']
    // },
    { // This sizing might be OK for thumbnail views
      public_id: 'Endive Salad',
      width: 300,
      height: 225,
      crop: "fit",
      effect: 'art:incognito', // 'auto_color' is a good effect, too.
      tags: ['endive', 'roquefort'] // TODO: make tags dynamic
    },
    function(error, image) {
      if (error) {
        console.log('CLOUDINARY ERROR', error);
      }

      waitForAllUploads('Endive Salad', error, image); // dynamic image title here

    });

// Stores images to uploads object and logs them to the console
function waitForAllUploads(id,err,image){
  uploads[id] = image;
  console.log('Uploaded image to Cloudinary. Response object: ', uploads[id]);
  console.log('Unique cloudinary image url (not secure): ', uploads[id].url);
}

module.exports = cloudinary;