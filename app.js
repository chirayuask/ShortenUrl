let express = require('express');
const { urlShortnerCron } = require('./controller/urlShortner');
const db = require('./models');

let app = express();
// middleware for retriving request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Users
let login = require("./routes/login")
app.use("/api/v1/habuild", login)

let tables = require("./routes/tables")
app.use('/api/v1/habuild/login', tables);

let urlShortner = require("./routes/urlShortner")
app.use("/api/v1/habuild/login", urlShortner)

const PORT = process.env.PORT || 3000;


app.get('/:identifierId', async (req, res) => {
    const findUrl = await db.urlShortner.findOne({
        where: {
            identifier: req.params.identifierId
        }
    })
    let updateDoc = await db.urlShortner.update({
        clicks: findUrl.clicks++
    }, {
        where: { id: findUrl.id }
    })
    return res.redirect(findUrl.fullURL)
})

app.listen(PORT, "127.0.0.1", () => {
    console.log(`server is running on port ${PORT}`);
    urlShortnerCron.start()
});