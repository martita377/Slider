$(document).ready(function() {
    var carousel = $('#carousel ul');
    var carouselList = $("#carousel ul");
    var elements = $('.img', carouselList).length;
    var Indx = 0;

    function move(direction) {
        if (!carousel.is(':animated')) {
            if (direction === 'left') {
                moveLeft(1000);
            } else {
                moveRight(1000);
            }
        }
    }

    function moveLeft(timeOfAnimation) {
        carousel.animate({
            marginLeft: -500
        }, timeOfAnimation, function() {
            carousel.find("li:last").after(carousel.find("li:first"));
            carousel.css('marginLeft', 0);
            countPlusIndx();
        });
    }

    function moveRight(timeOfAnimation) {
        carousel.find('li:first').before(carousel.find('li:last'));
        carousel.css('marginLeft', '-500px').animate({
            marginLeft: 0
        }, timeOfAnimation, countMinusIndx);
    }

    //Start slide changing
    function repeat() {
        setInterval(function() {
            move('left');
        }, 5000);
    }
    repeat();

    //Stop slide changing
    function stopRepeat() {
        clearInterval(repeat);
    }
    // Navigation by left arrow 
    $('.left-arrow').click(function() {
        stopRepeat();
        move('left');
    });
    // Navigation by right arrow 
    $('.right-arrow').click(function() {
        stopRepeat();
        move('right');
    });

    //Count index 
    function countPlusIndx() {
        if (Indx < elements - 1) {
            Indx++;
        } else {
            Indx = 0;
        }
        setBubble(Indx);
    }

    function countMinusIndx() {
        if (Indx <= 0) {
            Indx = elements - 1;
        } else {
            Indx--;
        }

        setBubble(Indx);
    }

    //Change bubble
    function setBubble(Indx) {
        $('.bubble').css('background', 'rgba(0,0,0,0)');
        $('.bubble').eq(Indx).css('background', '#ccc');
    }

    //Change image by bubble 
    $('.bubble').click(function() {
        stopRepeat();
        $('.bubble').css('background', 'rgba(0,0,0,0)');
        $(this).css('background', '#ccc');

        var IndxOfBubble = $('.bubble').index(this);
        var result = -Indx + IndxOfBubble;

        if (result > 0) {
            for (var i = 0; i < result; i++) {
                moveLeft(50);
            }
        } else if (result < 0) {
            result = (-1 * result);
            for (var i = 0; i < result; i++) {
                moveRight(50);
            }
        }
    });


});