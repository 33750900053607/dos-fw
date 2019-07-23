// JavaScript Document

$(window).load(function (){
    
    $("#typecheck").click(function(){
    var wktype = [0,0,0];
    var wktypename = ["ヴァータ","ピッタ","カファ"];
    var wkresult = "";
    var wktypecnt = 0;
    var wktyperes = "2";
    var wkmax = 0;
    var i = 0;
    for(i=0;i<30;i++ ){
        if(document.forms[0].elements[i].checked === true){
            wktypecnt = wktypecnt + 1;
            switch (document.forms[0].elements[i].value) {
                case "v":
                    wktype[0] = wktype[0] + 1;
                    break;
                case "p":
                    wktype[1] = wktype[1] + 1;
                    break;
                case "k":
                    wktype[2] = wktype[2] + 1;
                    break;
                default:
                    break;
            }
        }
    }
    
    if (wktypecnt !== 10){
        alert("全ての項目にチェックをしてください。");
        return false;
    }
    
    //診断
    wkmax = Math.max.apply(null, wktype);
    var maxindex = wktype.indexOf(wkmax);
    
     if (wkmax > 6) { //どっかが7以上ある＝どうなっても二位の二倍以上
        wktyperes = "1";
        wkresult = wktypename[wktype.indexOf(wkmax)]
     } else if (wkmax > 5) {
        if(Math.min.apply(null, wktype) > 0){　//6の場合、どこかが0のとき以外は二位の二倍以上
        wktyperes = "1";
        wkresult = wktypename[wktype.indexOf(wkmax)]
        }
        //elseの場合初期値でOK
    } else if (wkmax === 4) {
        if(Math.min.apply(null, wktype) === 3){　//4,3,3の組み合わせのときだけTYPE3
             wktyperes = "3";
             wkresult = wktypename.join("-");
         }
        //elseの場合初期値でOK
    }  //これ以外は初期値でOK
    
    if(wktyperes === "2"){ //初期値のときの処理
        wktypename[wktype.indexOf(Math.min.apply(null, wktype))] = "";
        wktypename = $.grep(wktypename, function(n){return n !== "";});
        wkresult = wktypename.join("-");
    }
    
    //診断結果を表示
        
    $("#imi_result"). animate( { height: 'show' }, 'slow' );


    //2015.11.09 amitani 追加 ----------------------------------------------
    wktypename = ['<span class="txt_grn">ヴァータ</span>'
                , '<span class="txt_red">ピッタ</span>'
                , '<span class="txt_bl1">カファ</span>'];
    var wktypeSub = [];
    for(i = 0;i<=2;i++){wktypeSub[i] = wktype[i];}
    wktypeSub.sort(function(a,b){return b - a;});
    var str = [];
    for(i = 0;i<=2;i++){
        if(wktype[0] == wktypeSub[i]){
            if(wktypename[0].length > 0){str.push(wktypename[0]);wktypename[0] = '';}
        }
        if(wktype[1] == wktypeSub[i]){
            if(wktypename[1].length > 0){str.push(wktypename[1]);wktypename[1] = '';}
        }
        if(wktype[2] == wktypeSub[i]){
            if(wktypename[2].length > 0){str.push(wktypename[2]);wktypename[2] = '';}
        }
    }
    if(wktyperes === "1"){str.pop();str.pop();}
    if(wktyperes === "2"){str.pop();}
    wkresult = str.join('-');

    /* 票数の順番も変える場合は、こちら
        var wktypeSub = [];
        for(i = 0;i<=2;i++){wktypeSub[i] = wktype[i];}
        wktypeSub.sort(function(a,b){return b - a;});
        var liTag = [];
        liTag[0] = '<li><img src="img/icon05.png" alt="ヴァータ"/><p id="result_g">0</p></li>';
        liTag[1] = '<li><img src="img/icon06.png" alt="ピッタ"/><p id="result_r">0</p></li>';
        liTag[2] = '<li><img src="img/icon07.png" alt="カファ"/><p id="result_b">0</p></li>';
        var str = '';
        for(i = 0;i<=2;i++){
            if(wktype[0] == wktypeSub[i]){str = str + liTag[0];liTag[0] = '';}
            if(wktype[1] == wktypeSub[i]){str = str + liTag[1];liTag[1] = '';}
            if(wktype[2] == wktypeSub[i]){str = str + liTag[2];liTag[2] = '';}
        }
        $("#imi_result ul").html(str);
    */
    //------------------------------------------------------------ ここまで


//    $("#resulttxt").text(wktyperes + "-ドーシャタイプ");
//    $("#resulttxt").text(wkresult + "タイプ");
    $("#resulttxt").html(wkresult + "タイプ");
    $("#result_g").text(wktype[0]);
    $("#result_r").text(wktype[1]);
    $("#result_b").text(wktype[2]);

    return false; 
    });
    
    
    //表示後に値を変えた場合の処理
    if ($("#imi_result").is(":hidden")) {
        $( 'input:radio' ).change( function() {  
            $("#imi_result").animate( { height: 'hide' }, 'fast' );  
        });  
    }
    
});