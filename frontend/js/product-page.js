
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
    
    } else if(document.documentElement.clientWidth > 574) {
        let otherSlider = document.body.querySelector('.product-page-other-sets__slider');
        otherSlider.classList.remove('multiple-items');
        let infoSlider = document.body.querySelector('.product-page-slider-info');
        infoSlider.classList.remove('multiple-items');
    
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
    
    let sliderInfo = document.body.querySelector('.product-page-slider-info');
    
    
    sliderInfo.addEventListener('click', function(event) {
        document.body.querySelectorAll('.product-page-slider-info div input').forEach(input => input.disabled = false);
        let currentSliderInfo = document.body.querySelector('.product-page-slider-info__active');
        let currentPage = document.body.querySelector('.product-page-description__active');
        currentSliderInfo.classList.remove('product-page-slider-info__active');
        event.target.classList.add('product-page-slider-info__active');
        event.target.disabled = true;

        
    
        let arr = ["product-page-description-included", "product-page-description-delivery", "product-page-description-dimensions", "product-page-description-finance"];
    
        for(let elem of arr) {
            let correctName;
            if(!event.target.value.includes(' ')) {
               let regexp = new RegExp(`${event.target.value}`, 'i');
               if(regexp.test(elem)) {
                let description = document.body.querySelector(`.${elem}`);
                description.classList.add('product-page-description__active');
                currentPage.classList.remove('product-page-description__active');
               }
            };
            if(event.target.value.includes(' ')) {
                correctName = event.target.value.split(' ').slice(1).join('').slice(0, -1);
                let regexp = new RegExp(`${correctName}`, 'i');
                if(regexp.test(elem)) {
                    let description = document.body.querySelector(`.${elem}`);
                    description.classList.add('product-page-description__active');
                    currentPage.classList.remove('product-page-description__active');
                }
            }; 
        }    
    });
    
    
    
    
    //              SLIDER PHOTO
    
    
    if(document.documentElement.clientWidth > 574) {
            let previousButton = document.body.querySelector('.slick-prev');
            let nextButton = document.body.querySelector('.slick-next');
            console.log(previousButton);
            console.log(nextButton);
        
            nextButton.addEventListener('click', function(event) {
                let photos = document.body.querySelectorAll('.product-page-little-slider div');
                let photosSlider = document.body.querySelector('.product-page-photo-slider div:nth-child(2) img');
            
                for(let photo of photos) {
                    if(photo.getBoundingClientRect().left == 384) {
                        let src = photo.children[0].src.split('3000/').slice(1).join('');
                        photosSlider.src = src;
                    };
                }
            });
        
            previousButton.addEventListener('click', function(event) {
                let photos = document.body.querySelectorAll('.product-page-little-slider div');
                let photosSlider = document.body.querySelector('.product-page-photo-slider div:nth-child(2) img');
            
                for(let photo of photos) {
                    console.log(photo.getBoundingClientRect().left);
                    console.log(photo);
                    if(photo.getBoundingClientRect().left == 102) {
                        let src = photo.children[0].src.split('3000/').slice(1).join('');        
                        photosSlider.src = src;
                    };
                }
            });
    
    }
    
    
    
    //                         ADD TO CART
    
    let buttonAdd = document.body.querySelector('.product-page-description__add');
    let headerItemCount = document.body.querySelector('.nav-header__count').innerHTML;
    let itemsId = [];
    
    buttonAdd.addEventListener('click', function(event) {
        //headerItemCount++;
        let itemCount = document.body.querySelector('.nav-header__count');
        itemCount.innerHTML = 1 + +localStorage.getItem('itemCount');
        console.log(itemCount.innerHTML)
        localStorage.setItem('itemCount', `${itemCount.innerHTML}`);
        let parent = event.target.parentNode.id;
        //let mainContainer = document.querySelector('.cart-products__items');
        let currentProduct = document.querySelector(`#${parent}`);
        let currentName = document.querySelector(`#${parent} h5`).innerHTML;
        let currentPrice = document.querySelector(`#${parent} .product-page-description__price`).innerHTML.split(' ').splice(0, 1).join('');
        let currentImg = document.querySelector(`#${parent}-img div:nth-child(2) img`).src.split('3000/').slice(1).join('');
    
        
        itemsId.push(`${parent}.`);
        if(localStorage.getItem('idList')) {
            if(localStorage.getItem('idList').includes(`${parent}`)) {
                alert('item was adeed');
                itemCount.innerHTML = +localStorage.getItem('itemCount') - 1;
                localStorage.setItem('itemCount', `${itemCount.innerHTML}`);
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
    
        console.log(localStorage);
    
    });    

    if(localStorage.getItem('itemCount')) {
        let itemsCount = document.body.querySelector('.nav-header__count');
        itemsCount.innerHTML = localStorage.getItem('itemCount');
    }
};
