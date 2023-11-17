window.onload = function(){
    const body = document.body;
    const bgm = document.querySelector("#bgm");
    const bg = document.querySelector("#bg");
    const startBtn = document.querySelector("#start-btn");
    const btn1 = document.querySelector("#btn1");
    const btn2 = document.querySelector("#btn2");
    const optBtn = document.querySelectorAll(".opt-btn");
    const sharetBtn = document.querySelector("#share-btn");
    
    const shareData = {
        title: document.title,
        text: "快一起來尋找" + document.title + "吧!",
        url: document.location.href,
    };

    const firstPage = 0;
    const keyPage = 2;
    const lastPage = 4;
    
    let page = 0;
    let recordPage = keyPage;
    let answerArr = [];

    function clearAllOptBtn(){
        optBtn.forEach((btn) => {
            btn.style.display = "none";
        });
    }

    function start(){
        bgm.currentTime = 0;
        bgm.play();

        startBtn.style.display = "none";
    }

    function loadOptBtn(btn){
        const image = new Image();

        image.src = `./src/image/q${page}-${btn.id}.png`;
        
        image.onload = () => {
            btn.style.backgroundImage = `url("${image.src}")`;
            btn.style.display = "block";
        };
    }

    function loadAllOptBtn(){
        optBtn.forEach((btn) => {
            loadOptBtn(btn);
        });
    }

    function showNextPage(){
        bg.onload = () => {
            loadAllOptBtn();

            bg.onload = null;
        };
        
        bg.src = `./src/image/q${page}-bg.png`;
    }

    function parseResult(){
        const result = {};

        switch (answerArr.toString()){
            case "1,1":
                result.type = "NT";
                result.bgColor = "#dccbd2";
                break;

            case "1,2":
                result.type = "NF";
                result.bgColor = "#c3d8c2";
                break;

            case "2,1":
                result.type = "SJ";
                result.bgColor = "#cadfdd";
                break;

            case "2,2":
                result.type = "SP";
                result.bgColor = "#ede1bc";
                break;
        }

        return result;
    }

    function showResult(){        
        const result = parseResult();

        bg.onload = () => {
            body.style.backgroundColor = result.bgColor;
            sharetBtn.style.display = "block";

            bg.onload = null;
        };

        bg.src = `./src/image/role-${result.type}.png`;
    }

    function turnPage(answer){
        if (recordPage == page){
            answerArr.push(answer);
        }

        clearAllOptBtn();

        switch (page){
            case firstPage:
                start();
                break;

            case keyPage:
                recordPage += answer;
                break;

            case lastPage:
                showResult();
                break;
        }

        if (page < lastPage){
            page++;

            showNextPage();
        }
    }

    startBtn.addEventListener("click", turnPage);
    btn1.addEventListener("click", () => {
        turnPage(1);
    });
    btn2.addEventListener("click", () => {
        turnPage(2);
    });
    sharetBtn.addEventListener("click", async () => {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log("Error: " + err);
        }
    });
};