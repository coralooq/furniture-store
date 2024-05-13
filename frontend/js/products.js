

if(document.body.querySelector('.collection-title')) {
    // TIMER
    let seconds = 8;
    let minutes = 1;
    let hours = 20;

    function timerSec(count) {
        if(count == 0) {
            seconds = 59;
            timerMin(minutes);
            return 60; 
        }
        count--;
        seconds = count;
        
    };

    function timerMin(count) {
        if(count == 0) {
            minutes = 59;
            timerHrs(hours)
            return 60; 
        }
        count--;
        minutes = count;
    };


    function timerHrs(count) {
        if(count == 0) return;
        count--;
        hours = count;
    };

    function timer() {
        let timer = document.body.querySelector('.products-sale__timer');
        let checkedSec = seconds;
        let checkedMin = minutes;
        let checkedHrs = hours;
        if(seconds < 10) {
            checkedSec = '0' + seconds
        };
        if(minutes < 10) {
            checkedMin = '0' + minutes
        };
        if(hours < 10) {
            checkedHrs = '0' + hours
        };
        timer.innerHTML = `${checkedHrs}:${checkedMin}:${checkedSec}`;
    }
   

    window.addEventListener('load', function(event) {
        if(localStorage.length > 3) {
            seconds = localStorage.getItem('seconds');
            minutes = localStorage.getItem('minutes');
            hours = localStorage.getItem('hours');
        }
        setInterval(() => timerSec(seconds), 1000);
        setInterval(() => timer(), 1000);
    })

    window.addEventListener('unload', function(event) {
        localStorage.setItem('seconds', seconds);
        localStorage.setItem('minutes', minutes);
        localStorage.setItem('hours', hours);
    });
};




   