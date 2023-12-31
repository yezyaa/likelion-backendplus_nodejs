let express = require('express');
let app = express();
let path = require('path'); // 파일 경로를 상대경로 -> 실제경로 혹은 경로를 만듦.
//app - 서버임 

// view 엔진을 설정해야 함
// 환경변수 - 스프링 설정
// 변수, 함수 중 __(언더바 2개)로 시작하는 요소들은 시스템이 제공하는 내장변수나 함수
// __dirname : 현재 프로젝트가 가동중인 폴더 정보를 가져옴
// 현재 폴더 아래에 /views 폴더 아래에 html 문서를 두겠다는 의미
app.set('views', path.join(__dirname, "views"));
app.set("view engine", "ejs");   // 스프링 - jsp, 머스티치, 타임리프처럼 node - ejs를 사용 (템플릿엔진)


//POST처리를 하기위한 코드이다
app.use(express.urlencoded({ extended: false }));


// json 객체 배열로 데이터를 만듦

boardList = [
    {"id":1, "title":"쌍갑포차", "author":"배혜수"},
    {"id":2, "title":"아지갑놓고나왔다", "author":"미역"},
    {"id":3, "title":"무빙", "author":"강풀"},
    {"id":4, "title":"마음의소리", "author":"조석"},
    {"id":5, "title":"고수", "author":"문정후"}
];

app.get("/board/list", (req, res)=> {
    res.render("board/board_list", {"boardList":boardList});
});

// /board/view/1 =>
app.get("/board/view/:id", (req, res)=> {
    let id = parseInt(req.params.id);   // id를 1, 2, 3는 배열 인덱스 :  0, 1, 2이라 -1 처리해줌
    res.render("board/board_view", {"board":boardList[id-1]});
});

// 페이지 이동
app.get("/board/write", (req, res) => {
    res.render("board/board_write", {})
});

app.post("/board/save", (req, res) => {
    let id = boardList.length+1;
    let title = req.body.title;
    let author = req.body.author;
    boardList.push( {"id":id, "title":title, "author":author});
    // 리스트 페이지로 이동 == 직접 함수 호출 X. 내부적으로 처리할 일이 있음
    // 그래서 redirect 통해 url을 변경해야 함.
    res.redirect("/board/list");    // /board ~ board
});

// ajax - Asychronous java script ~xml;
/*
    클라이언트 ----------> 서버로 비동기로 정보 전송
              <---------- 실행한 결과를 보낸다. xml => json
*/
app.post("/board/save2", (req, res) => {
    let id = boardList.length + 1;
    let title = req.body.title;
    let author = req.body.author;
    boardList.push({"id":id, "title":title, "author":author});
    // 결과 값을 json으로 보내줘야 한다.
    res.send({result:"success"});
})

// get : get 방식처리, post : post 방식만 처리, use:get도 post 처리한다.
app.get("/", (req, res) => {
    // 자바스크립트는 클래스 개념 잘 안씀
    res.render("index", {"name":"홍길동", age:12}); // render("html")
    // res.send : json 형태로 데이터를 화면에 출력함
    // res.end : text/html 형태
    // res.render : html 문서와 데이터를 합쳐서 새로운 html을 만들어 보냄. 렌더링
});


//미들웨어 -- 중간에서 가로채서 처리를 하는 함수
//서블릿 -> 상속을 써서 
app.use("/a", function(req, res){
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end("<h1>This is A </h1>");
});

//부가적인 정보가 전달되면 
/*
get   -- add?x=5&y=7 
get2  -- add/5/7
post  -- add   body부분  x-www-form-urlencoded, form-data(multipart), json(ajax방식)

get1 -> req.query.x, req.query.y 

app.use("/add/:x/:y"
get2 -> req.params.x, req.params.y 

post ->body.parser  를 이용한다. 예전에는 이걸 직접 설치하고 미들웨어연결 
app.use(express.urlencoded({ extended: false }));  기술해주면 
req.body.파라미터명      
*/


// http://127.0.0.1:4000/add?x=5&y=7 
app.use("/add", function(req, res){
    let x = parseInt( req.query.x );
    let y = parseInt( req.query.y );
    let result = x+y;    
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end(`<h1>${x} + ${y} = ${result} </h1>`);
});

// http://127.0.0.1:4000/add2/5/7 
app.use("/add2/:x/:y", function(req, res){
    let x = parseInt( req.params.x );
    let y = parseInt( req.params.y );
    let result = x+y;    
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end(`<h1>*****  ${x} + ${y} = ${result} *****</h1>`);
});

app.use("/add_post", function(req, res){
    let x = parseInt( req.body.x );
    let y = parseInt( req.body.y );
    let result = x+y;    
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end(`<h1>====  ${x} + ${y} = ${result}  ====</h1>`);
});

//적당하지 않은 url처리를 이 함수내에서 해야 한다.
//모든 url에 대해서 이 함수가 처리를 한다. 
app.use( function(req, res){
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end("<h1>Hello express</h1>");
});

app.listen(4000, ()=>{
    console.log("server start at http://127.0.0.1:4000");
});