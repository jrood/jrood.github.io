var accordionLayout = [
    {
        header: "Samples of Current Projects",
        songs: [
            { name: "Dreaming in jQuery", url: "audio/newStuff/Dreaming in jQuery.mp3" },
            { name: "congregating banana chips", url: "audio/newStuff/Strumming Synth Experimentation.mp3" },
            { name: "Don't stay in college forever", url: "audio/newStuff/Don't stay in college forever.mp3" },
            //{ name: "Self-Contained Underwater Jamming Apparatus (SCUJA) A-Darwin on Bass", url: "audio/newStuff/Self-Contained Underwater Jamming Apparatus (SCUJA) (feat A-Darwin on Bass).mp3" },
            { name: "Pumpkin Stew", url: "audio/newStuff/Pumpkin Stew by Roodimentary Sciences.mp3" }
        ],
        otherContentID: ""
    },
    {
        header: "Album #2 - Freshly Squeezed Beats EP",
        songs: [
            { name: "Swagmaster's Breakfast", url: "audio/album2/Swagmaster's Breakfast.mp3" },
            { name: "Junior Varsity Ping Pong Team Theme", url: "audio/album2/Junior Varsity Ping Pong Team Theme.mp3" },
            { name: "Metal Detector in D# Minor", url: "audio/album2/Metal Detector in D Sharp Minor.mp3" },
            { name: "Dispenception", url: "audio/album2/Dispenception.mp3" },
            { name: "Apricots in the Atmosphere", url: "audio/album2/Apricots in the Atmosphere.mp3" }
        ],
        otherContentID: ""
    },
    {
        header: "Album #1 - Roodimentary Sciences",
        songs: [
            { name: "Post-Trib Return to Chicago", url: "audio/album1/01_Post-Trib Return to Chicago.mp3" },
            { name: "8-Bit Live", url: "audio/album1/02_8-Bit Live.mp3" },
            { name: "Summer at the South Pole", url: "audio/album1/03_Summer at the South Pole.mp3" },
            { name: "Straddling the Escarpment", url: "audio/album1/04_Straddling the Escarpment.mp3" },
            { name: "The Strengths of Twelfths (feat A-Darwin on Bass)", url: "audio/album1/05_The Strengths of Twelfths (feat A-Darwin on Bass).mp3" },
            { name: "Attack of the Robotic Octopus", url: "audio/album1/06_Attack of the Robotic Octopus.mp3" },
            { name: "Policemen in Jetpacks", url: "audio/album1/07_Policemen in Jetpacks.mp3" },
            { name: "Dance of the Arabian Barber", url: "audio/album1/08_Dance of the Arabian Barber.mp3" },
            { name: "Gravitation Violation", url: "audio/album1/09_Gravitation Violation.mp3" },
            { name: "The Dog Days of March", url: "audio/album1/10_The Dog Days of March.mp3" },
            { name: "I'll Give You Anything - Sally Callahan (Roodimentary Sciences Remix)", url: "audio/album1/11_I'll Give You Anything - Sally Callahan (Roodimentary Sciences Remix).mp3" }
        ],
        otherContentID: ""
    },
    {
        header: "About",
        songs: [],
        otherContentID: "about-template"
    }
];

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
        } else {
            $('h1').css({ 'font-size': '64px' });
        }
    }
    SetFontSize();
    $(window).resize(function () {
        SetFontSize();
    })
});
