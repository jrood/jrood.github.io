$(document).ready(function () {
    setInterval(function () {
        var end = $('#song')[0].duration;
        var howMuchSoFar = $('#song')[0].currentTime;
        var fraction = parseFloat(howMuchSoFar) / parseFloat(end);
        var percent = (fraction * parseFloat(100)) + "%";
        $('#thebar').css("width", percent);
    }, 100);

    $('#thebararea').click(function (event) {
        var end = parseFloat($('#song')[0].duration);
        var barAreaWidth = parseFloat($('#thebararea').width());
        var barFromEdge = parseFloat($('#thebararea').offset().left);
        var mouseInBar = parseFloat(event.pageX) - barFromEdge;
        var barFraction = mouseInBar / barAreaWidth;
        var newTime = barFraction * end;
        $('#song')[0].currentTime = newTime;
    });

    $('#play').click(function () {
        $('#song')[0].play()
        $('#play').hide();
        $('#pause').show();
    });

    $('#pause').click(function () {
        $('#song')[0].pause()
        $('#pause').hide();
        $('#play').show();
    });
    function SetFontSize(){
        if ($(window).width() < 600) {
            $('h1').css({ 'font-size': '64px' });
        } else {
            $('h1').css({ 'font-size': '96px' });
        }
    }
    SetFontSize();
    $(window).resize(function () {
        SetFontSize();
    })
});
