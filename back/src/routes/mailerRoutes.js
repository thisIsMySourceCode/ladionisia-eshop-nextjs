const { Router } = require("express");
const router = Router()
const { transporter } = require("../mailer/mailer");
const fs = require('fs');
router.post("/", async (req, res) => {
    const { userEmail, newsletter, products } = req.body
    console.log(req.body)
    try {

        if (newsletter) {
            const file = fs.readFileSync('src/mailer/newsLetter/email.html');
            console.log("./mailer/newsLetter/email.html")
            await transporter.sendMail({
                from: "La Dionisia <ladionisiapf@gmail.com>",
                to: userEmail,
                subject: "Suscripcion exitosa!",
                html: file
            })
            res.status(200).json("Email de suscripcion enviado")

        } else {
            const totalPrice = products.reduce((acc, curr) => acc + (curr.quantity * curr.product.price), 0)
            await transporter.sendMail({
                from: "La Dionisia <ladionisiapf@gmail.com>",
                to: userEmail,
                subject: "Your purchase was succesfull!",
                html: `
            <h2> The purchase of the products in your cart was successful</h2>
            <h1>Your total purchase was : $${totalPrice}</h1>
            ${products.map(p => {
                    return (`
                    <div>
                    <p><b>${p.product.wine} <span>(X${p.quantity})</span><b/></p>
                    <img src="${p.product.image}"/>
                    </div>
                   `)
                })}
            `
            })
            res.status(200).json("Compra realizada")
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router;

