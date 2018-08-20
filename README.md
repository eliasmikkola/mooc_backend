# Osa 3
[Heroku version](https://pacific-reef-66745.herokuapp.com/)

create file config.js to use mongo.js
```javascript
module.exports = {
    mongo: {
        user: '<username>',
        password: '<password>'
        project: '<projectname>',
        ds: 'ds<something>',
        port: '<port>'
    }
}
```