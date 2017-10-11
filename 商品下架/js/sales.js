window.onload = function(){


    /*
    * 思路：
    *
    * 1. 商品倒计时功能 (ok)
    * 2. 倒计时结束 (ok)
    * */


    //页面结构太复杂，传数据怎么弄？

    var item = document.querySelectorAll('.item');
    var len = item.length;

    for(var i = 0; i < len; i++){
        init(item[i]);
    }


    function init(obj){
        var inp = obj.querySelector('.inp'); //输入时间框
        var btn = obj.querySelector('.btn'); //确定按钮

        //确定按钮点击事件
        btn.onclick = function(){

            clearInterval(obj.timer); //每次点击先清除定时器

            var time = inp.value.trim(); //拿到用户输入的时间

            if(validate(time)){ //通过验证

                var t = generateT(time); //将用户输入的时间字符串转成日期对象

                countDown(t,obj); //倒计时开始

                obj.timer = setInterval(function(){
                    countDown(t,obj);
                },1000);
            }

        };

    }

    /**
     * 根据用户填写的时间，开始倒计时
     * @param t
     * @param obj
     */
    function countDown(t,obj){

        var today = Date.now()/1000;

        var salesDate = t.getTime()/1000;

        if(salesDate - today > 0){

            var h = preZero(parseInt((salesDate - today)/3600)).toString(); //距离活动结束还有多少小时

            var m = preZero(parseInt((salesDate - today)%3600/60)).toString(); //距离活动结束还有多少分钟

            var s = preZero(parseInt((salesDate - today)%60)).toString(); //距离活动结束还有多少秒

            // console.log('h '+h);
            // console.log('m '+m);
            // console.log('s '+s);

            var tempArr = (h+m+s).split('');

            var is = obj.querySelectorAll('i'); // 倒计时时间

            for(var i = 0; i < is.length; i++){
                is[i].innerHTML = tempArr[i];
            }
        }else {
            salesExpired(obj);
        }

    }

    /**
     * 日期验证函数
     * 1. 如果为空，返回false
     * 2. 如果不是日期格式, 返回false
     * 3. 如果用户填写的日期小于当前日期, 返回false
     * 4. 如果用户填写的日期大于当前日期三天 返回false
     * 5. 如果日期正确, 返回true
     * @param t 用户输入的下架时间
     * @returns {boolean}
     */

    function validate(t){

        //如果用于没有填写任何日期
        if(t==''){
            alert("请输入商品下架时间");
            return false;
        }

        //如果用户填写的日期格式不对
        var result = t.match(/^\d{4}-\d{1,2}-\d{1,2}\s\d{1,2}:\d{1,2}:\d{1,2}$/);

        if(!result){
            alert("您输入的下架时间格式不对，请填写: yyyy-mm-dd hh:mm:ss");
            return false;
        }



        //如果用户填写的日期小于当前日期
        var date = generateT(t);

        if(date.getTime() < Date.now()){
            alert("您输入的下架时间必须大于当前时间");
            return false;
        }



        //如果用户填写的日期大于当前日期三天
        var plan = date.getTime()/1000; // 拿到下架日期距1970的秒数

        var now = Date.now()/1000; // 拿到此时此刻距离1970的秒数

        if((plan-now)/86400 > 3){
            alert("最大下架日期为3天,您输入的下架日期超出规定日期"+parseInt((plan-now)/86400 - 3)+"天"+ parseInt((plan-now)%86400/3600)+'时'+ parseInt((plan-now)%3600/60)+'分'+parseInt((plan-now)%60)+'秒');
            return false;
        }

        //如果用户填写的是正确日期
        return true;

    }



    /**
     * 将用户输入的字符串'yyyy-mm-dd hh:mm:ss'转换为日期对象
     * @param t
     * @returns {Date}
     */

    function generateT(t){

        var dtArr = [];

        dtArr = t.split(/-|:|\s/);

        var date = new Date(dtArr[0],dtArr[1]-1,dtArr[2],dtArr[3],dtArr[4],dtArr[5]);

        return date;
    }


    /**
     * 下架日期到期了，显示下架戳
     * 商品信息填写在列表中
     * @param obj
     */
    function salesExpired(obj){
        clearInterval(obj.timer);

        var stamp = obj.querySelector('.stamp');
        var mask = obj.querySelector('.mask');

        stamp.style.opacity = '1';
        stamp.style.transform = 'scale(1)';

        setTimeout(function(){
            mask.className = 'mask';
            shake(obj,'left',30,5,function(){
                fillInfo(obj);
            });
        },500);

    }

    /**
     * 将商品信息填写在列表中
     * @param obj
     */

    function fillInfo(obj){

        var title = obj.querySelector('.title');
        var price = obj.querySelector('.price');
        var img = obj.querySelector('img');

        var table = document.querySelector('.prod-table');

        var tr = document.createElement("tr");

        var tdName = document.createElement('td');
        var tdPrice = document.createElement('td');
        var tdThumbnail = document.createElement('td');

        tr.className = 'detail';

        tdName.innerHTML = title.innerHTML;
        tdName.className = 'name';

        tdPrice.innerHTML = price.innerHTML;
        tdPrice.className = 'price';

        tdThumbnail.innerHTML = img.outerHTML; //要拿到<img src='xxx'/>，得用img.outerHTML
        tdThumbnail.className = 'img';

        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tr.appendChild(tdThumbnail);

        table.append(tr);
    }

};