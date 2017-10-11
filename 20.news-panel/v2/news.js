window.onload = function(){


    // data
    var tabName = ['专题','视频','汽车','科技'];


    var news = [
            {
                title:'全面从严治党永远在路上',
                date:'2017.08.14',
                img:'img/m1.png',
                column:'专题'
            },

            {
                title:'媒体：这一次美国真的要向中国“开战”',
                date:'2017.08.15',
                img:'img/m2.png',
                column:'专题'
            },

            {
                title:'中国一项正常人事任命 缘何惊动西方媒体',
                date:'2017.08.16',
                img:'img/m3.png',
                column:'专题'
            },

            {
                title:'解放军76集团军特战部队在高原展开陆空联合演习',
                date:'2017.08.11',
                img:'img/m4.png',
                column:'视频'
            },

            {
                title:'战狼2》票房入全球影史百强 国外却因这原因不承认',
                date:'2017.08.12',
                img:'img/m1.png',
                column:'视频'
            },


            {
                title:'高校推暑期共享宿舍：每日25元 可用食堂图书馆',
                date:'2017.08.13',
                img:'img/m2.png',
                column:'视频'
            },


            {
                title:'11月亮相沃尔沃国产全新XC60实车',
                date:'2017.08.10',
                img:'img/m3.png',
                column:'汽车'
            },

            {
                title:'预售13万起斯柯达高口碑车将上市',
                date:'2017.08.12',
                img:'img/m4.png',
                column:'汽车'
            },


            {
                title:'大Q7一圈!别克全新最大SUV要国产',
                date:'2017.08.16',
                img:'img/m1.png',
                column:'汽车'
            },

            {
                title:'中国联通新引入战略投资者合计持A股公司35.19%股份',
                date:'2017.08.13',
                img:'img/m4.png',
                column:'科技'
            },


            {
                title:'80后华人科学家获阿尔伯尼奖 该奖被视为诺奖风向标',
                date:'2017.08.10',
                img:'img/m3.png',
                column:'科技'
            },

            {
                title:'美媒看衰超级高铁：纽约到华盛顿挖隧道要挖100年',
                date:'2017.08.12',
                img:'img/m2.png',
                column:'科技'
            }

    ];



    //获取元素
    var panel = document.querySelector('.panel'); //panel

    var tabs = document.querySelector('.tabs'); //tabs

    var tab = tabs.getElementsByTagName('li'); //tab

    var newslist = document.querySelector('.list'); //新闻列表

    var items = newslist.getElementsByTagName('li'); //每一条新闻


    var img = document.querySelector('.img'); //新闻图片
    var title = document.querySelectorAll('.title'); //新闻标题
    var date = document.querySelectorAll('.date'); //新闻日期

    var newsPerColumn = 3;

    var tabIndex = 0; //记录tab的位置

    var newsIndex = 0; //记录news的位置

    var timer = null;



    //初始化新闻界面
    // 根据栏目数据填充tab数量和内容
    fillTabs(tabName);


    // 根据第一个tab名显示第一屏信息
    fillNews(tabName[0]);


    //开始循环滚动新闻
    autoPlay();


    //移入新闻界面，停止播放新闻
    panel.onmouseover = stopPlay;

    //移出新闻界面，开始播放新闻
    panel.onmouseout = autoPlay;



    function stopPlay(){
        clearInterval(timer);
    }


    function autoPlay(){

        timer = setInterval(function(){

            items[newsIndex].className = 'item'; ///上一次的news取消高亮

            newsIndex++;

            if(newsIndex > items.length-1){

                tab[tabIndex].className = 'tab';

                tabIndex++;

                if(tabIndex > tab.length -1){
                    tabIndex = 0;
                }

                tab[tabIndex].className = 'tab active';

                fillNews(tabName[tabIndex]);

                newsIndex = 0;
            }

            items[newsIndex].className = 'item active'; ///当前news高亮

        },1000);
    }


    //根据tab数组来放tab内容,并给出合适的tab宽度
    function fillTabs(arr){
        var panelW = parseFloat(getCss(panel,'width'));
        for(var i = 0; i < arr.length; i++){
            tabs.innerHTML += '<li class="tab">'+arr[i]+'</li>';
            tab[i].style.width = panelW /arr.length - 10 + 'px'; //根据数量,计算每一个tab的宽度
        }

        tab[0].className = 'tab active'; //默认第0个tab是高亮状态


        //添加tab的移入移出事件
        for(var j = 0; j < tab.length; j++){
            (function(index){

                tab[j].onmouseover = function(){

                    items[newsIndex].className = 'item';
                    tab[tabIndex].className = 'tab';

                    tabIndex = index;
                    newsIndex = 0;

                    items[newsIndex].className = 'item active';
                    tab[tabIndex].className = 'tab active';

                    fillNews(tabName[tabIndex]);

                };

            })(j)
        }
    }


    //根据当前tab数组填放新闻内容
    function fillNews(name){

        //从数据中拿到对应栏目的新闻，放入一个新数组里
        var columnArr = [];

        for ( var i = 0; i < news.length; i++){
            if(news[i].column == name){
                columnArr.push(news[i]);
                if(columnArr.length == newsPerColumn) break; //最多显示三条新闻
            }
        }


        //将新数组里地新闻，从新到旧排序，这样每次显示的都是最新的新闻
        columnArr.sort(function(m,n){
            return Date.parse(n.date.replace('.','-'))-Date.parse(m.date.replace('.','-'));
        });

        //每次清空新闻列表，写入最新新闻 ?????如何优化??????
        newslist.innerHTML = '';

        for ( var j = 0; j < columnArr.length; j++){
            newslist.innerHTML +='<li class="item">'+
                '<img src="'+columnArr[j].img+'">'+
                '<div class="text"><h3>'+columnArr[j].title+'</h3>'+
                '<span>'+columnArr[j].date+'</span></div>'+
                '</li>';
        }

        items[0].className = 'item active';

        panel.style.height = newsPerColumn * 60 + 80 + 'px';

        //重新绑定新闻鼠标移入、移出事件
        bindNewsEvent();

    }

    //批量添加每条新闻鼠标移入、移出事件
    function bindNewsEvent(){
        for(var i = 0; i < items.length; i++){
            (function(index){
                items[index].onmouseover = function(){
                    items[newsIndex].className = 'item';
                    items[index].className = 'item active';
                    newsIndex = index;
                };
            })(i);
        }
    }


    function getCss(obj,attr){
        return getComputedStyle(obj)[attr];
    }

};