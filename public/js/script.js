var box = document.querySelector(".box");
setTimeout(() => {
    $(".play-box").toggleClass("close");
}, 3000);
var select = document.querySelector(".dynamic-text");
var textArray = ["a Web Developer", "a Web Designer", "a Programmer", "a Student", "Sakhawat Ali Larik"];
var video = document.querySelector(".video");
var a = 0;
Timer();
function Timer() {
    b = setInterval(StartTimer, (2500));
}
function StartTimer() {
    $(".dynamic-text").fadeToggle(1);
    select.textContent = textArray[a];
    $(".dynamic-text").fadeToggle(1000);
    a++;
    if (a >= 5) {
        a = 0;
    }
}
const input = document.querySelectorAll(".input");
function focusFun() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}
function blurFun() {
    let parent = this.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}
input.forEach((input) => {
    input.addEventListener("focus", focusFun);
    input.addEventListener("blur", blurFun);
});
