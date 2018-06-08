// if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//   document.getElementsByTagName('html')[0].style.height = window.screen.availHeight;
// }

const parallaxContainer = document.body;
const linesBlock = document.querySelector('.lines-block');
const menuMain = document.querySelector('.menu-block');
const menuLinks = document.querySelectorAll('.nav-link');
const overlaySecond = document.querySelector('.overlay-second');
const overlay = document.querySelector('.overlay');
const menuLine = document.querySelector('.menu-line');
const menuDecorBlock = document.querySelector('.menu-bg-decor');

const pagesClass = [
  'first-page',
  'projects-page',
  'about-page',
  'links-page',
  'work-page',
];

const colors = {
  ORANGE: '#f05e1f',
  GREEN: '#27ae60',
  PINK: '#9357a3',
}

const socials = {
  INSTAGRAM: 'instagram',
  EMAIL: 'email',
};

const slides = [
  {
    'id' : '1',
    'title' : 'Сайт номер один',
    'descr' : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima id aperiam consequatur ut dignissimos, hic rem iste iure consectetur porro itaque dolor laborum veritatis aliquid natus quis repellendus debitis quae explicabo. Repudiandae repellat quisquam omnis assumenda vero alias excepturi voluptatem dolores, impedit doloremque ut tenetur velit veritatis sequi dolorem iste harum nam a eum quaerat cum saepe architecto nesciunt.',
    'img' : {
      'href' : 'http://placeimg.com/640/480/tech',
      'title' : 'название проекта',
    }
  },
  {
    'id' : '2',
    'title' : 'Сайт номер два',
    'descr' : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima id aperiam consequatur ut dignissimos, hic rem iste iure consectetur porro itaque dolor laborum veritatis aliquid natus quis repellendus debitis quae explicabo. Repudiandae repellat quisquam omnis assumenda vero alias excepturi voluptatem dolores, impedit doloremque ut tenetur velit veritatis sequi dolorem iste harum nam a eum quaerat cum saepe architecto nesciunt.',
    'img' : {
      'href' : 'http://placeimg.com/640/480/tech',
      'title' : 'название проекта'
    }
  },
  {
    'id' : '3',
    'title' : 'Сайт номер три',
    'descr' : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima id aperiam consequatur ut dignissimos, hic rem iste iure consectetur porro itaque dolor laborum veritatis aliquid natus quis repellendus debitis quae explicabo. Repudiandae repellat quisquam omnis assumenda vero alias excepturi voluptatem dolores, impedit doloremque ut tenetur velit veritatis sequi dolorem iste harum nam a eum quaerat cum saepe architecto nesciunt.',
    'img' : {
      'href' : 'http://placeimg.com/640/480/tech',
      'title' : 'название проекта'
    }
  },
  {
    'id' : '4',
    'title' : 'Сайт номер четыре',
    'descr' : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima id aperiam consequatur ut dignissimos, hic rem iste iure consectetur porro itaque dolor laborum veritatis aliquid natus quis repellendus debitis quae explicabo. Repudiandae repellat quisquam omnis assumenda vero alias excepturi voluptatem dolores, impedit doloremque ut tenetur velit veritatis sequi dolorem iste harum nam a eum quaerat cum saepe architecto nesciunt.',
    'img' : {
      'href' : 'http://placeimg.com/640/480/tech',
      'title' : 'название проекта'
    }
  }
];

let moveLayers;
const page = document.querySelector('.page');
let pagePref,
pageColor,
menuLineColor,
menuLinkColor,
menuOverlayColor;

 // var menuSecondSliideIn = anime.timeline();
 const slider = document.querySelector('.slider-block');
 const sldeUpBtn = document.querySelector('.slide-up');
 const sldeDownBtn = document.querySelector('.slide-down');
 const slideFirst = document.querySelector('.slide-first');
 const slideSecond = document.querySelector('.slide-second');
 const slideFirstContent = document.querySelector('.project-item__content-first');
 const slideSecondContent = document.querySelector('.project-item__content-second');
 let activeSlide = 0;

window.addEventListener('load', () => {
  // svg drawing
  animateSvgFirstPage()
  // activate mousemove animation bg
  activateLayers();
  // function activate paralax first page
  activateFirstPage()

  // links listener (activate page)
  document.body.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.classList.contains('nav-link') && !menuMain.classList.contains('sub-menu')) activatePage(e.target);
    else if (e.target.tagName === 'A' && e.target.classList.contains('nav-link')){
      changeMenu(e.target);

      if(e.target.dataset.page === 'projects-page') {
        activateProgectsPage();
      }
    }

    if (e.target.tagName === 'A' && e.target.classList.contains(socials.INSTAGRAM)) {
      if (window.innerWidth > 900) {
        e.preventDefault();

        const windowWidth =window.innerWidth / 2;
        const windowHeight =window.innerHeight / 2;
        const leftWindowMargin = (window.innerWidth - windowWidth) / 2;
        const topWindowMargin = (window.innerHeight - windowHeight) / 2;
        
        window.open(e.target.href, '', `scrollbars=1,height=${windowHeight},width=${windowWidth},left=${leftWindowMargin},top=${topWindowMargin}`);
      } 
    }
  });

  // animate slide move in-out
  sldeUpBtn.addEventListener('click', (e) => {
    switchSlide('UP');
  });

  // animate slide move in-out
  sldeDownBtn.addEventListener('click', (e) => {
    switchSlide('DOWN');
  });
});

  function menuSecondSlideIn() {
    var menuSecondSliideIn = anime.timeline();

    menuSecondSliideIn
      .add({
        targets: '.menu-block', // menu
        translateY: '0%',
        duration: 0,
        easing: 'linear',
      })
      .add({
        targets: '.skills-block', // skills
        easing: 'easeInQuart',
        translateX: [{value: '150'}, {value: '9000'}],
        opacity: [{value: '0'}, {value: '0'}],
        duration: 2000,
        easing: 'linear',
        offset: 500,
      })
      .add({
        targets: '.menu-block .overlay',
        width: '100%',
        duration: 1500,
        easing: 'linear',
        offset: 500,
      })
      .add({
        targets: '.menu-block .menu-line', 
        height: '100%',
        duration: 1000,
        easing: 'linear',
        offset: 1000,
        complete: function(anim) {
          var lineMove = anime.timeline();
            lineMove
              .add({
                targets: '.menu-block .overlay-second',
                left: '0',
                easing: 'easeOutExpo',
                duration: '800',
                offset: 500,
                complete: function(anim) {
                  menuDecorBlock.innerHTML = '';

                  if (pagePref === 'projects-page') projectPageActivateContent();

                  var lineMove2 = anime.timeline();
                    lineMove2
                      .add({
                        targets: '.menu-block .nav-link',
                        easing: 'easeInQuart',
                        duration: '500',
                        translateX: '0%',
                        opacity: '1',
                        duration: 200,
                        easing: 'linear',
                        offset: 0,
                        delay: function(el, i) {
                          return i * 100;
                          },
                      })
                      .add({
                        targets: '.menu-block .socials__link',
                        scale: 1,
                        opacity: '1',
                        duration: 200,
                        easing: 'linear',
                        offset: 0,
                        delay: function(el, i) {
                          return i * 100;
                        },
                      })
                      .add({
                        targets: '.decor-wrap',
                        duration: 3000,
                        scale: '1',
                        easing: 'linear',
                        offset: 0,
                        delay: function(el, i) {
                          return i * 300;
                        },
                      })
                }
              })
              .add({
                targets: '.menu-block .menu-line',
                translateX: '-7px',
                easing: 'easeInQuart',
                duration: '500',
                offset: 0,
              })

        }
      })
  }

  // function links activate page
  function activatePage(targetLink) {
    if(document.body.dataset) {
      let data = targetLink.dataset;

      pagePref = targetLink.dataset.page;
      pageColor = targetLink.dataset.colorPage;
      menuOverlayColor = targetLink.dataset.colorMenuOverlay;
      menuLineColor = targetLink.dataset.colorMenuLine;
      menuLinkColor = targetLink.dataset.colorMenuLink;
    } else {
      pagePref = targetLink.getAttribute('data-page');
      pageColor = targetLink.getAttribute('data-color-page');
      menuOverlayColor = targetLink.getAttribute('data-color-menu-overlay');
      menuLineColor = targetLink.getAttribute('data-color-menu-line');
      menuLinkColor = targetLink.getAttribute('data-color-menu-link');
    }

    menuMain.classList.add('sub-menu');

      for(var i = 0; i < pagesClass.length; i++) {
        let pageClass = pagesClass[i];

        if (page.classList.contains(pageClass)) {
          page.classList.remove(pageClass);
          page.classList.add(pagePref);


            var menuMainClose = anime.timeline();
              menuMainClose
                .add({
                  targets: '.menu-block .menu-line',
                  height: '0',
                  duration: 1500,
                  easing: 'linear',
                  offset: 2000,
                  complete: function(anim) {
                    $(menuMain).css({
                      'left': '0%',
                      'top' : '0%',
                      'bottom': 'unset',
                      'right': 'unset',
                      'transform': 'translateY(-100%)'
                    });

                    overlaySecond.style.backgroundColor = menuOverlayColor;
                    menuLine.style.backgroundColor = menuLineColor;
                    menuMain.classList.add('sub-page');
                    menuMain.classList.add(pagePref);

                    menuSecondSlideIn();
                  }
                })
                .add({
                  targets: '.menu-block .nav-link',
                  translateX: '-100%',
                  opacity: '0',
                  duration: 300,
                  easing: 'linear',
                  offset: 200,
                  delay: function(el, i) {
                    return i * 200;
                  },
                })
                .add({
                  targets: '.menu-block .overlay',
                  width: '0%',
                  duration: 1500,
                  easing: 'easeOutExpo',
                  offset: 500,
                  complete: function(anim) {
                    linesBlock.style.backgroundColor = pageColor;
                  }
                }) 
                .add({
                  targets: '.line-vertical',
                  height: ['100%', 0],
                  duration: 1500,
                  easing: 'easeOutExpo',
                  offset: 3500
                }) 
                .add({
                  targets: '.line-horizontal',
                  height: [3, 0],
                  duration: 1500,
                  easing: 'easeOutExpo',
                  offset: 3500
                }) 
                .add({
                  targets: '.stas-wrap',
                  translateX: '110%',
                  duration: 2500,
                  easing: 'easeOutExpo',
                  offset: 2200,
                  complete: function(anim) {
                    zhuk.style.display = 'none';
                  }
                }) 
                .add({
                  targets: '.zhuk-wrap',
                  translateY: '-129%',
                  duration: 2500,
                  easing: 'easeOutExpo',
                  offset: 2200,
                  complete: function(anim) {                    
                    stas.style.display = 'none';
                    
                    var logoMoveOut = anime.timeline();
                      logoMoveOut
                        .add({
                          targets: '.author-block',
                          translateX: '-9999px',
                          duration: 100,
                        });
                  }
                }) 
                .add({
                  targets: '.menu-block .socials__link',
                  scale: 0,
                  duration: 500,
                  easing: 'linear',
                  offset: 0,
                  delay: function(el, i) {
                    return i * 100;
                  },
                })
                .add({
                  targets: '.menu-bg-decor div',
                  duration: 1000,
                  scale: '0',
                  easing: 'linear',
                  offset: 0,
                  delay: function(el, i) {
                    return i * 100;
                  },
                  complete: function() {
                    menuDecorBlock.style.opacity = '0';
                  }
                }); 
                
        }
    }
  }

/* sub page menu change */ 
function changeMenu(targetLink) {
  if(document.body.dataset) {
    let data = targetLink.dataset;

    pagePref = targetLink.dataset.page;
    pageColor = targetLink.dataset.colorPage;
    menuOverlayColor = targetLink.dataset.colorMenuOverlay;
    menuLineColor = targetLink.dataset.colorMenuLine;
    menuLinkColor = targetLink.dataset.colorMenuLink;
  } else {
    pagePref = targetLink.getAttribute('data-page');
    pageColor = targetLink.getAttribute('data-color-page');
    menuOverlayColor = targetLink.getAttribute('data-color-menu-overlay');
    menuLineColor = targetLink.getAttribute('data-color-menu-line');
    menuLinkColor = targetLink.getAttribute('data-color-menu-link');
  }

    for(var i = 0; i < pagesClass.length; i++) {
      let pageClass = pagesClass[i];

      if (page.classList.contains(pageClass)) {
        page.classList.remove(pageClass);
        page.classList.add(pagePref);
        menuLine.style.backgroundColor = menuLineColor;
        menuMain.classList.add(pagePref);

        var menuChange = anime.timeline();
          menuChange
            .add({
              targets: '.menu-block .menu-line',
              translateX: '0px',
              easing: 'easeInQuart',
              duration: '500',
              offset: 500,
            })
            .add({
              targets: '.menu-block .overlay-second',
              left: '-100%',
              easing: 'easeInExpo',
              duration: '800',
              offset: 500,
              complete: function(anim) {
                overlaySecond.style.backgroundColor = menuOverlayColor;

                var lineMove2 = anime.timeline();
                  lineMove2
                  .add({
                    targets: '.menu-block .menu-line',
                    translateX: '-7px',
                    easing: 'easeInQuart',
                    duration: '500',
                    offset: 0,
                  })
                  .add({
                    targets: '.menu-block .overlay-second',
                    left: '0%',
                    easing: 'easeOutExpo',
                    duration: '800',
                    offset: 500,
                  })
            }
          })
          .add({
            targets: '.menu-block .overlay',
            width: '100%',
            duration: 1500,
            easing: 'linear',
            offset: 1000,
          })
      }
  }
}

/* projects page content activate */ 
function projectPageActivateContent(targetLink) {
      var menuChange = anime.timeline();
        menuChange
          .add({
            targets: '.projects__button-wrap',
            translateX: '0',
            easing: 'easeInQuart',
            duration: '500',
            offset: 500,
          })
          .add({
            targets: '.projects__button-wrap button',
            scale: [{value: '0'}, {value: '1'}],
            easing: 'linear',
            duration: 1000,
            offset: 1000,
        })
          .add({
            targets: '.slider-block',
            translateY: '0',
            easing: 'linear',
            duration: '500',
            offset: 1000,
            complete: function() {
              document.querySelector('.project-item__num').classList.add('active');
            }
        });
    }


function activateFirstPage() { 
  var menuStartIn = anime.timeline();
    menuStartIn
    .add({
        targets: '.decor-bg-block > div', // bg decor elem
        duration: 2000,
        opacity: '1',
        easing: 'linear',
        offset: 0,
        delay: function(el, i) {
          return i * 300;
        },
      })
      .add({
        targets: '.menu-block .menu-line', // menu vertical line
        height: '100%',
        duration: 2000,
        easing: 'linear',
        offset: 0
      })
      .add({
        targets: '.menu-block .overlay', // menu overlay
        width: '100%',
        duration: 1000,
        easing: 'easeInExpo',
        offset: 2000
      })
      .add({
        targets: '.menu-block .nav-link', // menu nav links
        translateY: '0%',
        opacity: '1',
        duration: 600,
        easing: 'linear',
        offset: 3000,
        delay: function(el, i) {
          return i * 500;
        },
      })         
      .add({
        targets: '.menu-block .socials__item', // menu social icons
        scale: 1,
        opacity: 1,
        duration: 600,
        easing: 'linear',
        offset: 5000,
        delay: function(el, i) {
          return i * 350;
        },
      });        
}

function activateLayers() { 
  const layersSquare = document.getElementsByClassName('square');
  const layersCross = document.getElementsByClassName('cross'); 

  moveLayers = (e) => {
    var initialX = (window.innerWidth / 2) - e.pageX,
        initialY = (window.innerHeight / 2) - e.pageY;

    [].slice.call(layersSquare).forEach(function (layer, i) {
      var divider = 0.007 +  i / 400,
        positionX = initialX * divider,
        positionY = initialY * divider,
        bottomPosition = (window.innerHeight / 2) * divider,
        layerStyle = layer.style,
        transformString;

        if (i % 2 === 0) {
          transformString = 'translate3d(' + positionX + 'px ,' + positionY + 'px ,0) rotate(' + (positionX + positionX * (i + 0.01) * 0.5) + 'deg)';
        } else {
          transformString = 'translate3d(' + -positionX + 'px ,' + -positionY + 'px ,0) rotate(' + (-positionX - positionX * (i + 0.01) * 0.5) + 'deg)';
        }

      layerStyle.transform = transformString;
      layerStyle.bottom = '-' + bottomPosition + 'px';
    });

    [].slice.call(layersCross).forEach(function (layer, i) {
      var divider = 0.007 +  i / 400,
        positionX = initialX * divider,
        positionY = initialY * divider,
        bottomPosition = (window.innerHeight / 2) * divider,
        layerStyle = layer.style,
        transformString;

        if (i % 2 === 0) {
          transformString = 'translate3d(' + positionX + 'px ,' + positionY + 'px ,0) rotate(' + (positionX + positionX * i) + 'deg)';
        } else {
          transformString = 'translate3d(' + -positionX + 'px ,' + -positionY + 'px ,0) rotate(' + (-positionX - positionX * i) + 'deg)';
        }

      layerStyle.transform = transformString;
      layerStyle.bottom = '-' + bottomPosition + 'px';
    });
  }
        
  parallaxContainer.addEventListener('mousemove', moveLayers);
}

function animateSvgFirstPage() {
  let stasDrawing = anime({
    targets: '#stas path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 25000,
    delay: 6200,
    direction: 'alternate',
    opacity: 1,
    loop: false
  });
    
  let zhukDrawing = anime({
    targets: '#zhuk path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 25000,
    delay: 6200,
    direction: 'alternate',
    loop: false
  });
    
  let skillJSDrawing = anime({
    targets: '#skillJS path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 5000,
    delay: 6200,
    direction: 'alternate',
    loop: false
  });
  
  let skillFigma = anime({
    targets: '#skillFigma path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 5000,
    delay: 6200,
    direction: 'alternate',
    loop: false
  });
}

function switchSlide(direction) {
  if (direction === 'UP') {
    ++activeSlide;
    activeSlide = calcActiveSlide(activeSlide); // what slide next?
    changeSlideContent(slider, slides[activeSlide]) // insert content in next slide

    sldeUpBtn.classList.add('disabled');
    sldeDownBtn.classList.add('disabled');

    slideFirstContent.classList.toggle('active');
    slideFirstContent.classList.toggle('leave');
    slideSecondContent.classList.toggle('active');
    slideSecondContent.classList.toggle('leave');

    var pathMoveUp = anime.timeline();
      pathMoveUp
      .add({
          targets: '.slider-block__path',
          duration: 1000,
          backgroundPositionY: '-=300',
          easing: 'linear',
          offset: 0,
        });

    if(slideFirst.classList.contains('active')) {
      slideFirst.classList.toggle('active');
      slideFirst.classList.toggle('leave');
      slideFirst.classList.add('out-to-up');

      slideSecond.classList.add('slide-pos-down');
      slideSecond.classList.toggle('active');
      slideSecond.classList.toggle('leave');
      slideSecond.classList.add('in-from-down');

      setTimeout(() => {
        slideFirst.classList.remove('out-to-up');
        slideSecond.classList.remove('in-from-down');
        slideSecond.classList.remove('slide-pos-down');

        sldeUpBtn.classList.remove('disabled');
        sldeDownBtn.classList.remove('disabled');
      }, 1000);

    } else {
      slideFirst.classList.add('slide-pos-down');
      slideFirst.classList.toggle('leave');
      slideFirst.classList.toggle('active');
      slideFirst.classList.add('in-from-down');

      slideSecond.classList.toggle('active');
      slideSecond.classList.toggle('leave');
      slideSecond.classList.add('out-to-up');

      setTimeout(() => {
        slideFirst.classList.remove('in-from-down');
        slideFirst.classList.remove('slide-pos-down');
        slideSecond.classList.remove('out-to-up');

        sldeUpBtn.classList.remove('disabled');
        sldeDownBtn.classList.remove('disabled');
      }, 1000);
    }
  } else {
    --activeSlide;
    activeSlide = calcActiveSlide(activeSlide);
    changeSlideContent(slider, slides[activeSlide]) // insert content in next slide

    sldeUpBtn.classList.add('disabled');
    sldeDownBtn.classList.add('disabled');

    slideFirstContent.classList.toggle('active');
    slideFirstContent.classList.toggle('leave');
    slideSecondContent.classList.toggle('active');
    slideSecondContent.classList.toggle('leave');

    // animate sliders paths
    var pathMoveDown = anime.timeline();
      pathMoveDown
      .add({
          targets: '.slider-block__path',
          duration: 1000,
          backgroundPositionY: '+=300px',
          easing: 'linear',
          offset: 0,
        });

    if(slideFirst.classList.contains('active')) {
      slideFirst.classList.toggle('active');
      slideFirst.classList.toggle('leave');
      slideFirst.classList.add('out-to-down');

      slideSecond.classList.toggle('active');
      slideSecond.classList.toggle('leave');
      slideSecond.classList.add('in-from-up');

      setTimeout(() => {
        slideFirst.classList.remove('out-to-down');
        slideSecond.classList.remove('in-from-up');
        sldeUpBtn.classList.remove('disabled');
        sldeDownBtn.classList.remove('disabled');
      }, 1000);

    } else {
      slideFirst.classList.toggle('leave');
      slideFirst.classList.toggle('active');
      slideFirst.classList.add('in-from-up');

      slideSecond.classList.toggle('active');
      slideSecond.classList.toggle('leave');
      slideSecond.classList.add('out-to-down');

      setTimeout(() => {
        slideFirst.classList.remove('in-from-up');
        slideSecond.classList.remove('out-to-down');
        sldeUpBtn.classList.remove('disabled');
        sldeDownBtn.classList.remove('disabled');
      }, 1000);
    }
  }
}

function changeSlideContent(slider, slide) {
  const slideMoveIn = slider.querySelector('.slider-content-animate.leave');
  const slideId = slideMoveIn.querySelector('.project-item__id');
  const slideTitle = slideMoveIn.querySelector('.project-item__title');
  const slideDescr = slideMoveIn.querySelector('.project-item__descr');
  const slideImg = slider.querySelector('.slider-slide.leave img');


  slideId.innerHTML = slide.id;
  slideTitle.innerHTML = slide.title;
  slideDescr.innerHTML = slide.descr;
  slideImg.src = slide.img.href;
  slideImg.setAttribute('title', slide.img.title);
}

function calcActiveSlide(slideId) {
  const slidesLength = slides.length;

  if (slideId > slidesLength - 1) slideId = 0;
  else if (slideId < 0) slideId = slidesLength - 1;

  return slideId;
}