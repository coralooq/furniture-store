let count = 0;
let buttons = document.querySelector('.reviews');

buttons.addEventListener('click', function(event) {
    if(event.target.className == 'reviews__previous') {
        let oldCount = count;
        count--;
        if(count < 0) count = 9;
        let currentReview = document.querySelector(`.review-${count}`);
        let lastReview = document.querySelector(`.review-${oldCount}`);
        lastReview.classList.add('invis');
        currentReview.classList.remove('invis');
    };
    if(event.target.className == 'reviews__next') {
        let oldCount = count;
        count++;
        if(count > 9) count = 0;
        let currentReview = document.querySelector(`.review-${count}`);
        let lastReview = document.querySelector(`.review-${oldCount}`);
        lastReview.classList.add('invis');
        currentReview.classList.remove('invis');
    }
})


