const btSrc = document.querySelector(".bt-search");
const keyword = document.querySelector(".in-key");
const tblBd = document.querySelector(".tbl-body");

btSrc.addEventListener("click", () => {
    clPage();
    const prom = getRslt(getKey());
    prom.then((data) => {
        if (data.rowCount > 0) {
            disRsl(data.hero);
        } else {
            keyWrong();
        }
    });
});

function getRslt(url) {
    let prom = new Promise(function (resolve, reject) {
        const ajax = new XMLHttpRequest();
        ajax.onload = function () {
            if (ajax.status === 200) {
                let data = JSON.parse(ajax.responseText);
                resolve(data);
            } else {
                reject(shErr());
            }
        };
        ajax.open("GET", url);
        ajax.send();
    });
    return prom;
}

function getKey() {
    const url =
        "https://api.dazelpro.com/mobile-legends/role?roleName=" +
        keyword.value;
    return url;
}

function disRsl(data) {
    let hero = "";
    data.map((e) => {
        hero += `<tr>
                    <td>${e["hero_name"]}</td>
                    <td>${e["hero_role"]}</td>
                    <td>${e["hero_specially"]}</td>
                    <td><img src="${e["hero_avatar"]}"></td>
                    <td><button class="bt-detail" value = ${e["hero_id"]}>Detail</button></td>
                </tr>`;
    });
    tblBd.innerHTML = hero;
}

function clPage() {
    tblBd.innerHTML = "";
}

function keyWrong() {
    alert("You input wrong keyword");
}

function shErr() {
    alert("There is something wrong, please retry!");
}
