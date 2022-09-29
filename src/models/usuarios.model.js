import { Schema, model } from "mongoose"

const userSchema = new Schema ({
    name: {type: String, require: true, max: 100},
    surname: {type: String, require: true, max: 100},
    email: {type: String, require: true, max: 100},
    user: {type: String, require: true, max: 100},
    password: {type: String, require: true}
})

export const userModel = model('users', userSchema)