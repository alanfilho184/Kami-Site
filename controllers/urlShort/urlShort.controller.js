const { Router } = require('express');
const routes = Router()

const urlShortService = require("../../services/urlShort.service")
const services = new urlShortService()

routes.get("/termos/:lang", (req, res) => {
    const lang = req.params.lang

    if (lang == "pt") {
        res.redirect(`https://docs.google.com/document/d/10nngrKxxgIjC03EPjsstSuxkGkY90zT-nIT7owWSX5s/edit?usp=sharing`)
    }
    else {
        res.redirect(`https://docs.google.com/document/d/1eTWagnevvJqmFVKSrceCMdr-Y821Nhr7_lX8G6JvR6U/edit?usp=sharing`)
    }
});

routes.get("/convite", async (req, res) => {
    const inviteLink = await services.getInviteLink()
    res.redirect(inviteLink)
})


module.exports = { path: '/short/', router: routes }