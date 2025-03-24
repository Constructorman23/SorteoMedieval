const config = document.getElementById("config")        //config container
const app = document.getElementById("app")              //app container
const accept = document.getElementById("accept")        //config accept button
const configBt = document.getElementById("config-bt")   //app to config button
const supInput = document.getElementById("superior")    //upper limit input
const infInput = document.getElementById("inferior")    //lower limit input
const limits = document.getElementById("limits")        //limits text
const number = document.getElementById("number")        //number text (This is the generated number)
const generate = document.getElementById("generate-bt") //app generate button
const reboot = document.getElementById("reboot-bt")     //app restart button
const winList = document.getElementById("win-list")     //winner numbers list
const prevBtn = document.getElementById("prevBtn")      //previous winner number button
const nextBtn = document.getElementById("nextBtn")      //next winner number button

let sup = 0 //upper limit
let inf = 0 //lower limit
const generatedNumbers = new Set() //already generated numbers
const li = document.createElement("li");
let currentIndex = 0; //current winner numbers list position

//Moves the slider to the next or to the previous number
function moveSlider() {
    winList.style.transform = `translateX(-${currentIndex*50}%)`;
}

//Disables one object from the view
function disable(obj){
    obj.classList.add("disable")
    obj.classList.remove("enable")
}

//Enables one object from the view
function enable(obj){
    obj.classList.add("enable")
    obj.classList.remove("disable")
}

//Once introduced in the inputs and accept the confing this function sets the limits
function setLimits(){
    //It ensures that is a number, else will be 0
    sup = parseInt(supInput.value, 10)
    sup = isNaN(sup) ? 0 : sup;
    inf = parseInt(infInput.value, 10)
    inf = isNaN(inf) ? 0 : inf;

    //Inf lower is greater than upper it exchange them
    if (inf > sup){
        let aux = sup
        sup = inf
        inf = aux
    }

    //Adds limits to the limits text
    limits.textContent = " ( " + inf + " - " + sup + " )"
}

//Generates random numbers waits and generates other, creating the number animation
function animateNumber(callback) {
    let counter = 100 //100 iterations
    let interval = setInterval(() => {
        let randomNumber = Math.floor(Math.random() * (sup - inf + 1)) + inf
        let len = sup.toString().length
        number.textContent = randomNumber.toString().padStart(len, '0') //match 0 with the format
        counter--;

        //end the animation
        if (counter < 0) {
            clearInterval(interval)
            callback()
        }
    }, 50)
}

//Generates a  random number between the limits, also is stored so it wont generate the same number again
function getRandomIntInRange(min, max) {
    let randomNum = 0
    let maxAttempts = max - min + 1

    //If all numbers have been generated it returns
    if (generatedNumbers.size >= maxAttempts) {
        console.log("¡Todos los números han sido generados!")
        return 
    }

    //Generates a random number, if it has been already generated it tries again
    do {
        randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (generatedNumbers.has(randomNum))

    //Add the new number to the generated numbers
    generatedNumbers.add(randomNum)

    return randomNum
}

//Disables config, enables app and let the limits set and the number to 0s
accept.addEventListener("click", function() {
    disable(config)
    enable(app)
    setLimits()
    number.textContent = "0".repeat(sup.toString().length);
    currentIndex=0
});

//Disables app and enables config, also clears generated numbers register and clears list
configBt.addEventListener("click", function() {
    disable(app)
    enable(config)
    generatedNumbers.clear()
    winList.innerHTML = ""
});

//Generates a new random number with its animation, deactivating buttons and later activating them again
generate.addEventListener("click",function () {
    let random = getRandomIntInRange(inf, sup)
    if(random != null){
        //Disable all buttons
        generate.disabled = true
        configBt.disabled = true
        reboot.disabled = true
        nextBtn.disabled = true
        prevBtn.disabled = true
        //Animate numbers
        animateNumber(() => {
            //Match the numbers of 0
            len = sup.toString().length
            number.textContent = random.toString().padStart(len, '0')
            let li = document.createElement("li");
            li.textContent = random.toString().padStart(len, '0')
            //Adds the number to the list
            winList.appendChild(li);
            //Enables buttons again
            generate.disabled = false
            configBt.disabled = false
            reboot.disabled = false
            nextBtn.disabled = false
            prevBtn.disabled = false
            //Moves the slider
            if (winList.children.length > 2) {
                currentIndex = winList.children.length - 2
                moveSlider();
            }
        })
        
    }
})

//Clears and restart the generated numbers
reboot.addEventListener("click", function(){
    generatedNumbers.clear()
    number.textContent = "0".repeat(sup.toString().length);
    winList.innerHTML = ""
    currentIndex=0
})

//Moves the slider back
prevBtn.addEventListener("click",function(){
    if(currentIndex > 0){
        currentIndex--
        moveSlider()
    }
})

//Moves the slider fore
nextBtn.addEventListener("click",function(){
    if (winList.children.length > 2 && currentIndex+2 < winList.children.length) {
        currentIndex++;
        moveSlider();
    }
})

//Cleans the upper input
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

//Cleans the lower input
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