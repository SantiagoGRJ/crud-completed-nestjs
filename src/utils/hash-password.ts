import * as bcrypt from 'bcrypt'
const salt = 10

export const hashedPassword = async (password:string) : Promise<string> => {
    return await bcrypt.hash(password,salt)
}