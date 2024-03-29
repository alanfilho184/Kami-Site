module.exports = class api_ficha_controller {
    constructor(client) {
        const { Router } = require('express');
        const routes = Router()

        const cors = require('cors')
        const corsConfig = {
            origin: process.env.corsAllow.split(",")
        }

        const fichaServices = require('../../services/ficha.api.service')
        const services = new fichaServices(client)

        routes.post("/atb/add", cors(corsConfig), async (req, res) => {
            if (req.session.validation == process.env.validation) {
                try {
                    const response = await services.updateAtbFicha(req.body)
                    if (response.status == 200) {
                        res.status(200).send(response.data)
                    }
                    else {
                        res.status(response.status).send(response.data)
                    }
                }
                catch (err) {
                    res.status(500).end()
                }
            }
            else {
                res.status(401).end()
            }
        })

        routes.delete("/atb/remove", cors(corsConfig), async (req, res) => {
            if (req.session.validation == process.env.validation) {
                try {
                    const response = await services.removeAtbFicha(req.body)

                    if (response.status == 200) {
                        res.status(200).send(response.data)
                    }
                    else {
                        res.status(response.status).send(response.data)
                    }
                }
                catch (err) {
                    res.status(500).end()
                }
            }
            else {
                res.status(401).end()
            }
        })

        routes.post("/create", cors(corsConfig), async (req, res) => {
            if (req.session.validation == process.env.validation) {
                try {
                    const response = await services.createFicha(req.body)
                    if (response.status == 200) {
                        res.status(200).send(response.data)
                    }
                    else {
                        res.status(response.status).send(response.data)
                    }
                }
                catch (err) {
                    client.log.error(err)
                    res.status(500).end()
                }
            }
            else {
                res.status(401).end()
            }
        })

        routes.patch("/update", cors(corsConfig), async (req, res) => {
            if (req.session.validation == process.env.validation) {
                try {
                    const response = await services.updateFicha(req.body)

                    if (response.status == 200) {
                        res.status(200).send(response.data)
                    }
                    else {
                        res.status(response.status).send(response.data)
                    }
                }
                catch (err) {
                    res.status(500).end()
                }
            }
            else {
                res.status(401).end()
            }
        })

        routes.patch("/rename", cors(corsConfig), async (req, res) => {
            if (req.session.validation == process.env.validation) {
                try {
                    const response = await services.renameFicha(req.body)
                    if (response.status == 200) {
                        res.status(200).send(response.data)
                    }
                    else {
                        res.status(response.status).send(response.data)
                    }
                }
                catch (err) {
                    res.status(500).end()
                }
            }
            else {
                res.status(401).end()
            }
        })

        routes.delete("/delete", cors(corsConfig), async (req, res) => {
            if (req.session.validation == process.env.validation) {
                try {
                    const response = await services.deleteFicha(req.body)
                    if (response.status == 200) {
                        res.status(200).send(response.data)
                    }
                    else {
                        res.status(response.status).send(response.data)
                    }
                }
                catch (err) {
                    res.status(500).end()
                }
            }
            else {
                res.status(401).end()
            }
        })

        routes.post("/password", cors(corsConfig), async (req, res) => {
            if (req.session.validation == process.env.validation) {
                try {
                    const response = await services.getFichaWithPassword(req.body)

                    if (response.status === 200) {
                        req.session.access = {
                            [`${req.body.id}${req.body.nomerpg}`]: req.body.senha
                        }
                        req.session.cookie.maxAge = 1000 * 60 * 60 * 12

                        res.status(200).json({ id: req.body.id, nomerpg: req.body.nomerpg })
                    }
                    else {
                        res.status(response.status).send(response.data)
                    }
                }
                catch (err) {
                    res.status(500).end()
                }
            }
            else {
                res.status(401).json({
                    status: 401,
                    title: "Falha na validação",
                    text: "Este endpoint é somente para o servidor"
                })
            }
        })

        return { path: '/api/ficha/', router: routes }
    }
}