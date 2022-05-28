
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 15);

let genrateUUI = () => {
    return nanoid()
}

const pentaid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz!@#$%&", 5)
let generatePentaId = () => {
    return pentaid()
}

module.exports = { genrateUUI, generatePentaId };