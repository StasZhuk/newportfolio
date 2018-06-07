window.addEventListener('load', () => {
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
  let moveLayers;
  const page = document.querySelector('.page');
  let pagePref,
  pageColor,
  menuLineColor,
  menuLinkColor,
  menuOverlayColor;

  // svg drawing
  let stasDrawing = anime({
    targets: '#stas path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 25000,
    delay: 8200,
    direction: 'alternate',
    opacity: 1,
    loop: false
  });
    
  let zhukDrawing = anime({
    targets: '#zhuk path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 25000,
    delay: 8200,
    direction: 'alternate',
    loop: false
  });
    
  let skillJSDrawing = anime({
    targets: '#skillJS path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 5000,
    delay: 8200,
    direction: 'alternate',
    loop: false
  });
  
  let skillFigma = anime({
    targets: '#skillFigma path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 5000,
    delay: 8200,
    direction: 'alternate',
    loop: false
  });

  // activate paralax first page
  activateLayers('first-page');

  // function activate paralax first page
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

    var menuStartIn = anime.timeline();
              menuStartIn
              .add({
                  targets: '.decor-bg-block > div',
                  duration: 3000,
                  opacity: '1',
                  easing: 'linear',
                  offset: 0,
                  delay: function(el, i) {
                    return i * 400;
                  },
                })
              .add({
                  targets: '.menu-bg-decor > div',
                  duration: 3000,
                  opacity: '1',
                  easing: 'linear',
                  offset: 4000,
                  delay: function(el, i) {
                    return i * 300;
                  },
                })
                .add({
                  targets: '.menu-block .menu-line',
                  height: '100%',
                  duration: 1500,
                  easing: 'linear',
                  offset: 0
                })
                .add({
                  targets: '.menu-block .overlay',
                  width: '100%',
                  duration: 2500,
                  easing: 'easeInExpo',
                  offset: 1500
                })
                .add({
                  targets: '.menu-block .nav-link',
                  translateY: '0%',
                  opacity: '1',
                  duration: 600,
                  easing: 'linear',
                  offset: 5000,
                  delay: function(el, i) {
                    return i * 500;
                  },
                })         
                .add({
                  targets: '.menu-block .socials__item',
                  scale: 1,
                  opacity: 1,
                  duration: 600,
                  easing: 'linear',
                  offset: 5000,
                  rotateY: 0,
                  delay: function(el, i) {
                    return i * 500;
                  },
                });             

    parallaxContainer.addEventListener('mousemove', moveLayers);
  }

  // links listener (activate page)
  document.body.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.classList.contains('nav-link') && !menuMain.classList.contains('sub-menu')) activatePage(e.target);
    else if (e.target.tagName === 'A' && e.target.classList.contains('nav-link')){
      changeMenu(e.target);

      if(e.target.dataset.page === 'projects-page') {
        activateProgectsPage();
      }
    }
  });


  // var menuSecondSliideIn = anime.timeline();
  let slides = document.querySelectorAll('.slider-slide');
  let sldeUpBtn = document.querySelector('.slide-up');
  let sldeDownBtn = document.querySelector('.slide-down');
  let slidesLength = slides.length;
  let activeSlide = 0;
  // links listener (activate page)
  sldeUpBtn.addEventListener('click', (e) => {
    console.log(activeSlide);
    if(activeSlide === slidesLength - 1) {
      activeSlide = 0;

      var menuStart = anime.timeline();
        menuStart
        .add({
            targets: '.slider-block__slides',
            duration: 500,
            translateY: '0%',
            easing: 'linear',
            offset: 0,
            begin: function() {
              sldeUpBtn.classList.add('active');
              sldeUpBtn.classList.add('disabled');
              sldeDownBtn.classList.add('disabled');
            },
            complete: function() {
              sldeUpBtn.classList.remove('active')
              sldeUpBtn.classList.remove('disabled')
              sldeDownBtn.classList.remove('disabled')
            }
          })
          .add({
            targets: '.slider-block__path',
            duration: 500,
            backgroundPositionY: '0',
            easing: 'linear',
            offset: 0
          });
    } else {
    ++activeSlide;
    
    var menuStartIn = anime.timeline();
      menuStartIn
      .add({
          targets: '.slider-block__path',
          duration: 1000,
          backgroundPositionY: '-=100vh',
          easing: 'linear',
          offset: 0,
          begin: function() {
            sldeUpBtn.classList.add('active');
            sldeUpBtn.classList.add('disabled');
            sldeDownBtn.classList.add('disabled');
          },
          complete: function() {
            sldeUpBtn.classList.remove('active');
            sldeUpBtn.classList.remove('disabled');
            sldeDownBtn.classList.remove('disabled');
          }
        })
        .add({
          targets: '.slider-block__slides',
          duration: 1000,
          translateY: '-=100vh',
          easing: 'linear',
          offset: 0,
        });
    }
  });
  // links listener (activate page)
  sldeDownBtn.addEventListener('click', (e) => {
    if(activeSlide === 0) {
      activeSlide = slidesLength - 1;
      let translate = activeSlide * 100 + 'vh';

      var menuStart = anime.timeline();
        menuStart
        .add({
            targets: '.slider-block__slides',
            duration: 500,
            translateY: `-${translate}`,
            easing: 'linear',
            offset: 0,
            begin: function() {
              sldeUpBtn.classList.add('disabled');
              sldeDownBtn.classList.add('disabled');
              sldeDownBtn.classList.add('active');
            },
            complete: function() {
              sldeUpBtn.classList.remove('disabled')
              sldeDownBtn.classList.remove('active')
              sldeDownBtn.classList.remove('disabled')
            }
          })
          .add({
            targets: '.slider-block__path',
            duration: 500,
            backgroundPositionY: `-${translate}`,
            easing: 'linear',
            offset: 0
          });
    } else {
    --activeSlide;
    
    var menuStartIn = anime.timeline();
      menuStartIn
      .add({
          targets: '.slider-block__path',
          duration: 1000,
          backgroundPositionY: '+=100vh',
          easing: 'linear',
          offset: 0,
          begin: function() {
            sldeUpBtn.classList.add('disabled');
            sldeDownBtn.classList.add('disabled');
            sldeDownBtn.classList.add('active');
          },
          complete: function() {
            sldeUpBtn.classList.remove('disabled')
            sldeDownBtn.classList.remove('disabled')
            sldeDownBtn.classList.remove('active')
          }
        })
        .add({
          targets: '.slider-block__slides',
          duration: 1000,
          translateY: '+=100vh',
          easing: 'linear',
          offset: 0,
        });
      }
  });

  function menuSecondSlideIn() {
    var menuSecondSliideIn = anime.timeline();

    menuSecondSliideIn
      .add({
        targets: '.menu-block',
        translateY: '0%',
        duration: 0,
        easing: 'linear',
      })
      .add({
        targets: '.skills-block',
        easing: 'easeInQuart',
        duration: '500',
        translateX: [{value: 130}, {value: '9000'}],
        opacity: [{value: '0'}, {value: '0'}],
        duration: 2000,
        easing: 'linear',
        offset: 1500,
      })
      .add({
        targets: '.menu-block .menu-line',
        height: '100%',
        duration: 1500,
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
                        duration: 300,
                        easing: 'linear',
                        offset: 300,
                        delay: function(el, i) {
                          return i * 200;
                          },
                      })
                      .add({
                        targets: '.menu-block .socials__link',
                        scale: 1,
                        opacity: '1',
                        duration: 400,
                        easing: 'linear',
                        offset: 2000,
                        delay: function(el, i) {
                          return i * 300;
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
      .add({
        targets: '.menu-block .overlay',
        width: '100%',
        duration: 1500,
        easing: 'linear',
        offset: 1000,
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
                  duration: 1000,
                  easing: 'linear',
                  offset: 0,
                  delay: function(el, i) {
                    return i * 150;
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
});


