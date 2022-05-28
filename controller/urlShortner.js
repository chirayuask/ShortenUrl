const { trimName } = require("../middleware/requestBodyValidation");
const db = require("../models")
var cron = require('node-cron');


const generateUrlShortner = async (req, res) => {
    try {
        let checkIfExists = await db.urlShortner.findOne({
            where: {
                fullURL: trimName(req.body.fullURL)
            }
        })
        if (checkIfExists) return res.status(200).send(`http://localhost:3000/${checkIfExists.identifier}`)
        let createUrl = await db.urlShortner.create({
            fullURL: trimName(req.body.fullURL)
        })

        return res.status(200).send(`http://localhost:3000/${createUrl.identifier}`)

    } catch (error) {
        if (error.errors[0].type === "unique violation") return res.status(203).send(error.errors[0].message)
        return res.status(500).send(error)
    }
}

let urlShortnerCron = cron.schedule("* * * * *", async () => {
    console.log('========================Starting Weekly attendance email to Manager===========================');

    console.log('========================Weekly attendance email Executed SuccessFully.===========================');
});


module.exports = {
    generateUrlShortner,
    urlShortnerCron
}