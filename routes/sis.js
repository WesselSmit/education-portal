const json = require('../data/resource-page-content')
const data = json.find(data => data.title === 'SIS')

module.exports = (req, res) => {
    res.render('../views/layouts/resource', { ...data })
}