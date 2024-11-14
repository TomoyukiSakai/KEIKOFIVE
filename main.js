

const picChildren = document.querySelectorAll('.pic'); // .pic クラスを持つすべての要素を取得

picCb = function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('pic-inview');
        } else {
            entry.target.classList.remove('pic-inview');
        }
    });
}

const io = new IntersectionObserver(picCb);

// すべての .pic 要素に対して observer を適用
picChildren.forEach(picChild => {
    io.observe(picChild);
});

class Menu{
    constructor(){
        this.DOM = {};
        this.DOM.btn = document.querySelector('.menu-btn');
        this.DOM.cover = document.querySelector('.menu-contents__cover');
        this.DOM.globalContainer = document.querySelector("#global-container");
        this.eventType = this._getEventType();
        this._addEvent();
    }

    _getEventType(){

        const isTouchCapable = "ontouchstart" in window;

        return isTouchCapable ? "touchstart" : "click";
    }

    _toggle(){
        this.DOM.globalContainer.classList.toggle('menu-open');
        
    }

    _addEvent(){
        this.DOM.btn.addEventListener(this.eventType, this._toggle.bind(this));
        this.DOM.cover.addEventListener(this.eventType, this._toggle.bind(this));
    }
    
}

new Menu();

document.addEventListener('DOMContentLoaded', function(){
   
    const ta = new TextAnimation('.animate-title')


    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            console.log(entry.isIntersecting);
            if (entry.isIntersecting) {
                ta.animate();  // ビューポートに入ったときにアニメーション開始
            }
        });
    });

    observer.observe(document.querySelector('.animate-title'));
    
});

const spinner = document.querySelector('.three-dot-spinner');

spinner.addEventListener('animationend', () => {
    spinner.classList.add('ghost');
});

class TextAnimation {
    
   
    constructor(el){
    
        this.el = document.querySelector(el);
        this.chars = this.el.innerHTML.trim().split('');
        this.el.innerHTML = this._splitText();
    }
    _splitText(){
        
        return this.chars.reduce((acc,curr)=>{
            curr = curr.replace(/\s+/, '&nbsp;');
            return `${acc}<span class="char">${curr}</span>`
        },"");
        
    }
    animate(){
        console.log('Animate called'); 
        this.el.classList.toggle('inview');
    }
}

const swiper = new Swiper('.swiper', {
    // Optional parameters
    //direction: 'hori',
    loop: true,
    //effect: "fade",
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

  function embed_news_page(){
   
    
    
    $.ajax({
        url: "news.html",
        cache: false,
        success: function(html) {
            // jQueryオブジェクトを使ってhtmlを一時的に挿入
            let $temp = $('<div>').html(html);
            let $news_body = $temp.find(".two-colums"); // .two_columsクラスを持つ要素を取得
            let $top_page_area = document.querySelector("#news_page");
            $top_page_area.innerHTML = ""; // 初期化
    
            // jQueryの.each()メソッドで要素を処理
            $news_body.each(function(index, element) {
                $top_page_area.innerHTML += element.outerHTML; 
                console.log(element); // 各要素の内容を追加
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error loading news.html:", textStatus, errorThrown);
        }
    });

}

let loading_anime = document.querySelector(".pace-progress-inner");
loading_anime.innerHTML = '<div class="three-dot-spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';