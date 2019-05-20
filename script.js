let base = 60;
var clockTimer, dateObj, dh, dm, ds, ms;
let readOut = ''; 
var h = 1, m = 1, tm = 1, s = 0, ts = 0, ms = 0, init = 0;

let codes = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8], i, j, x, y;
let field = document.getElementsByClassName('field');

window.onload = () => {
    randomField();
}

function randomField() {

    for (y = codes.length; y;) {
        j = Math.floor(Math.random() * y); x = codes[--y]; codes[y] = codes[j]; codes[j] = x;
    }

    for (j = 0; j < 16; j++) {
        field[0].innerHTML += '<a color="' + codes[j] + '" class="color' + codes[j] + ' hidden">&nbsp;</a>';
    }

}


function startStop() {
    if (init == 0) {
        clearСlock();
        dateObj = new Date();
        startTime();
        init = 1;
        game();
    }

}

function game() {
    let check = false, selcolor = 0, sela, open = 0, a = document.getElementsByTagName('a');
    for (let i = 0; i < a.length; i++) {
        a[i].addEventListener('click', function (e) {
            let el = e.target;
            if (el.className.indexOf('hidden') > -1) {

                el.className = el.className.replace('hidden', '');
                setTimeout(function () {

                    if (check) {
                        check = false;
                        if (el.getAttribute('color') == selcolor) {
                            open++;
                            if (open == 8) {

                                clearTimeout(clockTimer);
                                init = 0;
                                let finalTime = document.timer.stopwatch.value;

                                const div = document.createElement('div');
                                div.className = "result";
                                div.innerHTML = `Вы выиграли! <br>Затраченное время: ${finalTime} `;
                                const wrap = document.querySelector('.wrap');
                                const elem = wrap.appendChild(div);
                                const wrapButton = document.querySelector('.wrap_button');
                                wrapButton.disabled = true;

                                const button = document.createElement('button');
                                button.className = "result_button";
                                button.innerHTML = 'ok';
                                const elemButton = div.appendChild(button);

                                elemButton.addEventListener('click', close);

                                function close() {
                                    elem.remove();
                                    location.reload();
                                }


                            }

                        }
                        else {
                            sela.className += ' hidden'; el.className += ' hidden';
                        }
                    }
                    else {
                        selcolor = el.getAttribute('color'); sela = el; check = true;
                    }
                }, 100);
            }
        });
    }
};



//функция для очистки поля
function clearСlock() {
    clearTimeout(clockTimer);
    h = 1; m = 1; tm = 1; s = 0; ts = 0; ms = 0;
    init = 0;
    readOut = '00:00:00.00';
    document.timer.stopwatch.value = readOut;
}

//функция для старта секундомера
function startTime() {
    var cdateObj = new Date();
    var t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
    if (t > 999) { s++; }
    if (s >= (m * base)) {
        ts = 0;
        m++;
    } else {
        ts = parseInt((ms / 100) + s);
        if (ts >= base) { ts = ts - ((m - 1) * base); }
    }
    if (m > (h * base)) {
        tm = 1;
        h++;
    } else {
        tm = parseInt((ms / 100) + m);
        if (tm >= base) { tm = tm - ((h - 1) * base); }
    }
    ms = Math.round(t / 10);
    if (ms > 99) { ms = 0; }
    if (ms == 0) { ms = '00'; }
    if (ms > 0 && ms <= 9) { ms = '0' + ms; }
    if (ts > 0) { ds = ts; if (ts < 10) { ds = '0' + ts; } } else { ds = '00'; }
    dm = tm - 1;
    if (dm > 0) { if (dm < 10) { dm = '0' + dm; } } else { dm = '00'; }
    dh = h - 1;
    if (dh > 0) { if (dh < 10) { dh = '0' + dh; } } else { dh = '00'; }
    readOut = dh + ':' + dm + ':' + ds + '.' + ms;
    document.timer.stopwatch.value = readOut;
    clockTimer = setTimeout("startTime()", 1);
}


