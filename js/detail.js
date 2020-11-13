window.addEventListener('load',function(){
    var preview_img=document.querySelector('.preview_img');
    var mask=document.querySelector('.mask');
    var big=document.querySelector('.big');
    preview_img.addEventListener('mouseover',function(){
        mask.style.display='block';
        big.style.display='block';
    });
    preview_img.addEventListener('mouseout',function(){
        mask.style.display='none';
        big.style.display='none';
    })
    preview_img.addEventListener('mousemove',function(e){
var x=e.pageX-this.offsetLeft;
var y=e.pageY-this.offsetTop;
var maskX=x-mask.offsetWidth/2;
var maskY=y-mask.offsetHeight/2;
//遮挡层移动的最大距离
var maskMax=preview_img.offsetWidth-mask.offsetWidth;
if(maskX<=0){
    maskX=0;
}else if(maskX>=maskMax){
    maskX=maskMax;
}
if(maskY<=0){
    maskY=0;
}else if(maskY>=maskMax){
    maskY=maskMax;  
}
mask.style.left=maskX+'px';
mask.style.top=maskY+'px';
var bigIMg=document.querySelector('.bigImg');
// console.log(bigIMg.offsetWidth);
//console.log(big.offsetWidth);
var bigMax=bigIMg.offsetWidth-big.offsetWidth;
var bigX=maskX*bigMax/maskMax;
var bigY=maskY*bigMax/maskMax;
bigIMg.style.left=-bigX+'px';
bigIMg.style.top=-bigY+'px';
    })

    var tab_list = document.querySelector('.detail_tab_list');
    var lis = tab_list.querySelectorAll('li');
    var items = document.querySelectorAll('.item');
    for (var i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i);
        lis[i].onclick = function () {
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            for (var i = 0; i < items.length; i++) {
                items[i].style.display = 'none';
            }
            items[index].style.display = 'block';
        }
    }



})