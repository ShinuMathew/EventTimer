const daysOfWeek = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6
}

const serviceDays = [{
        day: daysOfWeek.WEDNESDAY,
        hours: 19,
        minute: 0
    },
    {
        day: daysOfWeek.SATURDAY,
        hours: 10,
        minute: 30
    },
    {
        day: daysOfWeek.SATURDAY,
        hours: 18,
        minute: 30
    },
    {
        day: daysOfWeek.SUNDAY,
        hours: 10,
        minute: 00
    }
]

function fetchNextEventOccurences() {
    let currentDate = new Date()


    let upcomingServiceDate = serviceDays.map(d => {

        let currentYear = currentDate.getFullYear()
        let currentMonth = currentDate.getMonth()

        // Get the next date on the calendar for the serviceDays entry
        let nextExpectedOccurrence = new Date()

        // Set Date of the next occurrence
        let nextDate = currentDate.getDate() + _getDateForDay(d.day)
        let totalDaysOfMonth = _getTotalDaysOfTheMonth()

        // Set Month and Year of the next occurrence
        if (nextDate > totalDaysOfMonth)
            currentMonth += 1
        if (currentMonth > 12) {
            currentMonth = 11 - (currentMonth - 1)
            currentYear += currentYear
        }

        nextDate = nextDate > totalDaysOfMonth ? nextDate - totalDaysOfMonth : nextDate

        // Set date values
        nextExpectedOccurrence.setDate(nextDate)
        nextExpectedOccurrence.setMonth(currentMonth)
        nextExpectedOccurrence.setFullYear(currentYear)
        nextExpectedOccurrence.setHours(d.hours)
        nextExpectedOccurrence.setMinutes(d.minute)
        nextExpectedOccurrence.setSeconds(0)
        if(nextExpectedOccurrence < currentDate)
            nextExpectedOccurrence.setDate(nextDate + 7)
        return nextExpectedOccurrence
    })
    upcomingServiceDate.sort((d1, d2) => d1 - d2)
    console.log(upcomingServiceDate)

    let currentDateNumber = currentDate.getDate()
    let currentHour = currentDate.getHours()
    let currentSecond = currentDate.getSeconds()
    let currentMinute = currentDate.getMinutes()

    let daysLeft = Math.abs(upcomingServiceDate[0].getDate() - currentDateNumber)
    let hoursLeft = Math.abs(upcomingServiceDate[0].getHours() - currentHour)
    let minutesLeft = Math.abs(upcomingServiceDate[0].getMinutes() - currentMinute)
    let secondsLeft = 60 - Math.abs(upcomingServiceDate[0].getSeconds() - currentSecond)

    console.log(`${daysLeft} | ${hoursLeft} | ${minutesLeft} | ${secondsLeft} `)

    return {
        daysLeft,
        hoursLeft,
        minutesLeft,
        secondsLeft
    }
}

function _getDateForDay(day) {
    let currentDate = new Date()
    let currentDay = currentDate.getDay()
    let expectedDateOffset = (day < currentDay) ? (7 - currentDay) + day : day - currentDay
    return expectedDateOffset
}

function _getTotalDaysOfTheMonth() {
    let dt = new Date()
    let month = dt.getMonth() + 1
    var year = dt.getFullYear();
    return new Date(year, month, 0).getDate();
}

var prevDay;
var prevHour;
var prevMinute;
var prevSecond;

let timer = () => {

    var secondDiv = document.querySelector('.second')
    var minuteDiv = document.querySelector('.minute')
    var hourDiv = document.querySelector('.hour')
    var dayDiv = document.querySelector('.day')

    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentHour = currentDate.getHours();
    var currentMinute = currentDate.getMinutes();
    var currentSecond = currentDate.getSeconds();

    secondDiv.classList.remove("flapped")
    minuteDiv.classList.remove("flapped")
    hourDiv.classList.remove("flapped")
    dayDiv.classList.remove("flapped")

    if (currentSecond != prevSecond)
        secondDiv.classList.add("flapped")
    if (currentMinute != prevMinute)
        minuteDiv.classList.add("flapped")
    if (currentHour != prevHour)
        hourDiv.classList.add("flapped")
    if (currentDay != prevDay)
        dayDiv.classList.add("flapped")

    dayDiv.innerHTML = `<h3>${currentDay}</h3>`
    hourDiv.innerHTML = `<h3>${currentHour}</h3>`
    minuteDiv.innerHTML = `<h3>${currentMinute}</h3>`
    secondDiv.innerHTML = `<h3>${currentSecond}</h3>`

    prevDay = currentDay;
    prevHour = currentHour;
    prevMinute = currentMinute;
    prevSecond = currentSecond;

}

let getCountDown = () => {
    let nextOccurence = fetchNextEventOccurences()

    var secondDiv = document.querySelector('.second')
    var minuteDiv = document.querySelector('.minute')
    var hourDiv = document.querySelector('.hour')
    var dayDiv = document.querySelector('.day')

    console.log(nextOccurence)

    var currentDay = nextOccurence.daysLeft
    var currentHour = nextOccurence.hoursLeft
    var currentMinute = nextOccurence.minutesLeft
    var currentSecond = nextOccurence.secondsLeft

    secondDiv.classList.remove("flapped")
    minuteDiv.classList.remove("flapped")
    hourDiv.classList.remove("flapped")
    dayDiv.classList.remove("flapped")

    if (currentSecond != prevSecond)
        secondDiv.classList.add("flapped")
    if (currentMinute != prevMinute)
        minuteDiv.classList.add("flapped")
    if (currentHour != prevHour)
        hourDiv.classList.add("flapped")
    if (currentDay != prevDay)
        dayDiv.classList.add("flapped")

    dayDiv.innerHTML = `<h3>${currentDay}</h3>`
    hourDiv.innerHTML = `<h3>${currentHour}</h3>`
    minuteDiv.innerHTML = `<h3>${currentMinute}</h3>`
    secondDiv.innerHTML = `<h3>${currentSecond}</h3>`

    prevDay = currentDay;
    prevHour = currentHour;
    prevMinute = currentMinute;
    prevSecond = currentSecond;
}

setInterval(getCountDown, 1000)