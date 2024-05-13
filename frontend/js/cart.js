


if(document.body.querySelector(".cart-products__items")) {
    
    if(document.documentElement.clientWidth <= 574 && document.title == 'Cart Page') {
        $('.multiple-items').slick({
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false,
        });
    };

    //                              PLUS OR MINUS ITEM FROM CART

    let plusMinusItem = document.body.querySelector('.cart-products__items');
    let x = 1;
    let sum = 0;


    function plusMinus(n, x, currentPrice, total) {
        if(currentPrice == '0') {
            total.innerHTML = '£0';
            return;
        } 
        if(currentPrice.length == 3) {
            let arr = currentPrice.split('');
            arr.splice(0, 0, '£');
            arr.splice(arr.length, 0, '.00');
            total.innerHTML = arr.join('');
        } else if(currentPrice.length == n) {
            let arr = currentPrice.split('');
            arr.splice(x, 0, ',');
            arr.splice(0, 0, '£');
            arr.splice(arr.length, 0, '.00');
            total.innerHTML = arr.join('');
        } else plusMinus(n+1, x+1, currentPrice, total)
        
    };

    window.addEventListener('load', function(event) {
        let count = 10;
        for(let i = 1; i <= count; i++) {
            let total = document.querySelector(`.cart-products__items__item-${i}__total`);
            let checkOutPrice = document.querySelector('.cart-checkout__price');
            let totalPrice = this.document.querySelector('.cart-checkout__total-price');
            sum += +total.innerHTML.match(/[\d]+/g).join('').slice(0,-2);
            plusMinus(4, x, sum.toString(), checkOutPrice);
            plusMinus(4, x, sum.toString(), totalPrice);
        }
    })

    plusMinusItem.addEventListener('click', function(event) {
        let count = 10;
        if(event.target.className.includes('plus')) {
            for(let i = 1; i <= count; i++) {
                if(event.target.className.includes(`item-${i}`)) {
                    let amount = document.querySelector(`.cart-products__items__item-${i}__value`);
                    amount.value = +amount.value + 1;
                    let total = document.querySelector(`.cart-products__items__item-${i}__total`);
                    let totalPrice = document.querySelector('.cart-checkout__total-price');
                    let checkOutPrice = document.querySelector('.cart-checkout__price');
                    let realPrice = 0;
                    if(+amount.value <= 2) {
                        realPrice = +total.innerHTML.match(/[\d]+/g).join('').slice(0,-2);
                    } else realPrice = +total.innerHTML.match(/[\d]+/g).join('').slice(0,-2) / (+amount.value-1);
                    let currentPrice = (realPrice * +amount.value).toString();
                    sum += realPrice;
                    console.log(sum);
                    plusMinus(4, x, currentPrice, total);
                    plusMinus(4, x, sum.toString(), totalPrice);
                    plusMinus(4, x, sum.toString(), checkOutPrice);
                    
                }
            }
        };
        if(event.target.className.includes('minus')) {
            for(let i = 1; i <= count; i++) {
                if(event.target.className.includes(`item-${i}`)) {
                    let amount = document.querySelector(`.cart-products__items__item-${i}__value`);
                    amount.value = +amount.value - 1;
                    let total = document.querySelector(`.cart-products__items__item-${i}__total`);
                    let totalPrice = document.querySelector('.cart-checkout__total-price');
                    let checkOutPrice = document.querySelector('.cart-checkout__price');
                    let realPrice = 0;
                    if(+amount.value >= 0) {
                        realPrice = +total.innerHTML.match(/[\d]+/g).join('').slice(0,-2) / (+amount.value+1);
                    } 
                    if(+amount.value < 1) {
                        amount.value = '1';
                        return;
                    };

                    let currentPrice = (realPrice * +amount.value).toString();

                    sum -= realPrice;
                    plusMinus(4, x, currentPrice, total);
                    plusMinus(4, x, sum.toString(), totalPrice);
                    plusMinus(4, x, sum.toString(), checkOutPrice);
                }
            }
        };

    });
};


