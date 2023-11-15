window.onload = function(){
    const body = document.body;
    const bgm = document.querySelector("#bgm");
    const bg = document.querySelector("#bg");
    const startBtn = document.querySelector("#start-btn");
    const btn1 = document.querySelector("#btn1");
    const btn2 = document.querySelector("#btn2");
    const sharetBtn = document.querySelector("#share-btn");
    let page = 0;
    let answerArr = [];

    function turnPage(answer){
        if (page == 0){
            bgm.play();
            startBtn.style.display = "none";
            btn1.style.display = "block";
            btn2.style.display = "block";

            page = 1;
        } else if (page == 1){
            page = 2;
        } else if (page == 2){
            answerArr.push(answer);

            page += answer;
        } else {
            answerArr.push(answer);
        }

        bg.src = `./src/image/q${page}-bg.png`;
        btn1.style.backgroundImage = `url("../src/image/q${page}-btn1.png")`;
        btn2.style.backgroundImage = `url("../src/image/q${page}-btn2.png")`;

        if (answerArr.length >= 2){
            btn1.style.display = "none";
            btn2.style.display = "none";
            sharetBtn.style.display = "block";

            result = parseResult(answerArr);

            body.style.backgroundColor = "#fce56d";
            bg.src = `./src/image/role-${result}.png`;
        }
    }

    function parseResult(answerArr){
        let result = "";

        switch (answerArr.toString()){
            case "1,1":
                result = "NT";
                break;
            case "1,2":
                result = "NF";
                break;
            case "2,1":
                result = "SJ";
                break;
            case "2,2":
                result = "SP";
                break;
        }
        
        return result;
    }

    startBtn.addEventListener("click", turnPage);
    btn1.addEventListener("click", function (){
        turnPage(1)});
    btn2.addEventListener("click", function (){
        turnPage(2)});
    sharetBtn.addEventListener("click", () =>{

    });
}