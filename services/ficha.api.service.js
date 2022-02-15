const axios = require('axios')

class fichaService {
    constructor() {
    }

    async sendAtb(body) {
        const config = {
            method: 'put',
            url: `${process.env.botApiUrl}/ficha/atb/update`,
            headers: {
                "Authorization": process.env.apiToken,
                "Content-Type": "application/json"
            },
            data: {
                "id": body.id,
                "nomerpg": body.nomerpg,
                "tag": body.tag,
                "atb": body.atb,
                "valor": body.valor
            }
        }

        try {
            const res = await axios(config)
            return res
        }
        catch (err) {
            return err.response
        }
    }

    prepareExtra(body) {
        const extraBody = {
            ...body,
            atb: "extras",
            valor: `${body.atb}:${body.valor}`
        }

        return extraBody
    }

    async removeAtb(body) {
        const config = {
            method: 'delete',
            url: `${process.env.botApiUrl}/ficha/atb/remove`,
            headers: {
                "Authorization": process.env.apiToken,
                "Content-Type": "application/json"
            },
            data: {
                "id": body.id,
                "nomerpg": body.nomerpg,
                "tag": body.tag,
                "atb": body.atb,
                "valor": body.valor
            }
        }

        try {
            const res = await axios(config)
            return res
        }
        catch (err) {
            return err.response
        }
    }

    prepareExtraRemove(body) {
        const extraBody = {
            ...body,
            atb: "extras",
            valor: `${body.atb}:excluir`
        }

        return extraBody
    }

    async updateFicha(body) {
        const config = {
            method: 'patch',
            url: `${process.env.botApiUrl}/ficha/update`,
            headers: {
                "Authorization": process.env.apiToken,
                "Content-Type": "application/json"
            },
            data: {
                "id": body.id,
                "nomerpg": body.nomerpg,
                "tag": body.tag,
                "ficha": body.ficha
            }
        }

        try {
            const res = await axios(config)
            return res
        }
        catch (err) {
            return err.response
        }
    }

    async deleteFicha(body) {
        const config = {
            method: 'delete',
            url: `${process.env.botApiUrl}/ficha/delete`,
            headers: {
                "Authorization": process.env.apiToken,
                "Content-Type": "application/json"
            },
            data: {
                "id": body.id,
                "nomerpg": body.nomerpg,
                "tag": body.tag
            }
        }

        try {
            const res = await axios(config)
            return res
        }
        catch (err) {
            return err.response
        }
    }
}

module.exports = fichaService