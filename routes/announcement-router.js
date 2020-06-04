const express = require('express')
const router = express.Router()

const announcements = require('#data/mongodb/transform/announcements')

function getAnnouncement(id) {
    return announcements()
        .then(data => data.find(item => item.newsItemId === id))
}

module.exports = router
    .use(express.static(__dirname + '../../public'))
    .get('/', async (req, res) => res.render('list-overview', {
        pageName: 'announcements-overview',
        announcements: await announcements()
    }))
    .get('/:id', async (req, res) => {
        const announcement = await getAnnouncement(req.params.id)
        res.render('announcement', {
            pageName: 'announcement-detail',
            announcement: announcement
        })
    })