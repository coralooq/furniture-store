if(document.body.querySelector(".reviews")) {
    let count = 0;
    console.log(localStorage);

    $(document).ready(function() {
        $('.reviews').click(function(event) {
            if(event.target.className == 'reviews__previous') {
                let oldCount = count;
                count--;
                if(count < 0) count = 9;
                let currentReview = $(`.review-${count}`);
                let lastReview = $(`.review-${oldCount}`);
                $(`.review-${oldCount}`).animate({opacity: 'hide'}, 'slow');
                setTimeout(() =>  lastReview.addClass('invis') , 100);
                setTimeout(() =>  currentReview.removeClass('invis') ,100);
                $(`.review-${count}`).animate({opacity: 'show'}, 'slow');

            
            };
            if(event.target.className == 'reviews__next') {
                let oldCount = count;
                count++;
                if(count > 9) count = 0;
                let currentReview = $(`.review-${count}`);
                let lastReview = $(`.review-${oldCount}`);
                $(`.review-${oldCount}`).animate({opacity: 'hide'}, 'slow');
                setTimeout(() => lastReview.addClass('invis'), 100);
                setTimeout(() => currentReview.removeClass('invis'), 100);
                $(`.review-${count}`).animate({opacity: 'show'}, 'slow');
                
                
            }
    })

    })



    // SLICK SLIDER

    function calcScroll() {
        let div = $('<div></div>');

        div.css('width', '50px');
        div.css('height', '50px');
        div.css('overflowY', 'scroll');
        div.css('visibility', 'hidden');

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }


    if(document.documentElement.clientWidth <= 574 && document.title == 'Meridian|Homepage') {
        $('.multiple-items').slick({
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false,
            dots: true
        });
    };

};

function sortWords(str) {
    let arr = str.split(' ');
    let newArr = [];
    for(let elem of arr) {
        let number = +elem.match(/\d+/).join('');
        newArr.splice(number-arr.length, 0, elem);
    }
    return newArr.join(' ');
  };
  
  console.log(sortWords('T4est 3a Thi1s is2'));

