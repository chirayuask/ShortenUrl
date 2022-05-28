const { bodyvalidation, rankingValidation, trimName } = require("../middleware/requestBodyValidation");
const db = require("../models")
const jwt = require('jsonwebtoken');

const getAllTables = async (req, res) => {
    try {
        let user = jwt.decode(req.headers.token);
        let tableDoc = await db.tables.findAll({
            where: { userid: user.id },
            include: [{
                model: db.rankings,
                as: "rankings"
            }],
            order: [["createdAt", "DESC"]]
        })
        let dataArr = [];
        for (let doc of tableDoc) {
            dataArr.push({
                topicsName: doc.topicsName,
                rankings: doc.rankings.rankings
            })
        }
        return res.status(200).send(dataArr)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

const createTables = async (req, res) => {
    try {
        let user = jwt.decode(req.headers.token);
        let requestbody = bodyvalidation(req.body)
        if (requestbody) {
            let rankValidation = rankingValidation(req.body.rankings)
            if (rankValidation) {
                let checkIfExists = await db.tables.findOne({
                    where: {
                        topicsName: trimName(req.body.topicsName)
                    }
                })
                if (!checkIfExists) {
                    let tableCreation = await db.tables.create({ topicsName: trimName(req.body.topicsName), userid: user.id })
                    if (tableCreation) {
                        let rankingCreation = await db.rankings.create({ rankings: trimName(req.body.rankings), tableId: tableCreation.id })
                    }
                    return res.status(200).send("Document created successfully")
                } else {
                    let updateRanking = await db.rankings.update({ rankings: trimName(req.body.rankings) }, { where: { tableId: checkIfExists.Id } })
                    return res.status(200).send("Ranking updated successfully")
                }
            } else {
                return res.status(203).send(`Please enter rankings between 1 and 100`)
            }
        } else {
            return res.status(203).send(`Please enter input as "topicsName" and "rankings"`)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

module.exports = {
    getAllTables,
    createTables
}