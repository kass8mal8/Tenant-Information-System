const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const options = {
    type: String,
    required: true
}

const adminSchema = new Schema({
    first_name: options,
    surname: options,
    email: {
        ...options,
        unique: true
    },
    password: options
})

adminSchema.pre( 'save', async function(next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

    next()

})

adminSchema.statics.login = async function(email, password) {
    try {
        const user = await this.findOne({ email });

        const auth = await bcrypt.compare(password, user.password);
        
        if (auth) {
            return user;
        } else {
            throw new Error('Incorrect credentials');
        }
    } catch (error) {
        console.error('Login error:', error.message);
        throw error; 
    }
};



const User = model('user', adminSchema)
module.exports = User