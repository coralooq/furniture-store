


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




    //                     INPUT SHIP
    let cartCheckout = document.body.querySelector('.cart-checkout');
    let checkedShip = false;
    cartCheckout.addEventListener('click', function(event) {
        if(event.target.tagName != 'INPUT') return;
        let totalPrice = document.body.querySelector('.cart-checkout__total-price');
        let premiumShipPrice = +document.body.querySelector('.cart-checkout__premium-ship p span').innerHTML.match(/[\d]+/g).join('').slice(0,-2);
        if(event.target.closest('div').className == 'cart-checkout__premium-ship') {
            if(checkedShip) return;
            sum += premiumShipPrice;
            plusMinus(4, x, sum.toString(), totalPrice)
            checkedShip = true;
        } else {
            if(!checkedShip) return;
            sum -= premiumShipPrice;
            plusMinus(4, x, sum.toString(), totalPrice)
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
            let mainContainer = document.querySelector('.cart-products__items');
            let itemInfo = JSON.parse(localStorage.getItem(`${id}`));
            let infoName = itemInfo.itemName;
            let infoPrice = itemInfo.itemPrice;
            let infoImg = itemInfo.itemImg;


            let cartQuantity = document.body.querySelector('.cart-quantity');
            if(arridList.length >= 2) {
                cartQuantity.innerHTML = `${arridList.length} items`;
            }  else cartQuantity.innerHTML = `1 item`;


            containerItem = document.createElement('div');
            containerItem.classList.add(`cart-products__items__item-${countItems}`);
            containerItem.classList.add(`cart-products__items__item`);
            containerItem.style.display = 'block';

            let itemImg = document.createElement('img');
            itemImg.src = infoImg;
            containerItem.append(itemImg);
            

            let itemName = document.createElement('p');
            itemName.innerHTML = infoName;
            itemName.classList.add(`cart-products__items__item-${countItems}__name`);
            itemName.classList.add(`cart-products__items__item__name`);
            containerItem.append(itemName);

            let itemPlus = document.createElement('button');
            itemPlus.innerHTML = '+'
            itemPlus.classList.add(`cart-products__items__item-${countItems}__plus`);
            itemPlus.classList.add(`cart-products__items__item__plus`);
            containerItem.append(itemPlus);
            let itemMinus = document.createElement('button');
            itemMinus.innerHTML = '-'
            itemMinus.classList.add(`cart-products__items__item-${countItems}__minus`);
            itemMinus.classList.add(`cart-products__items__item__minus`);
            containerItem.append(itemMinus);
            let itemAmount = document.createElement('input');
            itemAmount.value = '1';
            itemAmount.classList.add(`cart-products__items__item-${countItems}__value`);
            itemAmount.classList.add(`cart-products__items__item__value`);
            containerItem.append(itemAmount);

            let itemPrice = document.createElement('p');
            itemPrice.innerHTML = infoPrice;
            itemPrice.classList.add(`cart-products__items__item-${countItems}__total`);
            itemPrice.classList.add(`cart-products__items__item__total`);
            containerItem.append(itemPrice);

            let deleteItemBtn = document.createElement('button');
            if(document.documentElement.clientWidth <= 574) {
                deleteItemBtn.innerHTML = 'Remove';

            }
            deleteItemBtn.classList.add(`cart-products__items__item-${countItems}__delete`);
            deleteItemBtn.classList.add(`cart-products__items__item__delete`);
            containerItem.append(deleteItemBtn);
            

            mainContainer.append(containerItem);
            countItems++;
        };

        if(arridList.length > 2 && document.documentElement.clientWidth <= 574) {
            let count = arridList.length - 2;
            console.log(+getComputedStyle(containerItem).height.match(/\d*/).join('') * count);
            let newPos = +getComputedStyle(containerItem).height.match(/\d*/).join('') * count;
            let footer = document.body.querySelector('.cart-footer');
            let connection = document.body.querySelector('.cart-connection');
            let slider = document.body.querySelector('.cart-slider');
            let checkout = document.body.querySelector('.cart-checkout');
            console.log(+getComputedStyle(slider).top.match(/\d*/).join(''));
            slider.style.top =  +getComputedStyle(slider).top.match(/\d*/).join('') + newPos + (36 * count) + 'px';
            checkout.style.top =  +getComputedStyle(checkout).top.match(/\d*/).join('') + newPos + (36 * count)+ 'px';
            footer.style.top =  +getComputedStyle(footer).top.match(/\d*/).join('') + newPos + + (36 * count) + 'px';
            connection.style.top =  +getComputedStyle(connection).top.match(/\d*/).join('') + newPos + + (36 * count) + 'px';
        
        };

        if(arridList.length > 4) {
            let count = arridList.length - 4;
            let newPos = +getComputedStyle(containerItem).height.match(/\d*/).join('') * count;
            let footer = document.body.querySelector('.cart-footer');
            footer.style.top =  +getComputedStyle(footer).top.match(/\d*/).join('') + newPos + 'px';
            let connection = document.body.querySelector('.cart-connection');
            connection.style.top =  +getComputedStyle(connection).top.match(/\d*/).join('') + newPos + 'px';
        };



        

        let deleleItem = document.body.querySelector('.cart-products__items');
        let deleleItemCount = +document.body.querySelector('.cart-quantity').innerHTML.match(/\d*/).join('');


        deleleItem.addEventListener('click', function(event) {
            if(!event.target.className.includes('delete')) return;
            for(let i = 1; i <= arridList.length; i++) {
                if(event.target.className.includes(`item-${i}`)) {
                    let itemsCount = document.querySelector('.nav-header__count');
                    let item = document.querySelector(`.cart-products__items__item-${i}`);
                    let itemName = document.querySelector(`.cart-products__items__item-${i}__name`).innerHTML;
                    let uppercaseOfName = itemName.match(/[A-Z]/g).join('');
                    for(let elem of arridList) {
                        if(elem == uppercaseOfName) {
                            let newCount = (+localStorage.getItem('itemCount') - 1).toString();
                            localStorage.setItem('itemCount', `${newCount}`);
                            itemsCount.innerHTML = localStorage.getItem('itemCount');
                            localStorage.removeItem(`${uppercaseOfName}`);
                            let c = localStorage.getItem('idList').split('.');
                            let a =  c.splice(0, c.length-1).filter(item => item != uppercaseOfName).join('.');
                            let totalPrice = document.querySelector('.cart-checkout__total-price');
                            let checkOutPrice = document.querySelector('.cart-checkout__price');
                            localStorage.setItem('idList', `${a}.`);
                            sum -= document.body.querySelector(`.cart-products__items__item-${i}__total`).innerHTML.match(/[\d]+/g).join('').slice(0,-2);
                            plusMinus(4, x, sum.toString(), checkOutPrice);
                            plusMinus(4, x, sum.toString(), totalPrice);
                            
                        };
                    };
                    item.remove();
                    deleleItemCount = deleleItemCount - 1;
                    deleleItemCount <= 1? document.body.querySelector('.cart-quantity').innerHTML = `${deleleItemCount} item` : document.body.querySelector('.cart-quantity').innerHTML = `${deleleItemCount} items`;

                    for(let j = i+1; j <= arridList.length; j++) {
                        let currentPos = document.querySelector(`.cart-products__items__item-${j}`);
                        if(currentPos == null) continue;
                        let newPos = +getComputedStyle(currentPos).top.match(/\d*/).join('');
                        currentPos.style.top = newPos - currentPos.getBoundingClientRect().height + 'px';
                    };
                };
                if(localStorage.getItem('idList') == '.') localStorage.removeItem('idList');
                
            }
        });

        
    });
    
    if(localStorage.getItem('itemCount')) {
        let itemsCount = document.body.querySelector('.nav-header__count');
        itemsCount.innerHTML = localStorage.getItem('itemCount');
    }
};





