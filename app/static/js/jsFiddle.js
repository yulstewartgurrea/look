// var showAll = document.getElementById('show-all');
// showAll.onclick = function () {
//     var divs = document.querySelectorAll('div');
//     for (var i = 0; i < divs.length; i++) {
//         divs[i].className = 'force-show';
//     }
// }

// var showAll = document.getElementById('show-all');
// var divs = document.querySelectorAll('div');
// var links = document.querySelectorAll('a[href^="#"]');
//
// showAll.onclick = function () {
//     for (var i = 0; i < divs.length; i++) {
//         divs[i].className = 'force-show';
//     }
// }
//
// for (var i = 0; i < links.length; i++) {
//     links[i].onclick = (function (i) {
//         return function () {
//             hideAllDivs();
//             var linkDiv = document.getElementById(links[i].getAttribute('href').slice(1));
//             linkDiv.className = 'force-show';
//         }
//     })(i);
// }
//
// function hideAllDivs() {
//     for (var i = 0; i < divs.length; i++) {
//         divs[i].className = '';
//     }
// }