window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}

function toggleSection(sectionId) {
  var section = document.getElementById(sectionId);
  var icon = section.previousElementSibling.querySelector('.toggle-icon');
  if (section.classList.contains('expanded')) {
    section.classList.remove('expanded');
    icon.textContent = '+'; 
  } else {
    section.classList.add('expanded');
    icon.textContent = '-';
  }
}

function showDetailed() {
  var simpleContent = document.getElementById('simple');
  var complexContent = document.getElementById('complex');
  var TLDRContent= document.getElementById('TLDR');

  var btnDetailed = document.getElementById('btnDetailed');
  var btnBeginner = document.getElementById('btnBeginner');
  var btnTLDR = document.getElementById('btnTLDR');
  
  simpleContent.style.display = 'none';
  complexContent.style.display = 'block';
  TLDRContent.style.display = 'none';

  btnDetailed.classList.add('active');
  btnBeginner.classList.remove('active');
  btnTLDR.classList.remove('active');
}

function showBeginner() {
  var simpleContent = document.getElementById('simple');
  var complexContent = document.getElementById('complex');
  var TLDRContent= document.getElementById('TLDR');

  var btnDetailed = document.getElementById('btnDetailed');
  var btnBeginner = document.getElementById('btnBeginner');
  var btnTLDR = document.getElementById('btnTLDR');

  
  simpleContent.style.display = 'block';
  complexContent.style.display = 'none';
  TLDRContent.style.display = 'none';

  btnBeginner.classList.add('active');
  btnDetailed.classList.remove('active');
  btnTLDR.classList.remove('active');
}
function showTLDR() {
  var simpleContent = document.getElementById('simple');
  var complexContent = document.getElementById('complex');
  var TLDRContent= document.getElementById('TLDR');

  var btnDetailed = document.getElementById('btnDetailed');
  var btnBeginner = document.getElementById('btnBeginner');
  var btnTLDR = document.getElementById('btnTLDR');

  
  simpleContent.style.display = 'none';
  complexContent.style.display = 'none';
  TLDRContent.style.display = 'block';
  
  btnBeginner.classList.remove('active');
  btnDetailed.classList.remove('active');
  btnTLDR.classList.add('active');
}



$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})
