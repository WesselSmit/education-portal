const scheduleMaster = document.querySelector('#schedule')
const scheduleContainer = scheduleMaster.querySelector('#schedules-container')
const dateElement = scheduleMaster.querySelector('#navigator span')
const previousSchedule = scheduleMaster.querySelector('#navigator img:first-of-type')
const nextSchedule = scheduleMaster.querySelector('#navigator img:last-of-type')

export default function scheduleHandler() {
    let scheduleIndex = 0
    arrowHandler(scheduleIndex)

    previousSchedule.addEventListener('click', () => {
        scheduleIndex--
        arrowHandler(scheduleIndex)
        renderSchedules(scheduleIndex)
    })

    nextSchedule.addEventListener('click', () => {
        scheduleIndex++
        arrowHandler(scheduleIndex)
        renderSchedules(scheduleIndex)
    })
}


// Helpers
function renderSchedules(scheduleIndex) {
    getSchedules()
        .then(schedules => {
            const schedule = schedules[scheduleIndex]
            const divs = schedule.schedules.map(schedule => createScheduleItem(schedule))

            dateElement.textContent = `${schedule.day}-${schedule.month}-${schedule.year}`

            scheduleContainer.textContent = ''
            divs.forEach(div => scheduleContainer.append(div))
        })
}

function arrowHandler(index) {
    index === 0 ? previousSchedule.classList.add('disabled') : previousSchedule.classList.remove('disabled')
    index === 4 ? nextSchedule.classList.add('disabled') : nextSchedule.classList.remove('disabled')
}

function createScheduleItem(schedule) {
    const schedule_time = `${schedule.startDateTime.time} - ${schedule.endDateTime.time}`
    const schedule_coursename = schedule._links.courses[0].title
    const schedule_teacher = schedule._links.lecturers[0].title

    let schedule_room
    schedule._embedded ? schedule_room = schedule._embedded.rooms[0].abbreviation : schedule_room = 'No room'

    const div = document.createElement('div')
    const time = document.createElement('p')
    const coursename = document.createElement('p')
    const room = document.createElement('p')
    const teacher = document.createElement('p')

    time.textContent = schedule_time
    coursename.textContent = schedule_coursename
    room.textContent = schedule_room
    teacher.textContent = schedule_teacher

    div.append(time)
    div.append(coursename)
    div.append(room)
    div.append(teacher)

    div.classList.add('schedule-course')

    return div
}

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}

// Data
function getSchedules() {
    return fetch('/schedule', options)
        .then(res => res.json())
}