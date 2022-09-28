const btSrc = document.querySelector(".bt-search");
const keyword = document.querySelector(".in-key");
const tblBd = document.querySelector(".tbl-body");

btSrc.addEventListener("click", async () => {
    clPage();
    try {
        const prom = await getRslt(getKey());
        const data = await prom.json();
        if (data.rowCount > 0) {
            disRsl(data.hero);
        } else {
            shErr("You input wrong keyword");
        }
    } catch {
        shErr("There is something wrong, please retry!");
    } finally {
        console.log("Done");
    }
});

function getRslt(url) {
    let prom = fetch(url);
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

function shErr(msg) {
    alert(msg);
}
