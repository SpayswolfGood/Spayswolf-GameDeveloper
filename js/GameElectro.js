window.requestAnimationFrame = function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msReqestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback);
        }
    );
};