var cloudinary = require('cloudinary').v2;

var cloudinary_key = process.env.DB_CLOUDINARY_API_KEY;
var cloudinary_sec = process.env.DB_CLOUDINARY_API_SECRET;
var cloudinary_name = process.env.DB_CLOUDINARY_API_NAME;

var uploads = {};

cloudinary.config({
  cloud_name: cloudinary_name,
  api_key: cloudinary_key,
  api_secret: cloudinary_sec
});

var uploadPhoto = function(inputfilepath, title, tags) {
  let reterivedUrl;
  console.log('upload invoked');
  return cloudinary.uploader.upload(inputfilepath,
      // { // This sizing might be OK for primary view
      //   width: 2000,
      //   height: 1000,
      //   crop: "limit",
      //   effect: 'art:incognito',
      //   tags: ['endive', 'roquefort']
      // },
      { // This sizing might be OK for thumbnail views
        public_id: title,
        width: 300,
        height: 225,
        crop: "fit",
       // effect: 'art:incognito', // 'auto_color' is a good effect, too.
        tags: tags
      },
      function(error, image) {
        if (error) {
          console.log('CLOUDINARY ERROR', error);
        }

        waitForAllUploads(inputfilepath, error, image);

      });

  // Stores images to uploads object and logs them to the console
  function waitForAllUploads(id, err, image){
    uploads[id] = image;
    console.log('Uploaded image to Cloudinary. Response object: ', uploads[id]);
    console.log('Unique cloudinary image url (not secure): ', uploads[id].url);
    return uploads[id].url;
  }
};

module.exports = {cloudinary, uploadPhoto};