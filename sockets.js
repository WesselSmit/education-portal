const { readJSON } = require('#data/mongodb/transform/utlis')

const users = []

function addUser(room, socket) {
    users.push({ id: socket.id, room })
}

function getUser(id) {
    return users.find(user => user.id === id)
}

function getUserIndex(id) {
    return users.findIndex(user => user.id === id)
}

module.exports = io => {

    io.on('connection', socket => {

        socket.on('join', room => {

            addUser(room, socket)

            socket.join(room)

            const data = readJSON('./data/local/urgent-announcements.json')

            data.announcements.forEach(announcement => {
                if (announcement.urgent) {
                    setTimeout(() => {
                        socket.emit('urgent-announcement', announcement)
                    }, announcement.secondsBeforeShow * 1000)
                }
            })




            socket.on('disconnect', () => {
                const user = getUser(socket.id)
                socket.leave(user.room)

                const index = getUserIndex(socket.id)
                users.splice(index, 1)
            })
        })
    })
}