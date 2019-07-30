import _ from 'lodash';
var element = document.createElement('div');
element.innerHTML = _.join(['a', 'b', 'c'], '***');
document.body.appendChild(element)

// function getComponent() {
//   return import(/* webpackChunkName:"xcp" */'lodash').then(({ default: _ }) => {
//       var element = document.createElement('div');
//       element.innerHTML = _.join(['a', 'b', 'c'], '***');
//       return element;
//   });
// }

// getComponent().then(element => {
//     document.body.appendChild(element)
// })

const dom = document.getElementById('root');
dom.innerHTML = '<div class="iconfont iconfenleishouye">Hl</div>';

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/service-worker.js')
//       .then(registration => {
//         console.log('service-worker registed');
//       })
//       .catch(error => {
//         console.log('service-worker register error');
//       });
//   });
// }

// var promise1 = new Promise(function(resolve, reject) {
//   setTimeout(resolve, 500, 'one');
// });
// var pormise2 = new Promise(function(resolve, reject) {
//   setTimeout(resolve, 100, 'two');
// });
// Promise.race([promise1, pormise2]).then(function(value) {
//   console.log(value);
// });

// const xcp = ['x','c','p'];
// xcp.map((item,index) => {
//   console.log(item,index)
// })
