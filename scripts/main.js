/* ======= Countdown ========= */
// set the date we're counting down to
var target_date = new Date("December 22, 2016").getTime();

// variables for time units
var days, hours, minutes, seconds;

// update the tag with id "countdown" every 1 second
setInterval(function () {
    var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;

    days = parseInt(seconds_left / 86400);
    seconds_left = seconds_left % 86400;

    hours = parseInt(seconds_left / 3600);
    seconds_left = seconds_left % 3600;

    minutes = parseInt(seconds_left / 60);
    seconds = parseInt(seconds_left % 60);

    // format countdown string + set tag value.
    $('#days').text(days);
    $('#hours').text(hours);
    $('#minutes').text(minutes);
    $('#seconds').text(seconds);
}, 1000);

$('#carousel').on('slide.bs.carousel', function() {
    $('.slide-indicator').removeClass('active');
});

$('#carousel').on('slid.bs.carousel', function() {
    var id = $(this).find('.carousel-item.active').attr('id');
    $('.slide-indicator[data-carousel="#' + id + '"]').addClass('active');
});

$('.sticky').Stickyfill();
$('#rsvp .loading').hide();

$('.form').on('submit', function(e) {
    e.preventDefault();
    var record = {
        Name: $('#Name').val(),
        Email: $('#Email').val(),
        Attending: $('#Attending').val(),
        Guests: $('#Guests').val(),
        Breakfast: $('#Breakfast').val(),
        Additional: $('#Additional').val()
    };

    $('#rsvp .modal-body, #rsvp .modal-footer').slideUp();
    $('#rsvp .loading').slideDown();

    $.ajax('https://sheetsu.com/apis/v1.0/a3545ebaa831', {
        method: 'post',
        dataType: 'json',
        data: record,
        success: function() {
            $('#rsvp').modal('hide');
            $('#rsvp .modal-body, #rsvp .modal-footer').slideDown();
            $('#rsvp .loading').hide();
            $('#displayName').text(record.Name);
            $('#thanks').modal('show');
            setTimeout(function() { $('#thanks').modal('hide'); }, 1000);
        },
        error: function() {
            $.ajax({
                url: "https://formspree.io/maddi@maddijoyce.com",
                method: "POST",
                data: record,
                dataType: "json",
            });
        },
    });
});

$('a[href^="#"]').on('click', function(e) {
    $('#main-menu').collapse('hide');
});
