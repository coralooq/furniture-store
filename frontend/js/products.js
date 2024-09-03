

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
        let timer = $('.products-sale__timer');
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
        timer.text(`${checkedHrs}:${checkedMin}:${checkedSec}`);
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

    let sortByRecentBtn = $('.sort-by__btn-recent');
    let sortByRemoteBtn = $('.sort-by__btn-remote');
    let sortByContainer = $('.sort-by__btn');
    let sortByMenu = $('.sort-by__menu');
    sortByMenu.hide();
    let productsFilter = $('.products-filter');
    let categoryList = $('.category-list');
    let blockedDiv = $('<div></div>');


    sortByContainer.click(function(event) {
        sortByMenu.toggle(100);
        sortByMenu.css('background', '#f9f8f8');
        blockedDiv.addClass('div-blocker');
        document.body.append(blockedDiv[0]);
    })

    function sortByRemote(event) {
        let a = document.querySelectorAll('.catalog-items');
        let arr1 = [1,2,3,4,5,6,7,8,9,10,11,12];
        let sortByCount = 12;
        for(let elem of arr1) {
            $(`.products-catalog__item-${elem}`).removeClass(`products-catalog__item-${elem}`);
        };
        for(let elem of a) {
            $(elem).addClass(`products-catalog__item-${sortByCount}`);
            sortByCount--
        };
        sortByMenu.hide();
        sortByContainer.val('Most remote');
    };

    function sortByRecent(event) {
        let a = document.querySelectorAll('.catalog-items');
        let arr1 = [1,2,3,4,5,6,7,8,9,10,11,12];
        let sortByCount = 1;
        for(let elem of arr1) {
            $(`.products-catalog__item-${elem}`).removeClass(`products-catalog__item-${elem}`);
        };
        for(let elem of a) {
            $(elem).addClass(`products-catalog__item-${sortByCount}`);
            sortByCount++
        };
        sortByMenu.hide();
        sortByContainer.val('Most recent');
    };
   
    sortByRemoteBtn.click(sortByRemote);
    sortByRecentBtn.click(sortByRecent);

    blockedDiv.click(function(event) {
        if(document.documentElement.clientWidth <= 574) categoryList.hide();
        blockedDiv.removeClass('div-blocker');
        blockedDiv.css('opacity', '0');
        sortByMenu.hide();
    });

    // MOBILE

    productsFilter.click(function(event) {
        categoryList.css('display', 'block');
        blockedDiv.addClass('div-blocker');
        blockedDiv.css('opacity', '0.3');
        document.body.append(blockedDiv[0]);
    });

    $('.category-list').click(function(event) {
        if(!$(event.target).attr('class').includes('category-list__input-btn')) return;
        if($(event.target).attr('class').includes('collapsed')) {
            categoryList.css('height', '730px');
        } else categoryList.css('height', '1170px');
    })



    //             PRICE RANGE


    let amountOne = $('#amount-1');
    let amountTwo = $('#amount-2');
    let amountOneCount = 0;
    let amountTwoCount = 4700;

    $( function() {
        $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 4700,
        values: [ 75, 4700 ],
        slide: function( event, ui ) {
            $( "#amount-1" ).val( "£" + ui.values[ 0 ]);
            $( "#amount-2" ).val( "£" + ui.values[ 1 ]);
            //console.log(+amountOne.value.slice(1));
            let count;
            if(+amountTwo.val().slice(1) < amountTwoCount) {
                
                for(let i = 1; i <= 12; i++) {
                    let price = $(`.products-catalog__item-${i} p`);
                    if(+amountTwo.val().slice(1) < +price.text().match(/[\d]+/g).join('').slice(0,-2)) {
                        let item = $(`.products-catalog__item-${i}`);
                        item.css('display', 'none');          
                    } 
                
                }
            }
            if(+amountTwo.val().slice(1) <= amountTwoCount) {
                for(let i = 1; i <= 12; i++) {
                    let price = $(`.products-catalog__item-${i} p`);
                    if(+amountTwo.val().slice(1) >= +price.text().match(/[\d]+/g).join('').slice(0,-2)) {
                        let item =$(`.products-catalog__item-${i}`);
                        item.css('display', 'block');                    
                    }
                
                }
            }

            if(+amountOne.val().slice(1) > amountOneCount) {
                for(let i = 1; i <= 12; i++) {
                    let price = $(`.products-catalog__item-${i} p`);
                    if(+amountOne.val().slice(1) > +price.text().match(/[\d]+/g).join('').slice(0,-2)) {
                        let item = $(`.products-catalog__item-${i}`);
                        item.css('display', 'none');                       
                    }

                
                }
            }
            if(+amountOne.val().slice(1) < amountOneCount) {
                for(let i = 1; i <= 12; i++) {
                    let price = $(`.products-catalog__item-${i} p`);
                    if(+amountOne.val().slice(1) < +price.text().match(/[\d]+/g).join('').slice(0,-2)) {
                        let item = $(`.products-catalog__item-${i}`);
                        item.css('display', 'block');     
                    }
                   
                    
                }
            }

        }
        });
        
    });

    let clearAllBtn = $('.category-list__clear');

    clearAllBtn.click(function(event) {
        let all = document.querySelectorAll('.category-list input');
        console.log(all);
        for(let elem of all) {
            elem.checked = false
        };
        $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: 4700,
            values: [ 0, 4700 ],
        
        })
        amountOne.val('£0');
        amountTwo.val('£4700');
        for(let i = 1; i <= 12; i++) {
            let product = $(`.products-catalog__item-${i}`);
            product.css('display', 'block');
        }

    });
};

if(localStorage.getItem('itemCount')) {
    let itemsCount = $('.nav-header__count');
    itemsCount.text(localStorage.getItem('itemCount'));
}

