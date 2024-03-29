var xml = new XMLHttpRequest();
const URL = 'http://83.166.240.14:8080';
var upd_id;
var create_id;

// When our page is Ready
window.onload = onload_page();

function onload_page() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", `${URL}/api/confirm`, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");

    xmlHttp.setRequestHeader("token", localStorage.getItem('token'));

    xmlHttp.onload = function () {
        if (xmlHttp.status === 200 && xmlHttp.readyState === 4) {
            try {
                let data = JSON.parse(xmlHttp.responseText);
                update_list(data.users)
            } catch (err) {
                console.log(err.message + " in " + xmlHttp.responseText);
            }
        } else {
            console.log("error");
        }
    };
    xmlHttp.send();

    const xmlHttp1 = new XMLHttpRequest();
    xmlHttp1.open("POST", `${URL}/api/all`, true);
    xmlHttp1.setRequestHeader("Content-Type", "application/json");

    xmlHttp1.setRequestHeader("token", localStorage.getItem('token'));

    xmlHttp1.onload = function () {
        if (xmlHttp1.status === 200 && xmlHttp1.readyState === 4) {
            try {
                let data = JSON.parse(xmlHttp1.responseText);
                update_remove(data.users)
            } catch (err) {
                console.log(err.message + " in " + xmlHttp1.responseText);
            }
        } else {
            console.log("error");
        }
    };
    xmlHttp1.send();
}

function slide_labs() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", `${URL}/api/lab`, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");

    // TODO: Enter token
    xmlHttp.setRequestHeader("token", localStorage.getItem('token'));

    xmlHttp.onload = function () {
        if (xmlHttp.status === 200 && xmlHttp.readyState === 4) {
            try {
                let data = JSON.parse(xmlHttp.responseText);
                update_labs(data.labworks)
            } catch (err) {
                console.log(err.message + " in " + xmlHttp.responseText);
            }
        } else {
            console.log("error");
        }
    };
    xmlHttp.send();
}

function slide_teacher() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", `${URL}/api/teachers`, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");

    // TODO: Enter token
    xmlHttp.setRequestHeader("token", localStorage.getItem('token'));

    xmlHttp.onload = function () {
        if (xmlHttp.status === 200 && xmlHttp.readyState === 4) {
            try {
                let data = JSON.parse(xmlHttp.responseText);
                update_teachers(data.teachers)
            } catch (err) {
                console.log(err.message + " in " + xmlHttp.responseText);
            }
        } else {
            console.log("error");
        }
    };

    xmlHttp.send();
}

function send_accept(id, type) {
    let jsonObject = {};
    jsonObject.id = id;

    let url = ""
    if (type === true) {
        url = `${URL}/api/accept`
    } else {
        url = `${URL}/api/reject`
    }

    ajax_post(url, jsonObject, function () {
        if (xml.status === 200 && xml.readyState === 4) {
            onload_page()
        } else {
            console.log("error");
        }
    })
}

function send_remove(id) {
    let jsonObject = {};
    jsonObject.id = id;

    let url = "";
    url = `${URL}/api/remove`;

    ajax_post(url, jsonObject, function () {
        if (xml.status === 200 && xml.readyState === 4) {
            onload_page()
        } else {
            console.log("error");
        }
    })
}

function send_delete(id) {
    let jsonObject = {};
    jsonObject.id = id;

    ajax_post(`${URL}/api/lab/delete`, jsonObject, function () {
        if (xml.status === 200 && xml.readyState === 4) {
            slide_labs()
        } else {
            console.log("error");
        }
    })
}

function send_create() {
    let jsonObject = {};
    jsonObject.title = document.getElementById('titlelab').value;
    jsonObject.theme = document.getElementById('themelab').value;
    jsonObject.description = document.getElementById('descriptionlab').value;
    jsonObject.protocol = document.getElementById('protocollab').value;
    jsonObject.link = document.getElementById('linklab').value;
    jsonObject.info = document.getElementById('linkinfolab').value;
    jsonObject.testStart = document.getElementById('teststartlab').value;
    jsonObject.testEnd = document.getElementById('testendlab').value;
    jsonObject.autoTest = document.getElementById('automarklab').checked;
    jsonObject.coeff = parseFloat(document.getElementById('coefflab').value);
    jsonObject.coeffError = parseFloat(document.getElementById('coefferrorlab').value);
    jsonObject.fiveCoeff = parseFloat(document.getElementById('fivecoefflab').value);
    jsonObject.fiveCoeffError = parseFloat(document.getElementById('fivecoefferrorlab').value);
    jsonObject.fourCoeff = parseFloat(document.getElementById('fourcoefflab').value);
    jsonObject.fourCoeffError = parseFloat(document.getElementById('fourcoefferrorlab').value);
    jsonObject.threeCoeff = parseFloat(document.getElementById('threecoefflab').value);
    jsonObject.threeCoeffError = parseFloat(document.getElementById('threecoefferrorlab').value);

    console.log(jsonObject);
    console.log( document.getElementById('automarklab').value);

    ajax_post(`${URL}/api/lab/create`, jsonObject, function () {
        if (xml.status === 200 && xml.readyState === 4) {
            slide_labs()
        } else {
            console.log("error");
        }
    })

    document.getElementById('titlelab').value = "";
    document.getElementById('themelab').value = "";
    document.getElementById('descriptionlab').value = "";
    document.getElementById('protocollab').value = "";
    document.getElementById('linklab').value = "";
    document.getElementById('linkinfolab').value = "";
    document.getElementById('teststartlab').value = "";
    document.getElementById('testendlab').value = "";
    document.getElementById('automarklab').checked = false;
    document.getElementById('coefflab').value = "";
    document.getElementById('coefferrorlab').value = "";
    document.getElementById('fivecoefflab').value = "";
    document.getElementById('fivecoefferrorlab').value = "";
    document.getElementById('fourcoefflab').value = "";
    document.getElementById('fourcoefferrorlab').value = "";
    document.getElementById('threecoefflab').value = "";
    document.getElementById('threecoefferrorlab').value = "";
}

function send_update() {
    let jsonObject = {};
    jsonObject.id = upd_id;
    jsonObject.title = document.getElementById('titlelabchange').value;
    jsonObject.theme = document.getElementById('themelabchange').value;
    jsonObject.description = document.getElementById('descriptionlabchange').value;
    jsonObject.protocol = document.getElementById('protocollabchange').value;
    jsonObject.link = document.getElementById('linklabchange').value;
    jsonObject.info = document.getElementById('linkinfolabchange').value;
    jsonObject.testStart = document.getElementById('teststartlabchange').value;
    jsonObject.testEnd = document.getElementById('testendlabchange').value;
    jsonObject.autoMark = document.getElementById('automarklabchange').value;
    jsonObject.coeff = parseFloat(document.getElementById('coefflabchange').value);
    jsonObject.coeffError = parseFloat(document.getElementById('coefferrorlabchange').value);
    jsonObject.fiveCoeff = parseFloat(document.getElementById('fivecoefflabchange').value);
    jsonObject.fiveCoeffError = parseFloat(document.getElementById('fivecoefferrorlabchange').value);
    jsonObject.fourCoeff = parseFloat(document.getElementById('fourcoefflabchange').value);
    jsonObject.fourCoeffError = parseFloat(document.getElementById('fourcoefferrorlabchange').value);
    jsonObject.threeCoeff = parseFloat(document.getElementById('threecoefflabchange').value);
    jsonObject.threeCoeffError = parseFloat(document.getElementById('threecoefferrorlabchange').value);

    console.log(jsonObject);

    ajax_post(`${URL}/api/lab/update`, jsonObject, function () {
        if (xml.status === 200 && xml.readyState === 4) {
            slide_labs()
        } else {
            console.log("error");
        }
    })
}

function send_pre_update(id, title, theme, description, protocol, link, info, testStart, testEnd, autoMark, coeff, coeffError, fiveCoeff, fiveCoeffError, fourCoeff, fourCoeffError, threeCoeff, threeCoeffError) {
    upd_id = id;
    document.getElementById('titlelabchange').value = title;
    document.getElementById('themelabchange').value = theme;
    document.getElementById('descriptionlabchange').value = description;
    document.getElementById('protocollabchange').value = protocol;
    document.getElementById('linklabchange').value = link;
    document.getElementById('linkinfolabchange').value = info;
    document.getElementById('teststartlabchange').value = testStart;
    document.getElementById('testendlabchange').value = testEnd;
    document.getElementById('automarklabchange').value = autoMark;
    document.getElementById('coefflabchange').value = coeff;
    document.getElementById('coefferrorlabchange').value = coeffError;
    document.getElementById('fivecoefflabchange').value = fiveCoeff;
    document.getElementById('fivecoefferrorlabchange').value = fiveCoeffError;
    document.getElementById('fourcoefflabchange').value = fourCoeff;
    document.getElementById('fourcoefferrorlabchange').value = fourCoeffError;
    document.getElementById('threecoefflabchange').value = threeCoeff;
    document.getElementById('threecoefferrorlabchange').value = threeCoeffError;
}

function send_create_teacher() {
    let jsonObject = {};
    jsonObject.groupNumber = document.getElementById('teacherin').value;
    jsonObject.id = create_id;

    ajax_post(`${URL}/api/teachers/set`, jsonObject, function () {
        if (xml.status === 200 && xml.readyState === 4) {
            slide_teacher()
        } else {
            console.log("error");
        }
    });

    document.getElementById('teacherin').value = "";
}

function send_pre_create_teacher(id) {
    create_id = id;
}

function send_delete_teacher(id, groupNumber) {
    let jsonObject = {};
    jsonObject.groupNumber = groupNumber
    jsonObject.id = id

    ajax_post(`${URL}/api/teachers/delete`, jsonObject, function () {
        if (xml.status === 200 && xml.readyState === 4) {
            slide_teacher()
        } else {
            console.log("error");
        }
    });
}

function ajax_post(url, json, func) {
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-Type", "application/json");

    xml.setRequestHeader("token", localStorage.getItem('token'));

    xml.onload = func;

    if (json == null) {
        xml.send();
    } else {
        let jsonToSend = JSON.stringify(json, null, ' ');
        xml.send(jsonToSend)
    }
}

function update_list(data) {
    if (data.length === 0) {
        document.getElementById('inner_container').innerHTML = '<h5>Новых пользователей нет</h5>';
    } else {
        document.getElementById('inner_container').innerHTML = '';
    }
    data.forEach(function (it) {
        let typeString = "";
        if (it.type === 0) {
            typeString = "(" + it.groupNumber + ")";
        } else {
            typeString = "(Преподаватель)"
        }

        document.getElementById('inner_container').innerHTML += '<div class="card">\n' +
            '<div class="card-body">' +
            '<b class="align-middle">' + it.firstName + ' ' + it.lastName + ' ' + typeString + '</b>' +
            '<button class="btn btn-sm btn-primary btn-smbtn-primary float-right" onclick="send_accept(' + it.id + ', true)">' +
            'Принять' +
            '</button>' +
            '<button class="btn-dec btn-sm btn btn-secondary btn-smbtn-secondary float-right" onclick="send_accept(' + it.id + ', false)">' +
            'Отклонить' +
            '</button>' +
            '</div>' +
            '</div>'
    });
}

function update_remove(data) {
    if (data.length === 0) {
        document.getElementById('inner_container').innerHTML += '<h5>Пользователей нет</h5>';
    }
    data.forEach(function (it) {
        let typeString = "";
        if (it.type === 0) {
            typeString = "(" + it.groupNumber + ")";
        } else {
            typeString = "(Преподаватель)"
        }

        document.getElementById('inner_container').innerHTML += '<div class="card">\n' +
            '<div class="card-body">' +
            '<b class="align-middle">' + it.firstName + ' ' + it.lastName + ' ' + typeString + '</b>' +
            '<button class="btn-dec btn-sm btn btn-secondary btn-smbtn-secondary float-right" onclick="send_remove(' + it.id + ')">' +
            'Удалить' +
            '</button>' +
            '</div>' +
            '</div>'
    });
}

function update_labs(data) {
    document.getElementById('inner_container').innerHTML = '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addModalCenter">' +
        'ДОБАВИТЬ ЛАБОРАТОРНУЮ РАБОТУ' +
        '</button>';
    data.forEach(function (theme) {
        var navigation = '';
        var title = theme.theme;
        navigation += '<div class="card card-labs"><div class="card-header">\n' +
            '                    <h3>' + title + '</h3>\n' +
            '                </div><div class="card-body">\n' +
            '                    <div class="card-text">'
        theme.list.forEach(function (labwork) {
            navigation += '<div class="card mb-3">\n' +
                '                            <div class="card-header" id="heading' + labwork.id + '" data-toggle="collapse" data-target="#collapse' + labwork.id + '" aria-expanded="false" aria-controls="collapse' + labwork.id + '">\n' +
                '                                <h4 class="mb-0">\n' +
                labwork.title +
                '                                </h4>\n' +
                '                            </div>\n' +
                '                            <div id="collapse' + labwork.id + '" class="collapse" aria-labelledby="heading' + labwork.id + '">\n' +
                '                                <div class="card-body"><p>' + labwork.description + '</p>' + '<p>' + labwork.protocol + '</p>' + '<a href="'+ labwork.link +'">'+labwork.link+'</a>' + '<button data-toggle="modal" data-target="#changeModalCenter" class="btn btn-sm btn-primary btn-smbtn-primary float-right" onclick="send_pre_update(' + labwork.id+',\''+ labwork.title+'\',\''+ theme.theme+'\',\''+ labwork.description+'\',\''+ labwork.protocol+'\',\''+ labwork.link+'\',\''+ labwork.info+'\',\''+ labwork.testStart+'\',\''+ labwork.testEnd+'\',\''+ labwork.autoMark+'\',\''+ labwork.coeff+'\',\''+ labwork.coeffError+'\',\''+ labwork.fiveCoeff+'\',\''+ labwork.fiveCoeffError+'\',\''+ labwork.fourCoeff+'\',\''+ labwork.fourCoeffError+'\',\''+ labwork.threeCoeff+'\',\''+ labwork.threeCoeffError+'\')">' +
                'Редактировать' +
                '</button>' +
                '<button class="btn-dec btn-sm btn btn-secondary btn-smbtn-secondary float-right"  onclick="send_delete(' + labwork.id + ')">' +
                'Удалить' +
                '</button>';

            navigation += '</div></div></div>'
        });
        navigation += '</div></div></div>'
        navigation += '</div>\n' +
            '                </div>'
        document.getElementById('inner_container').innerHTML += navigation;

    });
}

function update_teachers(data) {
    document.getElementById('inner_container').innerHTML = '';
    data.forEach(function (it) {
        var navigation = '';
        navigation += '<div class="card card-labs"><div class="card-header">\n' +
            '                    <h4>' + it.firstName + ' ' + it.lastName + '<button class="btn-dec btn btn-primary btn-smbtn-primary float-right"  data-toggle="modal" onclick="send_pre_create_teacher(' + it.id + ')" data-target="#teacherModalCenter">' +
            'Добавить группу' +
            '</button></h4></div>';

        if (it.groups != undefined) {
            it.groups.forEach(function (group) {
                navigation += '<div class="card">' +
                    '<div class="card-body">' +
                    group +
                    '<button class="btn btn-sm btn-secondary btn-smbtn-secondary float-right" onclick="send_delete_teacher(' + it.id + ',' + group + ')">' +
                    'Удалить группу' +
                    '</button>' +
                    '</div>' +
                    '</div>';
            });
        }

        navigation += '</div></div></div>'
        navigation += '</div>\n' +
            '                </div>'
        document.getElementById('inner_container').innerHTML += navigation;

    });
    /*
    data.forEach(function (it) {
        document.getElementById('inner_container').innerHTML += '<div class="card">' +
            '<div class="card-body">' +
            '' + it.firstName + ' ' + it.lastName + ' ' + it.email +
            '<button class="btn btn-primary btn-smbtn-primary" data-toggle="modal" onclick="send_pre_create_teacher(' + it.id + ')" data-target="#teacherModalCenter">' +
            'Добавить группу' +
            '</button>' +
            '</div>' +
            '</div>';
        it.groups.forEach(function (group) {
            document.getElementById('inner_container').innerHTML += '<div class="card">' +
                '<div class="card-body">' +
                group +
                '<button class="btn btn-danger btn-smbtn-danger" onclick="send_delete_teacher(' + it.id + ',' + group + ')">' +
                'Удалить группу' +
                '</button>' +
                '</div>' +
                '</div>';
        });
    });
    */
}
function openTests() {
    location.assign('./createTest.html');
}

