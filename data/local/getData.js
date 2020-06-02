const { readJSON } = require('#data/mongodb/transform/utlis')

module.exports = (resource) => {
    const json = readJSON('./data/local/resource-page-content.json')
    return json.find(data => data.title === resource)
}