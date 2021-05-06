document.addEventListener('DOMContentLoaded', function(){
    const select = document.querySelector('#model_sel');

    sum_price = document.querySelector('.summary_price');
    function count(){
        let active = document.querySelectorAll('.active'),
            hnw = document.querySelector('.hnw'),
            gof = document.querySelector('.gof'),
            surface = document.querySelector('.surface'),
            clr = document.querySelector('.clr');
        hnw.innerText = select.value + ', ';
        gof.innerText = active[0].querySelector('.manipulation_label').innerText + ', ';
        surface.innerText = active[1].querySelector('.manipulation_label').innerText + ', ';
        clr.innerText = active[2].querySelector('img').getAttribute('title');
        sum_price.innerHTML = price + ' р *';

    }
    const m_prices = [
        65000 * 1.05,
        67000 * 1.05,
        70500 * 1.05,
        75000 * 1.05,
        76000 * 1.05,
        81500 * 1.05,
        79500 * 1.05,
        80500 * 1.05,
        86000 * 1.05
    ];
    const l_prices = [
        76500 * 1.05,
        78500 * 1.05,
        83500 * 1.05,
        84000 * 1.05,
        85000 * 1.05,
        90500 * 1.05,
        89500 * 1.05,
        90500 * 1.05,
        96500 * 1.05
    ];

    let price_pool = l_prices;
    let price = l_prices[0]


    function changeType(e){
        if(e.target && this.classList.contains('item')){
            type_item.forEach(el => {
                el.classList.remove('active');
            });
            texture_sel.forEach(el => {
                el.classList.remove('blocked');
            });
            this.classList.add('active');
            let activei = document.querySelectorAll('.active');
            if (this.getAttribute('data-pool') === 'l_prices'){
                price_pool = l_prices;
                gate_back.src = 'img/gateL-Sicke.png'
                texture_sel[2].classList.add('blocked')
                texture_sel[3].classList.add('blocked')
                if (activei[1].classList.contains('blocked')){
                    texture_sel[0].click()
                }
            } else if (this.getAttribute('data-pool') === 'm_prices'){
                price_pool = m_prices;
                gate_back.src = 'img/gateM-Sicke.png'
                texture_sel[0].classList.add('blocked')
                if (activei[1].classList.contains('blocked')){
                    texture_sel[1].click()
                }
            }
            price = price_pool[select.options[select.selectedIndex].getAttribute('data-price')]
           
        }
        count()
    }
    const type = document.querySelector('.type .manipulation_action'),
    type_item = document.querySelectorAll('.type .manipulation_action .item')
    type_item[0].addEventListener('click', changeType);
    type_item[1].addEventListener('click', changeType);


    select.addEventListener('input', function(){
        price = price_pool[this.options[this.selectedIndex].getAttribute('data-price')];
        count();
    });
    


    

    const color_select = document.querySelectorAll('.colors .ssax');
    const gate_back = document.querySelector('.gate_display img');
    let color_items = document.querySelectorAll('.colors .item');
    color_select.forEach(el => {
        el.addEventListener('click', function(e){
           if (e.target.tagName === 'IMG'){
            gate_back.style.background = `url(${e.target.src})`
            color_items.forEach(el => {
                el.classList.remove('active')
            })
            e.target.closest('div').classList.add('active');

           }
           count()
        })
    })
    

    const texture_sel = document.querySelectorAll('.texture .manipulation_action .item');
    let nodes = [].slice.call(texture_sel); 
    texture_sel.forEach(el => {
        el.addEventListener('click', function(e){
            if (e.currentTarget && e.currentTarget.classList.contains('item') && !e.currentTarget.classList.contains('blocked')){
                texture_sel.forEach(el => {
                    el.classList.remove('active')
                })

                e.currentTarget.classList.add('active')
                
            }
            color_select.forEach(el => {
                el.classList.add('hide')
                el.classList.remove('show')
            })
            let i = document.querySelectorAll('.active')[1];
            color_select[nodes.indexOf(i)].classList.add('show')
            color_select[nodes.indexOf(i)].classList.remove('hide')
            document.querySelectorAll('.show img')[0].click();
            count()
        })

    })
    console.log(nodes);

    function reset(){
        type_item[1].click();
        texture_sel[1].click();
        color_items[6].querySelector('img').click();
        count()
    }
    reset()
    document.querySelector('.reload').addEventListener('click', function(){
        reset()
    })
    document.querySelectorAll('.info').forEach(el => {
        el.addEventListener('click', function(){
            window.location.href = 'https://www.vorota-surgut.ru/images/files/sek_gates_home1.pdf'
        });
    })
});