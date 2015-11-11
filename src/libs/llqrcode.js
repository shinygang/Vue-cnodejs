var gCtx = null;
var gCanvas = null;
var c = 0;
var stype = 0;
var gUM = false;
var webkit = false;
var moz = false;
var v = null;
function dragenter(e) {
    e.stopPropagation();
    e.preventDefault()
}
function dragover(e) {
    e.stopPropagation();
    e.preventDefault()
}
function drop(e) {
    e.stopPropagation();
    e.preventDefault();
    var dt = e.dataTransfer;
    var files = dt.files;
    if (files.length > 0) {
        handleFiles(files)
    } else {
        if (dt.getData("URL")) {
            qrcode.decode(dt.getData("URL"))
        }
    }
}
function handleFiles(f) {
    var o = [];
    for (var i = 0; i < f.length; i++) {
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
                var img = new Image();
                img.onload = function() {
                    setTimeout(function() {
                        document.getElementById("canvas_ext_div").style.display = "none";
                        document.getElementById("canvas_ext_h2").style.display = "none";
                        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
                    },
                    0)
                };
                img.src = e.target.result;
                qrcode.decode(e.target.result)
            }
        })(f[i]);
        reader.readAsDataURL(f[i])
    }
}
exports.getCheck = handleFiles;

function initCanvas(w, h) {
    gCanvas = document.getElementById("qr-canvas");
    gCanvas.style.width = w + "px";
    gCanvas.style.height = h + "px";
    gCanvas.width = w;
    gCanvas.height = h;
    gCtx = gCanvas.getContext("2d");
    gCtx.clearRect(0, 0, w, h)
}
function captureToCanvas() {
    if (stype != 1) {
        return
    }
    if (gUM) {
        try {
            gCtx.drawImage(v, 0, 0);
            try {
                qrcode.decode()
            } catch(e) {
                setTimeout(captureToCanvas, 500)
            }
        } catch(e) {
            console.log(e);
            setTimeout(captureToCanvas, 500)
        }
    }
}
function htmlEntities(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}
function read(a) {
    var html = "";
    if (a.indexOf("http://") === 0 || a.indexOf("https://") === 0) {
        html += "<a target='_blank' href='" + a + "'>" + a + "</a><br>"
    }
    html += "<b>" + htmlEntities(a) + "</b>";
    console.log(html);
    //document.getElementById("qrcode_content").innerHTML = html
}
function isCanvasSupported() {
    var elem = document.createElement("canvas");
    return !! (elem.getContext && elem.getContext("2d"))
}
function success(stream) {
    if (webkit) {
        v.src = window.webkitURL.createObjectURL(stream)
    } else {
        if (moz) {
            v.mozSrcObject = stream;
            v.play()
        } else {
            v.src = stream
        }
    }
    gUM = true;
    setTimeout(captureToCanvas, 500)
}
function error(error) {
    gUM = false;
    return
}
function load() {
    if (isCanvasSupported() && window.File && window.FileReader) {
        initCanvas(360, 360);
        qrcode.callback = read;
        setimg()
    } else {}
}
function setimg() {
    var qrfile = document.getElementById("qrfile");
    qrfile.addEventListener("dragenter", dragenter, false);
    qrfile.addEventListener("dragover", dragover, false);
    qrfile.addEventListener("drop", drop, false)
};