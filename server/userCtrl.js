const app = require('../index.js');

exports.findUser = (request, response) => {
  db.User.findAll()
    .then((users) => {
      // console.log(users);
      response.send(users);
    })
    .catch((error) => {
      response.send(error);
    });
}

exports.signup = (request, response) => {
  var username = request.body.username;
  var hash = request.body.hash;

  if (!username) {
    response.status(404).send('invalid username');
  }
  if (!hash) {
    response.status(404).send('invalid password');
  }
  db.User.findAll({where: {username: username}})
  .then ((userData) => {
    if(userData.length > 0) {
      console.log('User already exists');
      response.status(404).send('User already exists')
    } else {
      db.User.create({
        username: username,
        hash: hash
      })
      .then((user) => {
        var myToken = jwt.sign({
            username: username
        }, 'rowdyHouse');
        response.status(200).json(myToken);
      })
      .catch((error) => {
        response.status(404).json(error);
      })
    }
  })
  .catch((error) => {
    response.status(404).json(error);
  })
};

exports.login = (request, response) => {
  db.User.findAll({
    where: {
      username: request.query.username
    }
  })
    .then((user) => {
      // compare passwords
      if (user[0].dataValues.hash === request.query.hash) {
        var myToken = jwt.sign({
          username: request.query.username
        }, 'rowdyHouse');
        // redirect to homepage with token as header
        response.status(200).json(myToken);
      } else {
        response.status(401).send('Invalid password');
      }
    })
    .catch((error) => {
      console.log('User does not exist');
      response.status(401).send(error);
    });
};