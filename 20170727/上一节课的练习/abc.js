
//放在头部的js是拿不到下面的元素，因为元素加载比js慢，所以要让js等待元素加载完成在执行

var userName = 0;


window.onload = function(){
    //window.onload   等待窗口中元素加载完成后

    //数据整理：

    /*
    * 功能：存储图片路径
    * imgArr: 存放图片路径的变量
    * */
    var imgArr = [
        '../img/a.jpg', //下标-0
        '../img/b.jpg', //下标-1
        '../img/c.jpg', //下标-2
        '../img/d.jpg', //下标-3
        '../img/e.jpg', //下标-4
        '../img/f.jpg' //下标-5
    ];//地址是通过 imgArr[下标] 来获取

    /*
    *
    * */
    var tipTextArr = [
        'yi',
        'er',
        'san',
        'si',
        'wu',
        'liu'
    ];//地址是通过 tipTextArr[下标] 来获取

    /*
    * 功能：获取内容的下标
    * index:初始化的下标变量名
    * 默认值是：index = 0;
    * 默认获取数组中的第0个；
    * */
    var index = 0;

    //初始化统计：
    document.querySelector('.top-total').innerHTML = index+1+'/'+imgArr.length;
    //文字内容默认数据
    document.querySelector('.bot-text').innerHTML = tipTextArr[index];





    //基本流程：

    /*
    * 功能：循环或者顺序切换模式
    * 按钮：
    *   loopBtn:切换到循环模式的按钮
    *   orderBtn:切换到顺序模式的按钮
    * */
    var loopBtn = document.querySelector('.loop-btn');
    var orderBtn = document.getElementsByClassName('order-btn')[0];

    /*
    * 功能：存放当前模式文字地方
    * 保存元素的变量名：mTextBox
    * */
    var mTextBox = document.querySelector('.toggle-btn p')

    /*
    * 功能：记录程序中图片切换的模式
    * 参数说明：
    *   m = 0;  循环模式
    *   m = 1;  顺序模式
    * loopBtn点击的时候   m=0;
    * orderBtn点击的时候  m=1;
    * */
    var m = 0;

    /*
    * 功能：修改m值（修改主程序的切换模式）
    * loopBtn 被点击时 修改  m  为 0；
    * orderBtn 被点击时  修改 m 为 1；
    * */
    loopBtn.onclick = function(){
        m = 0;
        //当前是循环模式，所以把循环设置成当前高亮
        loopBtn.className = 'loop-btn active';
        //当前是循环模式，所以把顺序按钮取消高亮
        orderBtn.className = 'order-btn';
        //修改当前模式的描述文字
        mTextBox.innerHTML = '循环模式';

    };
    orderBtn.onclick = function(){
        m = 1;
        //当前是顺序模式，所以把顺序按钮设置成当前高亮
        orderBtn.className = 'order-btn active';
        //当前是顺序模式，所以把循环取消高亮
        loopBtn.className = 'loop-btn';
        //修改当前模式的描述文字
        mTextBox.innerHTML = '顺序模式';
    };


    //切换图片模块 基本流程

    /*
    * 功能：点击按钮切换图片内容
    *
    * 按钮：
    *   prevBtn: 向左切换图片的按钮
    *   nextBtn: 向右切换图片的按钮
    * 图片盒子：
    *   imgBox: 存放图片的元素
    * */
    var prevBtn = document.querySelector('.prev');
    var nextBtn = document.querySelector('.next');
    var imgBox = document.querySelector('.imgs img');

    /*
    * 功能：向左切换图片
    * 功能描述：
    *   点击pervBtn按钮，切换图片
    * */
    prevBtn.onclick = function(){
        index--;//切换图片时，要修改下标值
        if(index<0){
            if(m==0){
                //循环模式
                index = imgArr.length-1;
            }
            if(m==1){
                //顺序模式
                index = 0;
                markBox.style.display = 'block';
            }
        }
        imgBox.src = imgArr[index];
        document.querySelector('.top-total').innerHTML = index+1+'/'+imgArr.length;
        document.querySelector('.bot-text').innerHTML = tipTextArr[index];
    };

    /*
     * 功能：向右切换图片
     * 功能描述：
     *   点击nextBtn按钮，切换图片
     * */
    nextBtn.onclick = function(){
        index++;//切换图片时，要修改下标值
        if(index>imgArr.length-1){
            if(m==0){
                //循环模式
                index = 0;
            }
            if(m==1){
                //顺序模式
                index = imgArr.length-1;
                markBox.style.display = 'block';
            }
        }
        imgBox.src = imgArr[index];
        document.querySelector('.top-total').innerHTML = index+1+'/'+imgArr.length;
        document.querySelector('.bot-text').innerHTML = tipTextArr[index];
    };

    /*
    * 功能： 管理弹层
    *
    * 按钮：
    * closeBtn:关闭弹层的按钮
    * 提示内容框：
    * tipText:内容提示框
    * 遮罩层：
    * markBox:整个弹窗
    *
    * */
    var closeBtn = document.querySelectorAll('.close');
    var tipText = document.querySelector('.tip-text p');
    var markBox = document.querySelector('.mark');


    /*
    * 功能：
    * 描述：
    *
    * */
    closeBtn[0].onclick = closeBtn[1].onclick = function(){
        markBox.style.display = 'none';
    };









};