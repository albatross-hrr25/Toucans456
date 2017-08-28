

# Recipes Archive [Legacy Edition]
Recipe Archive is a platform to capture, tag, and save handwritten recipes


# Table of Contents
1. [Features Added](#features-added)
1. [Team](#team)
1. [Technology Used](#technology-used)
1. [REquirements](#requirements)
1. [Installation](#installation)
1. [API Endpoints](#api-endpoints)

# Features Added
There are 3 features what we wanted to add, they are listed below.
- Auth0 authentication on top of JWT authentication
- Google Cloud Vision API for showing tags
- A Pinterest-style layout instead of a panel view.
-
# Team
- Scrum Master: Kevin Kim
- Product Owner: Kevin Su
- Development Team Members: Lisa Gee


# Technology Used
- Server Side
  - Node JS - javascript runtime
  - Express - the server framework
- Middleware
  - Gulp
  - Multer
  - Google Cloud Vision API
  - ng-file-upload
  - jwt
  - axios
  - auth0
  - cloudinary
- Client Side
  - Angular JS - front end framework
  - Bootstrap - HTML, CSS, and JS Framework
  - Masonry
- Database
  - mySQL / Sequelize
- Deployment
  - Heroku - PaaS for deployment
  - ClearDB
# Requirements
- Angular 1.6.5
- Express 4.15.4
- Node 8.x
- mySQL2
# Installation
To Install the Dependencies, do this from inside the downloaded directory



```javascript
npm install
```
To run the program locally you must run gulp to create the bundle, if you don't have gulp please **run npm install -g gulp**



```javascript
gulp
```


to run the application, you would just do


undefinednodemon // this is set up to run on local host port 8000


***IMPORTANT NOTE:
This application uses [Cloudinary](http://cloudinary.com/) and[ Google Cloud Vision API](https://cloud.google.com/vision/?utm_source=google&utm_medium=cpc&utm_campaign=na-US-all-en-dr-skws-all-all-trial-b-dr-1002250&utm_content=text-ad-none-any-DEV_c-CRE_113193384607-ADGP_BKWS+%7C+BMM+~+null_Vision+API-KWID_43700009979724429-kwd-203288724487&utm_term=KW_%2Bgoogle%20%2Bcloud%20%2Bvision-ST_%2Bgoogle+%2Bcloud+%2Bvision&gclid=Cj0KCQjw_o7NBRDgARIsAKvAgt1G34waFUBj0lcSSfg2bToWUEo1X1oE0Wxo03dCyAxi_N8Svf6HHXcaAqwhEALw_wcB&dclid=CMG3jKCE-9UCFdBtfgod3owMNw) and [Auth0](https://auth0.com/), this means you must sign up on their respective websites and include your credentials inside the file project. Google's API takes a key.json. Cloudinary's credentials are inside the index.js server file.




To push to heroku, you want to add the remote key



```javascript
git remote -v
git add remote upstream "git url"
```
 after each change you want to do the following



```javascript
git add .
git commit -m "adding new things"
git push heroku master
```
# Api Endpoints
**/ **- brings up landing page
**/api/recipes -**  this brings up the gallery, all receipes
**/api/recipe -** gets one recipe
**/api/search** - searches recipes




# **Contributing to Original Repo**
https://github.com/albatross-hrr25/Toucans456/blob/master/CONTRIBUTING.md
