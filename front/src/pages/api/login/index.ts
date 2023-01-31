import { sign } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import axios from 'axios';

export default async function loginHandler(req, res) {
    const { sub, email, nickname } = req.body;
    const response = await axios.get(`${process.env.RESTURL_PRODUCTS}/auth0/user/roles/${sub}`);
    const rol = response.data.find((element: { name: string; }) => element.name === 'administrador');
    const { myTokenName } = req.cookies;
    // console.log(res)
    // console.log(rol)
    if (email && nickname) {
        // expire in 30 days
        const token = sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
                email,
                nickname,
                rol
            },
            "secret"
        );
    // console.log(token)

        const serialized = serialize("myTokenName", token, {
            httpOnly: true,
            secure: "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: "/",
        });

        res.setHeader("Set-Cookie", serialized);
        if(myTokenName){return res.status(200).json({
            message: "Usuario logeado",
        });}
        if (rol) {
            return res.status(200).json({
                message: "Successful login: admin",
            });
        }
        return res.status(200).json({
            message: "Successful login: user",
        });
    }

    return res.status(401).json({ error: "Invalid credentials" });
}