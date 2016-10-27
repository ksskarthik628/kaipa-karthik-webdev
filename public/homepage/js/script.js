$(function(){
    $("#heading").typed({
        stringsElement: $('#heading-text'),
        typeSpeed: 100,
        loop: false,
        contentType: 'text',
        loopCount: false,
        preStringTyped: function() {
            $("#heading").css('display', 'block');
            $("#heading-text").css('display', 'none');
        },
        callback: function () {
            $("#heading").css('display', 'none');
            $("#heading-text").css('display', 'block');
        }
    });
});