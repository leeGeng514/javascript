window.onload = function(){


    var btn = document.querySelector('.btn');

    var leftBox = document.querySelector('.left-box');
    var rightBox = document.querySelector('.right-box');
    var number = document.querySelector('.number');

    var timer = 0;

    var isClick = true;


    btn.onclick = function(){
        if(!isClick) return;
        isClick = false;


        var leftText = leftBox.value.trim();
        var len = leftText.length;
        var num = 0;
        timer = setInterval(function(){
            num++;
            leftBox.value = leftText.slice(num);
            rightBox.value= leftText.slice(0,num);
            number.innerHTML = num + '/' + len;

            if(num == len){
                clearInterval(timer);
                isClick = true;
            }
        },200);
    };

};