const btSrc = document.querySelector('.bt-search');
const keyword = document.querySelector('.in-key');
const tblBd = document.querySelector('.tbl-body');

btSrc.addEventListener('click', ()=>getRslt());

function getKey() {
    const url = 'https://api.dazelpro.com/mobile-legends/role?roleName='+keyword.value;
    return url;
}

function getRslt() {
    clPg();
    const url = getKey();
    const ajax = new XMLHttpRequest();
    ajax.onload = function () {
        const data = JSON.parse(ajax.responseText);
        if (data.status ===200 && data.rowCount > 0) {
            disRsl(data.hero);
        } else if (data.status ===200 && data.rowCount === 0) {
            keyWrong();
        } else {
            shErr();
        }
    }
    ajax.open('GET', url);
    ajax.send();
}

function disRsl(data) {
    let hero = '';
    data.map(e => {
        hero += `<tr>
                    <td>${e['hero_name']}</td>
                    <td>${e['hero_role']}</td>
                    <td>${e['hero_specially']}</td>
                    <td><img src="${e['hero_avatar']}"></td>
                    <td><button class="bt-detail" value = ${e['hero_id']}>Detail</button></td>
                </tr>`;
    });
    tblBd.innerHTML = hero;
}

function clPg() {
    tblBd.innerHTML='';
}

function keyWrong() {
    alert("You input wrong keyword");
}

function shErr() {
    alert('There is something wrong, please retry!');
}