const btSrc = document.querySelector(".bt-search");
const keyword = document.querySelector(".in-key");
const tblBd = document.querySelector(".tbl-body");
const dtlCont = document.querySelector(".detail-cont");

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
    } catch (err) {
        console.log(err);
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
    const btDtl = document.querySelectorAll(".bt-detail");
    disDtl(btDtl);
}

function clPage() {
    tblBd.innerHTML = "";
}

function shErr(msg) {
    alert(msg);
}

function disDtl(bt) {
    bt.forEach((e) => {
        e.addEventListener("click", async () => {
            const response = await getDtl(getDtlUrl(e.value));
            const dtl = await response.json();
            shDtl(dtl.hero[0]);
        });
    });
}

function shDtl(data) {
    let dtlCtn = `<table class="tb-dtl">
                    <thead>
                        <tr>
                            <th colspan="2">Summary</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>${data["hero_name"]}</td>
                        </tr>
                        <tr>
                            <th>Role</th>
                            <td>${data["hero_role"]}</td>
                        </tr>
                        <tr>
                            <th>Specially</th>
                            <td>${data["hero_specially"]}</td>
                        </tr>
                        <tr>
                            <th>Image</th>
                            <td><img src="${data["hero_avatar"]}" alt="" /></td>
                        </tr>
                        <tr>
                            <th colspan="2"><button  class="bt-close">close</button></th>
                        </tr>
                    </tbody>
                </table>`;

    dtlCont.setAttribute(
        "style",
        "width: 100%; height: 100vh; background-color: rgba(255, 255, 255, 0.8); position: fixed;display: flex; align-items: center;padding-left: 30%;"
    );
    dtlCont.innerHTML = dtlCtn;
    const btCl = document.querySelector(".bt-close");
    btCl.addEventListener("click", () =>
        dtlCont.setAttribute("style", "display:none")
    );
}

function getDtl(url) {
    return fetch(url);
}

function getDtlUrl(id) {
    const url = "https://api.dazelpro.com/mobile-legends/hero/" + id;
    return url;
}
