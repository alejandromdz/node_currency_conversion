import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword:string) {
   return bcrypt.compareSync(candidatePassword, this.password);
};

export default mongoose.model('user',userSchema);