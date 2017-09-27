var d = document;
var w = window;

function showOverlay() {
  var overlay = d.querySelector('.overlay');
  var menuItem = d.querySelectorAll('.menu-item-has-children');

  if (matchMedia) {
    var mq = w.matchMedia('min-width: 1200px');
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

  function WidthChange(mq) {
    if (mq.matches) {
      var menuItems = Array.prototype.slice.call(menuItem);
      menuItems.map(function (i) {
        i.addEventListener('mouseenter', function () {
          overlay.classList.add('active');
        });
        i.addEventListener('mouseleave', function () {
          overlay.classList.remove('active');
        });
      });
    }
  }
}
showOverlay();

function retrieveImage() {
  var
    specialLinks = d.querySelectorAll('.menu-item-child-list a'),
    itemLink = d.querySelectorAll(".item-link"),
    itemImage = d.getElementsByClassName('item-image'),
    maxLength = itemLink.length;

  for (var x = 0; x < specialLinks.length; x++) {
    specialLinks[x].addEventListener("mouseover", retrieve, true);

    function retrieve(e) {
      for (var i = 0; i < maxLength; i++) {
        itemLink[i].setAttribute('href', e.target.getAttribute("data-url-" + i));
        itemImage[i].setAttribute('src', e.target.getAttribute("data-img-" + i));
      };
    };
  };
};
retrieveImage();

function toggleMenu() {
  var button, menu, overlay;
  button = d.querySelector('.site-nav-mobile-button');
  menu = d.querySelector('.site-nav-top');
  overlay = d.querySelector('.overlay');

  button.addEventListener('click', function () {
    menu.classList.toggle('open');
    overlay.classList.toggle('active');
  });
};
toggleMenu();

function mobileDropdown() {
  var menuItemHasChild, arrayMenu, max;
  menuItemHasChild = d.querySelectorAll('.menu-item-has-children');
  arrayMenu = Array.prototype.slice.call(menuItemHasChild);
  max = menuItemHasChild.length;

  arrayMenu.map(function (i) {
    i.addEventListener('click', function () {
      this.lastChild.previousSibling.classList.toggle('open');
    });
  });
}
mobileDropdown();

function closeMenu() {
  var
    button = d.querySelector('.menu-close'),
    menu = d.querySelector('.site-nav-top'),
    overlay = d.querySelector('.overlay');

  button.addEventListener('click', function () {
    menu.classList.remove('open');
    overlay.classList.toggle('active');
  });
}
closeMenu();

function newElement(elem, text, imgsrc) {
  var tag = document.createElement(elem);
  var content = text;
  tag.appendChild(text);
  if (imgsrc) {
    tag.setAttribute('src', imgsrc);
  }
}

function apiRequest() {
  var data = 'https://api.myjson.com/bins/139nsh';
  var request = new XMLHttpRequest();
  request.onreadystatechange = getRespond;

  function getRespond() {
    if (this.readyState == 4 && this.status == 200) {
      var dataObj = JSON.parse(this.responseText);
      var products = dataObj.data.products;
      var container = d.getElementById('product-container');
      
      products.map(function (item) {
        var component = '<a href="'+item.url+'"> \
        <div class="product"> \
          <div class="product-image"> \
            <img src="'+item.image_url+'" alt="'+item.name+'"> \
          </div> \
          <div class="product-detail"> \
            <a class="product-name" href="'+item.url+'">'+item.name+'</a> \
            <p class="product-price">'+item.price+'</p> \
            <div class="product-rating"> \
              <span class="rating-star"></span> \
              <span class="rating-count"></span> \
            </div> \
          </div> \
          <div class="product-seller"> \
            <p class="seller-id"> \
              <span class="seller-name"></span> \
              <span class="seller-topads"></span> \
            </p> \
            <p class="seller-status"> \
              <span class="seller-location"></span> \
              <span class="seller-badges"></span> \
            </p> \
          </div> \
        </div> \
      </a>';
         container.innerHTML += component;
      });
    }
  }

  request.open("GET", data, true);
  request.send();
}
apiRequest();

var Element = function (args) {
  args = args || {}
  var el = document.createElement(args.tag);
  el.textContent = args.text;
  if (args.className) el.setAttribute('class', args.className);
  if (args.id) el.setAttribute('id', args.id);
  if (args.child) el.appendChild(args.child);
  return el;
}