var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'toucans456',
  api_key: '125197423392965',
  api_secret: 'RFZ1ePu4O8rD7zwlPVuFEQ7QqOc'
});

cloudinary.uploader.upload('https://www.google.com/search?q=bananas+foster+food+image&rlz=1C5CHFA_enUS738US742&tbm=isch&imgil=YPGFNapY0vWcaM%253A%253BIhKtypeTq6qy4M%253Bhttp%25253A%25252F%25252Fwww.neworleansrestaurants.com%25252Fnew-orleans-recipes%25252Frecipes_brennans.php&source=iu&pf=m&fir=YPGFNapY0vWcaM%253A%252CIhKtypeTq6qy4M%252C_&usg=__3y011S5ooHf3sLxffEkDMh6x1f4%3D&biw=788&bih=689&ved=0ahUKEwiN0rOVsc3VAhVK2mMKHQpxC0EQyjcIQQ&ei=trGMWY2fFsq0jwOK4q2IBA#imgrc=0VaVyOrCLguBVM:', (result) => {
  console.log(result);
});

module.exports = cloudinardy;