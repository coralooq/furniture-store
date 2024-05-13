

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







    // SORT BY BUTTON

    let sortByRecentBtn = document.body.querySelector('.sort-by__container__btn-recent');
    let sortByRemoteBtn = document.body.querySelector('.sort-by__container__btn-remote');
    let sortByContainer = document.body.querySelector('.sort-by__container');
    let sortByCurrent = document.body.querySelector('.sort-by__container__current-sort');
    let lockerBtn = document.body.querySelector('.sort-by__container__locker');
    let productsFilter = document.body.querySelector('.products-filter');
    let categoryList = document.body.querySelector('.category-list');
    let blockedDiv = document.createElement('div');

    productsFilter.addEventListener('click', function(event) {
        categoryList.style.display = 'block';
        blockedDiv.classList.add('div-blocker');
        blockedDiv.style.opacity = '0.3';
        document.body.append(blockedDiv);
    })

    if(document.documentElement.clientWidth <= 574) {
        sortByContainer.style.top = '-3px'
    }


    lockerBtn.addEventListener('click', function(event) {
        lockerBtn.style.display = 'none'
        if(document.documentElement.clientWidth <= 574) {
            blockedDiv.style.opacity = '0.3'
            sortByContainer.style.height = '130px'
        } else sortByContainer.style.height = '170px';
        sortByContainer.style.overflow = 'none';
        blockedDiv.classList.add('div-blocker');
        document.body.append(blockedDiv);
        
    });

    function sortByRemote(event) {
        if(document.documentElement.clientWidth <= 574) {
            sortByContainer.style.height = '24px'
        } else sortByContainer.style.height = '74px';
        sortByContainer.style.overflow = 'hidden';
        blockedDiv.classList.remove('div-blocker');
        let remoteText = document.body.querySelector('.sort-by__btn-remote__text');
        sortByCurrent.innerHTML = remoteText.innerHTML + '<img src="images/down.jpg">';
        lockerBtn.style.display = 'block'
        let sortByCount = 1;
        for(let i = 12; i >= 1; i--) {
            let item = document.body.querySelector(`.products-catalog__item-${i}`);
            item.classList.remove(`products-catalog__item-${i}`);
            item.classList.add(`products-catalog__item-${sortByCount}`);
            sortByCount++;
        }
    };

    function sortByRecent(event) {
        if(document.documentElement.clientWidth <= 574) {
            sortByContainer.style.height = '24px'
        } else sortByContainer.style.height = '74px';
        sortByContainer.style.overflow = 'hidden';
        blockedDiv.classList.remove('div-blocker');
        let recentText = document.body.querySelector('.sort-by__btn-recent__text');
        sortByCurrent.innerHTML = recentText.innerHTML + '<img src="images/down.jpg">';
        lockerBtn.style.display = 'block'
        let sortByCount = 12;
        for(let i = 1; i <= 12; i++) {
            let item = document.body.querySelector(`.products-catalog__item-${i}`);
            item.classList.remove(`products-catalog__item-${i}`);
            item.classList.add(`products-catalog__item-${sortByCount}`);
            sortByCount--;
        }
    };

    sortByRemoteBtn.addEventListener('click', sortByRemote);
    sortByRecentBtn.addEventListener('click', sortByRecent);

    blockedDiv.addEventListener('click', function(event) {
        if(document.documentElement.clientWidth <= 574) {
            sortByContainer.style.height = '24px'
            blockedDiv.style.opacity = '0.3'
        } else sortByContainer.style.height = '74px';
        sortByContainer.style.overflow = 'hidden';
        blockedDiv.classList.remove('div-blocker');
        lockerBtn.style.display = 'block'
        categoryList.style.display = 'none';
    });





    
};

