import jwt from "jsonwebtoken"


export type LoginJWT = {
    id: number
}
export const generateJWT = ({ id }: LoginJWT) => {

    const token = jwt.sign({ id }, process.env.JWT_SECRET_PASS, {
        expiresIn: '60d'
    })

    return token
}