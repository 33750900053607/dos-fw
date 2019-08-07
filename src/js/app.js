import $$ from 'dom7';
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';
// import '../css/00top.css';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';
// Import Routes
import routes from './routes.js';

var app = new Framework7({
  root: '#app', // App root element
  id: 'framework7.dosha', // App bundle ID
  name: 'Dosha App', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      // Demo products for Catalog section
      products: [
        {
          id: '1',
          title: 'Apple iPhone 8',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
        },
        {
          id: '2',
          title: 'Apple iPhone 8 Plus',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
        },
        {
          id: '3',
          title: 'Apple iPhone X',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        },
      ]
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,


  // Register service worker
  serviceWorker: Framework7.device.cordova ? {} : {
    path: '/service-worker.js',
  },
  // Input settings
  input: {
    scrollIntoViewOnFocus: Framework7.device.cordova && !Framework7.device.electron,
    scrollIntoViewCentered: Framework7.device.cordova && !Framework7.device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    overlay: Framework7.device.cordova && Framework7.device.ios || 'auto',
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },
});

// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});

// $$(window).load(function (){
$$("#typecheck").on('click', function(){
  var wktype = [0,0,0];
  var wktypename = ["ヴァータ","ピッタ","カパ"];
  var wkresult = "";
  var wktypecnt = 0;
  var wktyperes = "2";
  var wkmax = 0;
  var i = 0;
//  alert(wktypename);
app.dialog.alert('Hello');

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
  // alert("test");  
  //診断
  wkmax = Math.max.apply(null, wktype);
  var maxindex = wktype.indexOf(wkmax);

//  alert("maxindex:"+maxindex);
  
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
  }  else { //これ以外は初期値でOK
    wktyperes = "2";
    wktypename[wktype.indexOf(Math.min.apply(null, wktype))] = "";
//    wktypename = $.grep(wktypename, function(n){return n !== "";});
    wkresult = wktypename.join("-");
  }  

//  alert("wktyperes:"+wktyperes+"/ wkresult:"+wkresult);
  
//  if(wktyperes === "2"){ //初期値のときの処理
//      wktypename[wktype.indexOf(Math.min.apply(null, wktype))] = "";
//      wktypename = $.grep(wktypename, function(n){return n !== "";});
//      wkresult = wktypename.join("-");
//  }
  
  //診断結果を表示
 
  // alert("あなたのドーシャ(体質)は"+wkresult+"です。\n"+"ヴァータ(風)："+wktype[0]+"、ピッタ(火)："+wktype[1]+"、カパ(水)："+wktype[2]);
  // alert("ヴァータ："+wktype[0]+"、ピッタ："+wktype[1]+"、カパ："+wktype[2]);      
  // $$("#imi_result"). animate( { height: 'show' }, 'slow' );


  //2015.11.09 amitani 追加 ----------------------------------------------
//  wktypename = ['<span class="txt_grn">ヴァータ</span>'
//              , '<span class="txt_red">ピッタ</span>'
//              , '<span class="txt_bl1">カパ</span>'];

  wktypename = ['ヴァータ'
              , 'ピッタ'
              , 'カパ'];
              
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

  // alert(wkresult);

  //診断結果を表示
  app.dialog.alert('Hello2'); 
  app.dialog.alert("あなたのドーシャ(体質)は"+wkresult+"です。\n"+"ヴァータ(風)："+wktype[0]+"、ピッタ(火)："+wktype[1]+"、カパ(水)："+wktype[2]);
  // alert("ヴァータ："+wktype[0]+"、ピッタ："+wktype[1]+"、カパ："+wktype[2]);      
  // $$("#imi_result"). animate( { height: 'show' }, 'slow' );  

  /* 票数の順番も変える場合は、こちら
      var wktypeSub = [];
      for(i = 0;i<=2;i++){wktypeSub[i] = wktype[i];}
      wktypeSub.sort(function(a,b){return b - a;});
      var liTag = [];
      liTag[0] = '<li><img src="img/icon05.png" alt="ヴァータ"/><p id="result_g">0</p></li>';
      liTag[1] = '<li><img src="img/icon06.png" alt="ピッタ"/><p id="result_r">0</p></li>';
      liTag[2] = '<li><img src="img/icon07.png" alt="カパ"/><p id="result_b">0</p></li>';
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
//  $$("#resulttxt").html(wkresult + "タイプ");
//  $("#result_g").text(wktype[0]);
//  $("#result_r").text(wktype[1]);
//  $("#result_b").text(wktype[2]);

   document.getElementById('result_g').textContent = "99";
  // alert(wktype); 
  // alert(wkresult); 

  // return false; 
  });

// Alert
$$('.open-alert').on('click', function () {
  app.dialog.alert('Hello');
});

// Confirm
$$('.open-confirm').on('click', function () {
  app.dialog.confirm('Are you feel good today?', function () {
    app.dialog.alert('Great!');
  });
});

// Prompt
$$('.open-prompt').on('click', function () {
  app.dialog.prompt('What is your name?', function (name) {
    app.dialog.confirm('Are you sure that your name is ' + name + '?', function () {
      app.dialog.alert('Ok, your name is ' + name);
    });
  });
});
 // });