$(function () {
    //当我们点击了小li，这个时候不需要执行页面滚动事件里面的背景选择current
    //节流阀  互斥锁
    var flag=true;
    var toolTop = $(".recommend").offset().top;
    toggleTool();
    function toggleTool() {

        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {

            $(".fixedtool").fadeOut();
        }
    }
    $(window).scroll(function () {
        toggleTool();
        //页面滚动到某个内容区域，电梯导航的小li相应添加和删除current类名
        if(flag){
        $(".floor .w").each(function (i, ele) {
            if ($(document).scrollTop() >= $(ele).offset().top) {
                //console.log(i);
                $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
            }
        })
    }
    });
//点击电梯导航页面可以滚动到相应的内容区域
    $(".fixedtool li").click(function () {
        flag=false;
        //每次点击小li，计算 出页面要去往的位置
        // 选出对应索引号的内容区的盒子，计算它的offset().top
        var current = $(".floor .w").eq($(this).index()).offset().top;
        //页面动画滚动效果
        $("body,html").stop().animate({
            scrollTop: current
        },function(){
            flag=true;
        });
        //点击之后，让当前的小li添加current类名，兄弟移出current类名
        $(this).addClass("current").siblings().removeClass();
    })
})

window.addEventListener('load',function(){
   var arrow_l=document.querySelector('.arrow_l');
   var arrow_r=document.querySelector('.arrow_r');
   var focus=document.querySelector('.focus');
   var focusWidth=focus.offsetWidth;
   focus.addEventListener('mouseenter',function(){
       arrow_l.style.display='block';
       arrow_r.style.display='block';
       clearInterval(timer);
       //清除定时器
       timer=null;
   });
   focus.addEventListener('mouseleave',function(){
    arrow_l.style.display='none';
    arrow_r.style.display='none';
     timer=setInterval(function(){
        arrow_r.click();
    },2000);
    

});

var ul=focus.querySelector('ul');
var ol=focus.querySelector('.circle');
for(var i=0;i<ul.children.length;i++){
    var li=document.createElement('li');
    //记录小圆圈的索引号
    li.setAttribute('index',i);
    ol.appendChild(li);
    li.addEventListener('click',function(){
        for(var i=0;i<ol.children.length;i++){
            ol.children[i].className='';
        }
        this.className='current';
        var index=this.getAttribute('index');
       num=index;
     circle=index;
        animate(ul,-index*focusWidth);
    })
}
ol.children[0].className='current';
var first=ul.children[0].cloneNode(true);
ul.appendChild(first);
var circle=0;
var num=0;
var flag=true;
arrow_r.addEventListener('click',function(){
    if(flag){
        flag=false;
    if(num==ul.children.length-1){
        ul.style.left=0;
        num=0;
    }
num++;
animate(ul,-num*focusWidth,function(){
    flag=true;
});
circle++;
if(circle==ol.children.length){
    circle=0;
}
for(var i=0;i<ol.children.length;i++){
    ol.children[i].className='';

}
ol.children[circle].className='current';
}
});



arrow_l.addEventListener('click',function(){
    if(flag){
        flag=false;
    if(num==0){
        ul.style.left=-(ul.children.length-1)*focusWidth+'px';
        num=ul.children.length-1;
    }
num--;
animate(ul,-num*focusWidth,function(){
    flag=true;
});
circle--;
if(circle<0){
    circle=ol.children.length-1;
}

for(var i=0;i<ol.children.length;i++){
    ol.children[i].className='';
}
ol.children[circle].className='current';
    }
});
var timer=setInterval(function(){
    arrow_r.click();
},2000);




})