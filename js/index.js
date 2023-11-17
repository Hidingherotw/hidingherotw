window.onload = function(){
    const body = document.body;
    const bgm = document.querySelector("#bgm");
    const bg = document.querySelector("#bg");
    const startBtn = document.querySelector("#start-btn");
    const btn1 = document.querySelector("#btn1");
    const btn2 = document.querySelector("#btn2");
    const optBtn = document.querySelectorAll(".opt-btn");
    const sharetBtn = document.querySelector("#share-btn");
    
    const firstPage = 0;
    const keyPage = 2;
    const lastPage = 4;
    
    let page = 0;
    let recordPage = keyPage;
    let answerArr = [];

    const shareData = {
        title: document.title,
        text: "快一起來尋找" + document.title + "吧!",
        url: document.location.href,
    };

    function clearAllOptBtn(){
        optBtn.forEach((btn) => {
            btn.style.display = "none";
        });
    }

    function start(){
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
        };
        
        bg.src = `./src/image/q${page}-bg.png`;
    }


    function parseResult(){
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
        };

        return result;
    }

    function showResult(){        
        const result = parseResult();

        bg.onload = () => {
            body.style.backgroundColor = "#ffe86e";
            sharetBtn.style.display = "block";
        };

        bg.src = `./src/image/role-${result}.png`;
    }

    function turnPage(answer){
        if (recordPage == page){
            answerArr.push(answer);
        };

        clearAllOptBtn();

        switch (page){
            case firstPage:
                start();

                break;
            case keyPage:
                recordPage += answer;

                break;
            case lastPage:
                bg.onload = null;

                showResult();

                break;
        };
        
        if (page < lastPage){
            page++;

            showNextPage();
        };
    }

    startBtn.addEventListener("click", turnPage);
    btn1.addEventListener("click", () => {
        turnPage(1);});
    btn2.addEventListener("click", () => {
        turnPage(2);});
    sharetBtn.addEventListener("click", async () => {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log("Error: " + err);
        };
    });
};