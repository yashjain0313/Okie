import { genSalt } from "bcrypt";
import { mongoose } from "mongoose";   

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    firstname :{
        type: String,
        required:false,

    },
    lastname :{
        type: String,
        required:false,

    },
    image:{
        type: String,
        required:false,
    },
    color:{
        type: Number,
        required:false,
    },  
    profileSetup:{
        type: Boolean,
        required:false,
    }
});

userSchema.pre('save', async function(next){
   const salt = await genSalt();
   this.password = await hash(this.password, salt); 
    next();
})

const User = mongoose.model('User', userSchema); 

export default User; 