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
            let total = $(`.cart-products__items__item-${i}__total`);
            let checkOutPrice = $('.cart-checkout__price');
            let totalPrice = $('.cart-checkout__total-price');
            sum += +total.text().match(/[\d]+/g).join('').slice(0,-2);
            plusMinus(4, x, sum.toString(), checkOutPrice[0]);
            plusMinus(4, x, sum.toString(), totalPrice[0]);
        }
    })

    $('.cart-products__items').click(function(event) {
        let count = 10;
        if(event.target.className.includes('plus')) {
            for(let i = 1; i <= count; i++) {
                if(event.target.className.includes(`item-${i}`)) {
                    let amount = $(`.cart-products__items__item-${i}__value`);
                    amount.val(+amount.val() + 1);
                    let total = $(`.cart-products__items__item-${i}__total`);
                    let totalPrice = $('.cart-checkout__total-price');
                    let checkOutPrice = $('.cart-checkout__price');
                    let realPrice = 0;
                    if(+amount.value <= 2) {
                        realPrice = +total.text().match(/[\d]+/g).join('').slice(0,-2);
                    } else realPrice = +total.text().match(/[\d]+/g).join('').slice(0,-2) / (+amount.val()-1);
                    let currentPrice = (realPrice * +amount.val()).toString();
                    sum += realPrice;
                    console.log(sum);
                    plusMinus(4, x, currentPrice, total[0]);
                    plusMinus(4, x, sum.toString(), totalPrice[0]);
                    plusMinus(4, x, sum.toString(), checkOutPrice[0]);
                    
                }
            }
        };
        if(event.target.className.includes('minus')) {
            for(let i = 1; i <= count; i++) {
                if(event.target.className.includes(`item-${i}`)) {
                    let amount = $(`.cart-products__items__item-${i}__value`);
                    amount.val(+amount.val() - 1);
                    let total = $(`.cart-products__items__item-${i}__total`);
                    let totalPrice = $('.cart-checkout__total-price');
                    let checkOutPrice = $('.cart-checkout__price');
                    let realPrice = 0;
                    if(+amount.val() >= 0) {
                        realPrice = +total.text().match(/[\d]+/g).join('').slice(0,-2) / (+amount.val() + 1);
                    } 
                    if(+amount.val() < 1) {
                        amount.val('1');
                        return;
                    };

                    let currentPrice = (realPrice * +amount.val()).toString();

                    sum -= realPrice;
                    plusMinus(4, x, currentPrice, total[0]);
                    plusMinus(4, x, sum.toString(), totalPrice[0]);
                    plusMinus(4, x, sum.toString(), checkOutPrice[0]);
                }
            }
        };

    });




    //                     INPUT SHIP
    let checkedShip = false;
    $('.cart-checkout').click(function(event) {
        if(event.target.tagName != 'INPUT') return;
        let totalPrice = $('.cart-checkout__total-price');
        let premiumShipPrice = +$('.cart-checkout__premium-ship p span').text().match(/[\d]+/g).join('').slice(0,-2);
        if(event.target.closest('div').className == 'cart-checkout__premium-ship') {
            if(checkedShip) return;
            sum += premiumShipPrice;
            plusMinus(4, x, sum.toString(), totalPrice[0])
            checkedShip = true;
        } else {
            if(!checkedShip) return;
            sum -= premiumShipPrice;
            plusMinus(4, x, sum.toString(), totalPrice[0])
            checkedShip = false;
        };    
    })
    
    


    //                              LOAD AND DELETE ADDED ITEMS

    let countItems = 1;
    let containerItem;
    window.addEventListener('DOMContentLoaded', function(event) {
        let idList = localStorage.getItem('idList').split('.');
        let arridList = idList.splice(0, idList.length-1);

        for(let id of arridList) {
            let mainContainer = $('.cart-products__items');
            let itemInfo = JSON.parse(localStorage.getItem(`${id}`));
            let infoName = itemInfo.itemName;
            let infoPrice = itemInfo.itemPrice;
            let infoImg = itemInfo.itemImg;


            let cartQuantity = document.body.querySelector('.cart-quantity');
            if(arridList.length >= 2) {
                cartQuantity.innerHTML = `${arridList.length} items`;
            }  else cartQuantity.innerHTML = `1 item`;


            containerItem = $('<div></div>');
            containerItem.addClass(`cart-products__items__item-${countItems} cart-products__items__item`);
            containerItem.css('display', 'block');

            let itemImg = $('<img>');
            itemImg[0].src = infoImg;
            containerItem.append(itemImg);
            

            let itemName = $('<p></p>');
            itemName.text(infoName);
            itemName.addClass(`cart-products__items__item-${countItems}__name cart-products__items__item__name`);
            containerItem.append(itemName);

            let itemPlus = $('<button></button>');
            itemPlus.text('+');
            itemPlus.addClass(`cart-products__items__item-${countItems}__plus cart-products__items__item__plus`);
            containerItem.append(itemPlus);
            let itemMinus = $('<button></button>');
            itemMinus.text('-');
            itemMinus.addClass(`cart-products__items__item-${countItems}__minus cart-products__items__item__minus`);
            containerItem.append(itemMinus);
            let itemAmount = $('<input>');
            itemAmount.val('1');
            itemAmount.addClass(`cart-products__items__item-${countItems}__value cart-products__items__item__value`);
            itemAmount.attr('disabled', true);
            containerItem.append(itemAmount);

            let itemPrice = $('<p></p>');
            itemPrice.text(infoPrice);
            itemPrice.addClass(`cart-products__items__item-${countItems}__total cart-products__items__item__total`);
            containerItem.append(itemPrice);

            let deleteItemBtn = $('<button></button>');
            if(document.documentElement.clientWidth <= 574) {
                deleteItemBtn.text('Remove');

            }
            deleteItemBtn.addClass(`cart-products__items__item-${countItems}__delete cart-products__items__item__delete`);
            containerItem.append(deleteItemBtn);
            

            mainContainer.append(containerItem[0]);
            countItems++;
        };

        if(document.documentElement.clientWidth <= 574) {
            let allItemsName = document.body.querySelectorAll('.cart-products__items__item__name');
            for(let item of allItemsName) {
                if($(item).text().length > 22) {
                    let sibling = $(item).siblings()[4];
                    let neededClass = $(sibling).attr('class').split(' ');
                    $(`.${neededClass[0]}`).css('top', +$(`.${neededClass[0]}`).css('top').slice(0, -2) + 10 + 'px')
                }
            }
        };

        if(arridList.length > 2 && document.documentElement.clientWidth <= 574) {
            let count = arridList.length - 2;
            let newPos = +getComputedStyle(containerItem[0]).height.match(/\d*/).join('') * count;
            let footer = $('.cart-footer');
            let connection = $('.cart-connection');
            let slider = $('.cart-slider');
            let checkout = $('.cart-checkout');
            slider.css('top', +getComputedStyle(slider[0]).top.match(/\d*/).join('') + newPos + (36 * count) + 'px');
            checkout.css('top', +getComputedStyle(checkout[0]).top.match(/\d*/).join('') + newPos + (36 * count)+ 'px');
            footer.css('top', +getComputedStyle(footer[0]).top.match(/\d*/).join('') + newPos +  (36 * count) + 'px');
            connection.css('top', +getComputedStyle(connection[0]).top.match(/\d*/).join('') + newPos +  (36 * count) + 'px');
        
        };
        if(arridList.length > 4 && document.documentElement.clientWidth > 574) {
            let count = arridList.length - 4;
            let newPos = +getComputedStyle(containerItem[0]).height.match(/\d*/).join('') * count;
            let footer = $('.cart-footer');
            footer.css('top', +getComputedStyle(footer[0]).top.match(/\d*/).join('') + newPos + 'px') ;
            let connection = $('.cart-connection');
            connection.css('top', +getComputedStyle(connection[0]).top.match(/\d*/).join('') + newPos + 'px');
        };



        let deleleItemCount = +document.body.querySelector('.cart-quantity').innerHTML.match(/\d*/).join('');


        $('.cart-products__items').click(function(event) {
            if(!event.target.className.includes('delete')) return;
            console.log(localStorage);
            for(let i = 1; i <= arridList.length; i++) {
                if(event.target.className.includes(`item-${i}`)) {
                    let itemsCount = $('.nav-header__count');
                    let item = $(`.cart-products__items__item-${i}`);
                    let itemName = $(`.cart-products__items__item-${i}__name`).text();
                    let uppercaseOfName = itemName.match(/[A-Z]/g).join('');
                    for(let elem of arridList) {
                        if(elem == uppercaseOfName) {
                            let newCount = (+localStorage.getItem('itemCount') - 1).toString();
                            localStorage.setItem('itemCount', `${newCount}`);
                            itemsCount.text(localStorage.getItem('itemCount'));
                            localStorage.removeItem(`${uppercaseOfName}`);
                            let idList = localStorage.getItem('idList').split('.');
                            let id =  idList.splice(0, idList.length-1).filter(item => item != uppercaseOfName).join('.');
                            let totalPrice = $('.cart-checkout__total-price');
                            let checkOutPrice = $('.cart-checkout__price');
                            localStorage.setItem('idList', `${id}.`);
                            sum -= $(`.cart-products__items__item-${i}__total`).text().match(/[\d]+/g).join('').slice(0,-2);
                            plusMinus(4, x, sum.toString(), checkOutPrice[0]);
                            plusMinus(4, x, sum.toString(), totalPrice[0]);
                            
                        };
                    };
                    item.remove();
                    deleleItemCount = deleleItemCount - 1;
                    deleleItemCount <= 1? $('.cart-quantity').text(`${deleleItemCount} item`) : $('.cart-quantity').text(`${deleleItemCount} items`);

                    for(let j = i+1; j <= arridList.length; j++) {
                        let currentPos = $(`.cart-products__items__item-${j}`);
                        if(currentPos[0] === undefined) continue;
                        let newPos = +$(`.cart-products__items__item-${j}`).css('top').match(/\d*/).join('');
                        if(document.documentElement.clientWidth <= 574) {
                            currentPos.css('top', newPos - +currentPos.css('height').slice(0, -2) - 36 + 'px');
                        } else currentPos.css('top', newPos - +currentPos.css('height').slice(0, -2) + 'px');
                    };

                    let itemsLength = document.body.querySelectorAll('.cart-products__items__item__name').length;
                    
                    if(itemsLength >= 2 && document.documentElement.clientWidth <= 574) {

                        let newPos = +$('.cart-products__items__item').css('height').match(/\d*/).join('');
                        let footer = $('.cart-footer');
                        let connection = $('.cart-connection');
                        let slider =$('.cart-slider');
                        let checkout = $('.cart-checkout');
                        slider.css('top', +getComputedStyle(slider[0]).top.match(/\d*/).join('') - newPos - 36 + 'px');
                        checkout.css('top', +getComputedStyle(checkout[0]).top.match(/\d*/).join('') - newPos - 36 + 'px');
                        footer.css('top', +getComputedStyle(footer[0]).top.match(/\d*/).join('') - newPos - 36 + 'px');
                        connection.css('top', +getComputedStyle(connection[0]).top.match(/\d*/).join('') - newPos - 36 + 'px');
                    }

                    if(itemsLength >= 4  && document.documentElement.clientWidth > 574) {
                        let newPos = +$('.cart-products__items__item').css('height').match(/\d*/).join('');
                        let footer = $('.cart-footer');
                        footer.css('top', +getComputedStyle(footer[0]).top.match(/\d*/).join('') - newPos + 'px') ;
                        let connection = $('.cart-connection');
                        connection.css('top', +getComputedStyle(connection[0]).top.match(/\d*/).join('') - newPos + 'px');
                    };
                };
                if(localStorage.getItem('idList') == '.') localStorage.removeItem('idList');
                
            }
        });

        
    });
    
    
    
};

console.log(localStorage);