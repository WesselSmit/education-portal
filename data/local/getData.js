const json = require('./resource-page-content.json')

module.exports = (resource) => {
    return json.find(data => data.title === resource)
}