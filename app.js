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

setInterval(timer, 1000)