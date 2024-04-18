let count = 0;
let buttons = document.querySelector('.reviews');


$(document).ready(function() {
    $('.reviews').click(function(event) {
        if(event.target.className == 'reviews__previous') {
            let oldCount = count;
            count--;
            if(count < 0) count = 9;
            let currentReview = document.querySelector(`.review-${count}`);
            let lastReview = document.querySelector(`.review-${oldCount}`);
            $(`.review-${oldCount}`).animate({opacity: 'hide'}, 'slow');
            setTimeout(() =>  lastReview.classList.add('invis') , 100);
            setTimeout(() =>  currentReview.classList.remove('invis') ,100);
            $(`.review-${count}`).animate({opacity: 'show'}, 'slow');

          
        };
        if(event.target.className == 'reviews__next') {
            let oldCount = count;
            count++;
            if(count > 9) count = 0;
            let currentReview = document.querySelector(`.review-${count}`);
            let lastReview = document.querySelector(`.review-${oldCount}`);
            $(`.review-${oldCount}`).animate({opacity: 'hide'}, 'slow');
            setTimeout(() => lastReview.classList.add('invis'), 100);
            setTimeout(() => currentReview.classList.remove('invis'), 100);
            $(`.review-${count}`).animate({opacity: 'show'}, 'slow');
            
            
        }
})

})