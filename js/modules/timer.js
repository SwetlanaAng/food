function timer(deadLine) {
function setTimer(endTime) {
        const days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timerInterval = setInterval(updateTimer, 1000);
        updateTimer();
        function updateTimer() {
            const t = findRemainingTime(endTime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.time <= 0) {
                clearInterval(timerInterval);
            }
        }
    }
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else return num;
    }
    function findRemainingTime(deadLine) {
        let days, minutes, hours, seconds;
        const time = new Date(deadLine) - new Date();
        if (time < 0) {
            days = 0;
            minutes = 0;
            hours = 0;
            seconds=0;
        } else {
            days = Math.floor(time / 86400000),
            hours = Math.floor((time % 86400000) / 3600000),
            minutes = Math.floor(((time % 86400000) % 3600000) / 60000),
            seconds = Math.floor((((time % 86400000) % 3600000) % 60000) / 1000);
        }
        return {
            'time': time,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
        
    }
    setTimer(deadLine);
    

}
export default timer;