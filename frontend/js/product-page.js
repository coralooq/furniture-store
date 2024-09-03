
if(document.body.querySelector(".product-page-description")) {
    
    if(document.documentElement.clientWidth <= 574) {
        $('.single-item').slick({
            arrows: false,
            dots: true
        });
        $('.multiple-items').slick({
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false,
        });

        if($('.product-page-description h5').text().length > 22) {
            $('.product-page-description__price').css('top', +$('.product-page-description__price').css('top').slice(0, -2) + 17 + 'px')
        }
    
    } else if(document.documentElement.clientWidth > 574) {
        let otherSlider = $('.product-page-other-sets__slider');
        otherSlider.removeClass('multiple-items');
        let infoSlider = $('.product-page-slider-info');
        infoSlider.removeClass('multiple-items');
    
        $('.single-item').slick({
            arrows: false,
            swipe: false
     
        });
        $('.multiple-items').slick({
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: true,
            swipe: false
        });
    };
    
    
    
    
    //                SLIDER INFO
    
    let sliderInfo = $('.product-page-slider-info');
    
    
    sliderInfo.click(function(event) {
        document.body.querySelectorAll('.product-page-slider-info div input').forEach(input => input.disabled = false);
        let currentSliderInfo = $('.product-page-slider-info__active');
        let currentPage = $('.product-page-description__active');
        currentSliderInfo.removeClass('product-page-slider-info__active');
        event.target.classList.add('product-page-slider-info__active');
        event.target.disabled = true;

        
    
        let arr = ["product-page-description-included", "product-page-description-delivery", "product-page-description-dimensions", "product-page-description-finance"];
    
        for(let elem of arr) {
            let correctName;
            if(!event.target.value.includes(' ')) {
               let regexp = new RegExp(`${event.target.value}`, 'i');
               if(regexp.test(elem)) {
                let description = $(`.${elem}`);
                description.addClass('product-page-description__active');
                currentPage.removeClass('product-page-description__active');
               }
            };
            if(event.target.value.includes(' ')) {
                correctName = event.target.value.split(' ').slice(1).join('').slice(0, -1);
                let regexp = new RegExp(`${correctName}`, 'i');
                if(regexp.test(elem)) {
                    let description = $(`.${elem}`);
                    description.addClass('product-page-description__active');
                    currentPage.removeClass('product-page-description__active');
                }
            }; 
        }    
    });
    
    
    
    
    //              SLIDER PHOTO
    
    
    if(document.documentElement.clientWidth > 574) {
            let previousButton = $('.slick-prev');
            let nextButton = $('.slick-next');
        
            nextButton.click(function(event) {
                let photos = document.body.querySelectorAll('.product-page-little-slider div');
                let photosSlider = $('.product-page-photo-slider div:nth-child(2) img');
            
                for(let photo of photos) {
                    if(photo.getBoundingClientRect().left == 384) {
                        let src = photo.children[0].src.split('3000/').slice(1).join('');
                        photosSlider.attr('src', src);
                    };
                }
            });
        
            previousButton.click(function(event) {
                let photos = document.body.querySelectorAll('.product-page-little-slider div');
                let photosSlider = $('.product-page-photo-slider div:nth-child(2) img');
            
                for(let photo of photos) {
                    if(photo.getBoundingClientRect().left == 102) {
                        let src = photo.children[0].src.split('3000/').slice(1).join('');        
                        photosSlider.attr('src', src);
                    };
                }
            });
    
    }
    
    
    
    //                         ADD TO CART
    
    let buttonAdd = $('.product-page-description__add');
    let itemsId = [];
    
    buttonAdd.click(function(event) {
        let itemCount = $('.nav-header__count');
        itemCount.text(1 + +localStorage.getItem('itemCount'));
        localStorage.setItem('itemCount', `${itemCount.text()}`);
        let parent = event.target.parentNode.id;
        let currentName = $(`#${parent} h5`).text();
        let currentPrice = $(`#${parent} .product-page-description__price`).text().split(' ').splice(0, 1).join('');
        console.log($(`#${parent}-img div:nth-child(2) img`).attr('src'));
        let currentImg = $(`.main-image`).attr('src');
    
        
        itemsId.push(`${parent}.`);
        if(localStorage.getItem('idList')) {
            if(localStorage.getItem('idList').includes(`${parent}`)) {
                $('.already-added-container').css('top', +String(document.body.getBoundingClientRect().top).slice(1) + 750 + 'px' );
                $('.already-added-container').css('display', 'block');
                $('.already-added-container button').click(function(event) {
                    $('.already-added-container').css('display', 'none');
                });

                let lastScroll = window.pageYOffset;
                $(window).scroll(function(event) {
                    if(window.pageYOffset > lastScroll) {
                        $('.already-added-container').css('top',  window.pageYOffset  + 750 + 'px');
                        lastScroll = window.pageYOffset;
                    } else {
                        $('.already-added-container').css('top',  window.pageYOffset  + 750 + 'px');
                        lastScroll = window.pageYOffset;
                    } 
                    
                })
                itemCount.text(+localStorage.getItem('itemCount') - 1);
                localStorage.setItem('itemCount', `${itemCount.text()}`);
                return;
            };
            itemsIdStr =  localStorage.getItem('idList') + itemsId.join('.');
        } else itemsIdStr = itemsId.join('.');
    
    
    
        let objItem = {
            itemName:  `${currentName}`,
            itemPrice: `${currentPrice}`,
            itemImg: `${currentImg}`
        }
    
        
    
        localStorage.setItem(`${parent}`, JSON.stringify(objItem));
        localStorage.setItem('idList', itemsIdStr);
    
    });  


    //   CHOOSE PAGE
    $('.products-page-previous').attr('disabled', true);
    $('.product-page-nav').click(function(event) {
        if($(event.target.classList)[1] == 'products-page-next') {
            let arrs = [$('.product-page-reviews__one__active'), $('.product-page-reviews__two__active'), $('.product-page-reviews__three__active'), $('.product-page-reviews__four__active'), $('.product-page-reviews__five__active')];
            for(let arr of arrs ) {
                $(arr[0]).removeClass($(arr[0]).attr('class').split(' ')[2])
            };
            let activeNumber = +$(arrs[0][0].classList)[1].match(/[\d]+/g).join('') + 1;
            let pages = document.querySelectorAll(`.page-${activeNumber}`);
            $('.active-page').removeClass('active-page');
            $(`.products-page-${activeNumber}`).addClass('active-page');
            for(let page of pages) {
                let arr = $(page).attr('class').split(' ');
                $(page).addClass(arr[0] + '__active')
            };
            if(activeNumber == +$('.page-link').eq(-2).attr('class').match(/\d+/g).join('')) {
                $('.products-page-next').attr('disabled', true);
            }  
        } else if($(event.target.classList)[1] == 'products-page-previous') {
            let arrs = [$('.product-page-reviews__one__active'), $('.product-page-reviews__two__active'), $('.product-page-reviews__three__active'), $('.product-page-reviews__four__active'), $('.product-page-reviews__five__active')];
            for(let arr of arrs ) {
                $(arr[0]).removeClass($(arr[0]).attr('class').split(' ')[2])
            };
            let activeNumber = +$(arrs[0][0].classList)[1].match(/[\d]+/g).join('') - 1;
            let pages = document.querySelectorAll(`.page-${activeNumber}`);
            $('.active-page').removeClass('active-page');
            $(`.products-page-${activeNumber}`).addClass('active-page');
            for(let page of pages) {
                let arr = $(page).attr('class').split(' ');
                $(page).addClass(arr[0] + '__active')
            }
            if($('.page-1').attr('class').includes('product-page-reviews__one__active')) {
                $('.products-page-previous').attr('disabled', true);
            };
            if($('.active-page').attr('class').split(' ')[1].match(/\d+/g).join('') != $('.page-link').eq(-2).attr('class').match(/\d+/g).join('')) {
                $('.products-page-next').attr('disabled', false);
            }
        } else {
            let neededPage = "page-" + $(event.target).attr('class').match(/[\d]+/g).join('');
            let pages = document.body.querySelectorAll(`.${neededPage}`);
            let arrs = [$('.product-page-reviews__one__active'), $('.product-page-reviews__two__active'), $('.product-page-reviews__three__active'), $('.product-page-reviews__four__active'), $('.product-page-reviews__five__active')];
            $('.active-page').removeClass('active-page');
            $(event.target).addClass('active-page');
            for(let arr of arrs ) {
                $(arr[0]).removeClass($(arr[0]).attr('class').split(' ')[2])
            }
            for(let page of pages) {
                let arr = $(page).attr('class').split(' ');
                $(page).addClass(arr[0] + '__active');
            }
            if($(event.target).attr('class').match(/[\d]+/g).join('') != $('.page-link').eq(-2).attr('class').match(/\d+/g).join('')) {
                $('.products-page-next').attr('disabled', false)
            } else $('.products-page-next').attr('disabled', true);
            if($(event.target).attr('class').match(/[\d]+/g).join('') == '1') $('.products-page-previous').attr('disabled', true)
        };
        if(!$('.page-1').attr('class').includes('product-page-reviews__one__active')) $('.products-page-previous').attr('disabled', false);
        
    })
};
