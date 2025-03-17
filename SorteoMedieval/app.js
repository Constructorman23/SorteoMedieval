const config = document.getElementById("config")
const app = document.getElementById("app")
const accept = document.getElementById("accept")
const configBt = document.getElementById("config-bt")
const supInput = document.getElementById("superior")
const infInput = document.getElementById("inferior")
const limits = document.getElementById("limits")
const number = document.getElementById("number")
const generate = document.getElementById("generate-bt")
const reboot = document.getElementById("reboot-bt")
const winList = document.getElementById("win-list")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")

let sup = 0
let inf = 0
const generatedNumbers = new Set()
const li = document.createElement("li");
let currentIndex = 0;

function moveSlider() {
    winList.style.transform = `translateX(-${currentIndex*50}%)`;
}

function disable(obj){
    obj.classList.add("disable")
    obj.classList.remove("enable")
}

function enable(obj){
    obj.classList.add("enable")
    obj.classList.remove("disable")
}

function setLimits(){
    sup = parseInt(supInput.value, 10)
    sup = isNaN(sup) ? 0 : sup;
    inf = parseInt(infInput.value, 10)
    inf = isNaN(inf) ? 0 : inf;

    if (inf > sup){
        let aux = sup
        sup = inf
        inf = aux
    }

    limits.textContent = " ( " + inf + " - " + sup + " )"
}

function animateNumber(callback) {
    let counter = 100
    let interval = setInterval(() => {
        let randomNumber = Math.floor(Math.random() * (sup - inf + 1)) + inf
        let len = sup.toString().length
        number.textContent = randomNumber.toString().padStart(len, '0')
        counter--;

        if (counter < 0) {
            clearInterval(interval)
            callback()
        }
    }, 50)
}

function getRandomIntInRange(min, max) {
    let randomNum = 0
    let maxAttempts = max - min + 1

    if (generatedNumbers.size >= maxAttempts) {
        console.log("¡Todos los números han sido generados!")
        return 
    }

    do {
        randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (generatedNumbers.has(randomNum))


    generatedNumbers.add(randomNum)

    return randomNum
}

function generateZeros(num) {
    return "0".repeat(num.toString().length);
}

accept.addEventListener("click", function() {
    disable(config)
    enable(app)
    setLimits()
    number.textContent = generateZeros(sup)
    currentIndex=0
});

configBt.addEventListener("click", function() {
    disable(app)
    enable(config)
    generatedNumbers.clear()
    winList.innerHTML = ""
});

generate.addEventListener("click",function () {
    console.log(inf, sup)
    let random = getRandomIntInRange(inf, sup)
    if(random != null){
        generate.disabled = true
        configBt.disabled = true
        reboot.disabled = true
        nextBtn.disabled = true
        prevBtn.disabled = true
        animateNumber(() => {
            number.textContent = random;
            let li = document.createElement("li");
            li.textContent = random;
            winList.appendChild(li);
            generate.disabled = false
            configBt.disabled = false
            reboot.disabled = false
            nextBtn.disabled = false
            prevBtn.disabled = false
            if (winList.children.length > 2) {
                currentIndex = winList.children.length - 2
                moveSlider();
            }
        })
        
    }
})

reboot.addEventListener("click", function(){
    generatedNumbers.clear()
    number.textContent = generateZeros(sup)
    winList.innerHTML = ""
    currentIndex=0
})


prevBtn.addEventListener("click",function(){
    if(currentIndex > 0){
        currentIndex--
        moveSlider()
    }
})

nextBtn.addEventListener("click",function(){
    if (winList.children.length > 2 && currentIndex+2 < winList.children.length) {
        currentIndex++;
        moveSlider();
    }
})

supInput.addEventListener("input",function(){
    let max = parseInt(this.max, 10)
    let min = parseInt(this.min, 10)
    let value = parseInt(this.value, 10)

    if (value > max) {
        this.value = max
    } else if (value < min) {
        this.value = min
    }
})

infInput.addEventListener("input",function(){
    let max = parseInt(this.max, 10)
    let min = parseInt(this.min, 10)
    let value = parseInt(this.value, 10)

    if (value > max) {
        this.value = max
    } else if (value < min) {
        this.value = min
    }
})