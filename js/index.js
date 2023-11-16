window.onload = function(){
    const body = document.body;
    const bgm = document.querySelector("#bgm");
    const bg = document.querySelector("#bg");
    const startBtn = document.querySelector("#start-btn");
    const btn1 = document.querySelector("#btn1");
    const btn2 = document.querySelector("#btn2");
    const sharetBtn = document.querySelector("#share-btn");
    
    const shareData = {
        title: document.title,
        text: "快一起來尋找" + document.title + "吧!",
        url: document.location.href,
    }

    const firstPage = 0;
    const keyPage = 2;
    const lastPage = 4;

    let page = 0;
    let recordPage = keyPage;
    let answerArr = [];

    function turnPage(answer){
        if (recordPage == page){
            answerArr.push(answer);
        }

        switch (page){
            case firstPage:
                start();
                break;

            case keyPage:
                recordPage = recordPage + answer;
                break;
        }
        page++;

        bg.src = `./src/image/q${page}-bg.png`;
        btn1.style.backgroundImage = `url("./src/image/q${page}-btn1.png")`;
        btn2.style.backgroundImage = `url("./src/image/q${page}-btn2.png")`;

        if (page > lastPage){
            showResult(answerArr);
        }
    }

    function start(){
        bgm.play();
        startBtn.style.display = "none";
        btn1.style.display = "block";
        btn2.style.display = "block";
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

    function showResult(answerArr){
        btn1.style.display = "none";
        btn2.style.display = "none";
        sharetBtn.style.display = "block";

        const result = parseResult(answerArr);

        bg.src = `./src/image/role-${result}.png`;
        body.style.backgroundColor = "#fce56d";
    }

    startBtn.addEventListener("click", turnPage);
    btn1.addEventListener("click", () => {
        turnPage(1)});
    btn2.addEventListener("click", () => {
        turnPage(2)});
    sharetBtn.addEventListener("click", async () => {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log("Error: " + err);
      }
    });
}
