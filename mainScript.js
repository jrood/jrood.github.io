ko.bindingHandlers.audioControl = {
    init: function (element, valueAccessor) {
        var audioEl = $(element).parent().siblings('audio')[0];
        if (valueAccessor() == "play") $(element).click(function () {
            $('.pauseButton').trigger("click");
            audioEl.play();
            $(element).siblings().show();
            $(element).hide();
        });
        if (valueAccessor() == "pause") $(element).click(function () {
            audioEl.pause();
            $(element).siblings().show();
            $(element).hide();
        });
        if (valueAccessor() == "barArea") {
            setInterval(function () {
                var end = parseFloat(audioEl.duration);
                var howMuchSoFar = parseFloat(audioEl.currentTime);
                var fraction = howMuchSoFar / end;
                var percent = (fraction * parseFloat(100)) + "%";
                $(element).children().css("width", percent);
            }, 100);
            $(element).click(function (event) {
                var end = parseFloat(audioEl.duration);
                var barAreaWidth = parseFloat($(element).width());
                var barFromEdge = parseFloat($(element).offset().left);
                var mouseInBar = parseFloat(event.pageX) - barFromEdge;
                var barFraction = mouseInBar / barAreaWidth;
                var newTime = barFraction * end;
                audioEl.currentTime = newTime;
            });
        }
    }
}

var accordionItem = 0;

ko.bindingHandlers.setHrefToGrandparentSibling = {
    init: function (element, valueAccessor) {
        collapsingEl = $(element).parent().parent().siblings();
        accordionItem++;
        collapsingEl.attr("ID", accordionItem);
        $(element).attr("href", "#" + accordionItem);
    }
}

$(document).ready(function () {
    ko.applyBindings();
    function SetFontSize(){
        if ($(window).width() > 600) {
            $('h1').css({ 'font-size': '96px' });
        } else if ($(window).width() <= 600 && $(window).width() > 500) {
            $('h1').css({ 'font-size': '80px' });
        } else if ($(window).width() <= 500 && $(window).width() > 450) {
            $('h1').css({ 'font-size': '64px' });
        } else {
            $('h1').css({ 'font-size': '48px' });
        }
    }
    SetFontSize();
    $(window).resize(function () {
        SetFontSize();
    })
});
