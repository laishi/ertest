import { szdatas } from "../data/sz-datas.js";
import { jddatas } from "../data/jd-datas.js";


var sendData = szdatas

var sliders = document.getElementById("sliders")



var sliderPage = document.getElementsByClassName("sliderPage")[0]
var infoBox = document.getElementsByClassName("infoBox")[0]

var filter = {
    rank: '一建市政',
    year: '2015',
}

var keyworld = ""

var dataUse = sendData

function initData(keyworld) {

    dataUse = dataUse.filter(function(item) {
        for (var key in filter) {
            if (item[key] === undefined || item[key] != filter[key])
                return false;
        }
        return true;
    });


    if (keyworld) {
        dataUse = dataUse.find((item) => {
            return item.title.includes(keyworld)
        })
    }




    console.log(dataUse)




    infoBox.innerHTML = dataUse.length

    for (let i = 0; i < dataUse.length; i++) {
        const data = dataUse[i];


        var sliderCont = document.createElement("div")
        sliderCont.className = "sliderCont"

        var slider = document.createElement("div")
        slider.className = "slider"
        slider.style.left = window.innerWidth * ((i + 1) * 1) + "px"


        var tip = document.createElement("div")
        tip.className = "tip"
        tip.style.left = window.innerWidth * ((i + 1) * 1) + "px"
        tip.innerText = data.analysis

        if (data.analysisimg) {

            var analysisimg = document.createElement("img")
            analysisimg.className = "analysisimg"
            analysisimg.src = data.analysisimg

            tip.appendChild(analysisimg)

        }



        var title = document.createElement("div")
        title.className = "title"
        title.innerText = data.rank + data.year + "-" + (i + 1) + ". " + data.title

        if (data.titleimg) {

            var titleimgCont = document.createElement("div")
            titleimgCont.className = "titleimgCont"

            var titleimg = document.createElement("img")
            titleimg.className = "titleimg"
            titleimg.src = data.titleimg

            title.appendChild(titleimgCont)
            titleimgCont.appendChild(titleimg)

        }

        var options = document.createElement("div")
        var answer = data.answer
        options.setAttribute('data-answer', answer)
        options.className = "options"

        var ops = data.options.split(",")
        tip.addEventListener('click', function(event) {
            event.preventDefault()
                // tip.classList.remove("tipshow")
            this.style.top = "-20vh"
        })

        for (let j = 0; j < ops.length; j++) {
            const op = ops[j];

            var optionsItem = document.createElement("div")
            optionsItem.className = "optionsItem"

            optionsItem.innerText = op
            options.appendChild(optionsItem)



            optionsItem.addEventListener('click', function(event) {

                var sourceAnswer = dataUse.find((item) => {
                    return item.options.includes(this.innerText)
                })


                if (sourceAnswer.answer.length == 1) {
                    var myAnswer = this.innerText.split(".")[0]

                    if (myAnswer == sourceAnswer.answer) {
                        this.style.backgroundColor = "green"
                        var go = posx -= window.innerWidth
                        sliders.style.transform = "translateX(" + go + "px)"
                        showTip(this, false)
                    } else {
                        showTip(this, true)
                    }

                } else {
                    var myAnswer = [this.innerText.split(".")[0]]
                    var mutiAnswer = []

                    mutiAnswer.pushNoRepeat(this.innerText.split(".")[0])



                    this.classList.toggle(myAnswer)

                    var optionsElements = this.parentElement.children

                    var myMutiAnswer = ""

                    for (let j = 0; j < optionsElements.length; j++) {
                        const optionAnswer = optionsElements[j].className.split(" ")[1];
                        if (optionAnswer != undefined) {
                            myMutiAnswer += optionAnswer
                        }
                    }


                    if (sourceAnswer.answer == myMutiAnswer) {
                        console.log("全部正确")
                        sliders.style.transform = "translateX(" + -window.innerWidth + "px)"
                    } else if (sourceAnswer.answer.includes(myMutiAnswer)) {
                        console.log("部分正确")
                        this.style.backgroundColor = "green"
                    } else {
                        this.style.backgroundColor = "red"
                        console.log("完全错误")
                        showTip(this, true)
                    }

                }


            });
        }



        sliderPage.appendChild(sliderCont)
        sliderCont.appendChild(tip)
        sliderCont.appendChild(slider)
        slider.appendChild(title)
        slider.appendChild(options)
    }
}

function showTip(el, show) {
    if (show) {
        el.parentElement.parentElement.parentElement.children[0].style.top = "0vh"
    } else {
        el.parentElement.parentElement.parentElement.children[0].style.top = "-20vh"
    }
}





Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true; // 返回的这个 i 就是元素的索引下标，  
        }
    }
    return false;
}
Array.prototype.pushNoRepeat = function() {
    for (var i = 0; i < arguments.length; i++) {
        var ele = arguments[i];
        if (this.indexOf(ele) == -1) {
            this.push(ele);
        }
    }
};


var sliderCont = document.getElementsByClassName("sliderCont")

var num = 0
var posx = 0
window.addEventListener("wheel", event => {
    const delta = Math.sign(event.deltaY);

    num += delta
    posx = -window.innerWidth * num

    // if (posx <= 0) {} else {
    //     posx = 0
    // }
    if (num >= 0 && num < sliderCont.length + 1) {
        sliders.style.transform = "translateX(" + posx + "px)"
    } else {

        posx = 0
    }

});







// Search
const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const expand = () => {
    searchBtn.classList.toggle("close");
    input.classList.toggle("square");
};

searchBtn.addEventListener("click", expand);



input.addEventListener('input', updateValue);

function updateValue(e) {

    sliderPage.textContent = ""
    initData(e.target.value)
}
initData(keyworld)