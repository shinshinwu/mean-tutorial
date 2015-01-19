var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
      type: String,
      index: true,
      match: /.+\@.+\..+/
    },
    role: {
      type: String,
      enum: ['Admin', 'Owner', 'User']
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      validate: [
      function(password){
        return password.length >= 6;
      },
      'Password should be longer than 6 characters.'
      ]
    },
    created: {
      type: Date,
      default: Date.now
    },
    website: {
      type: String,
      get: function(url) {
        if (!url) {
          return url;
        } else {
          if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
            url = 'http://' + url;
          }

          return url;
        }
      }
    }
});

UserSchema.post('save', function(next) {
  if(this.isNew){
    console.log('A new user was created.');
  } else {
    console.log('A user details is updated.')
  }
});

UserSchema.virtual('fullName').get(function(){
  return this.firstName + ' ' + this.lastName;
}).set(function(fullName){
  var splitName = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
});

UserSchema.statics.findOneByUsername = function (username, callback) {
    this.findOne({ username: new RegExp(username, 'i') }, callback);
};

UserSchema.methods.authenticate = function(password) {
  return this.password === password;
};

UserSchema.set('toJSON', {getters: true, virtuals: true});


var PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User' }
});

mongoose.model('Post', PostSchema);