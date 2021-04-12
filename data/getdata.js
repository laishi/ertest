document.body.style.userSelect = "auto"
var clearfix = document.getElementsByClassName("clearfix")
for (let i = 0; i < clearfix.length; i++) {
    const item = clearfix[i];
    item.style.display = "block"
}

var analysisAnswer = document.getElementsByClassName("analysisAnswer")
for (let i = 0; i < analysisAnswer.length; i++) {
    const item = analysisAnswer[i];
    item.style.display = "block"
}

var mycont = document.getElementsByClassName("title1")[0]
mycont.innerText = ""

var data = []
var dajx = document.getElementsByClassName("dajx")
for (let i = 0; i < dajx.length; i++) {
    var dataItem = {}
    dataItem.year = "2019"
    const item = dajx[i];

    dataItem.index = i


    var title = item.getElementsByClassName("six")[0].innerText.replace(/\s+/g, "")
    dataItem.title = title

    var clearfix = item.querySelector(".clearfix")
    var titleimg = clearfix.getElementsByTagName("img")
    for (let j = 0; j < titleimg.length; j++) {
        const element = titleimg[j];

        if (element.src) {
            dataItem.titleimg = element.src
        } else {
            dataItem.titleimg = "titleimg"
        }
    }



    var options = item.getElementsByClassName("answerContent")[0].innerText.replace(/\s+/g, "")
    dataItem.options = options
    var answer = item.getElementsByClassName("answerEnd")[0].children[0].innerText.replace(/\s+/g, "")
    dataItem.answer = answer
    var analysis = item.getElementsByClassName("shitiText")[0].innerText.replace(/\s+/g, "")
    dataItem.analysis = analysis

    var analysisimg = item.getElementsByClassName("shitiText")[0].getElementsByTagName("img")
    for (let j = 0; j < analysisimg.length; j++) {
        const element = analysisimg[j];

        if (element.src) {
            dataItem.analysisimg = element.src
        } else {
            dataItem.analysisimg = "analysisimg"
        }
    }
    data.push(dataItem)
}

mycont.innerText = JSON.stringify(data)