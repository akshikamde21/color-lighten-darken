const hexInput = document.getElementById("hexInput");
const inputColor = document.getElementById("inputColor");
const alteredColor = document.getElementById("alteredColor");
const sliderText = document.getElementById("sliderText");
const slider = document.getElementById("slider");
const alteredColorText = document.getElementById("alterColorText");
const lightenText = document.getElementById("lightenText");
const darkenText = document.getElementById("darkenText");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
    if(toggleBtn.classList.contains("toggled")){
        toggleBtn.classList.remove("toggled")
        lightenText.classList.remove("unselected")
        darkenText.classList.add("unselected");
    }else{
        toggleBtn.classList.add("toggled")
        lightenText.classList.add("unselected");
        darkenText.classList.remove("unselected");
    }
    reset();
})

hexInput.addEventListener("keyup", ()=>{
    const hex = hexInput.value;
    if(!validHexInput(hex)) return;
    const strippedHex = hex.replace(/^#/,''); //remove any leading #
    inputColor.style.backgroundColor = "#" + strippedHex;
    reset();
})

/* check for valid hex: either 3 or 6 digits in length 
and should accept with or without # */
const validHexInput = (hex) => {
    if(!hex) return false;
    /* const strippedHex = hex.replace('#','');
    return strippedHex.length === 3 || strippedHex.length === 6; */
    const hexPattern = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/; //regex 
    return hexPattern.test(hex); 
}


const convertHexToRGB = (hex) => {
    if(!validHexInput(hex)) return null;
    let strippedHex = hex.replace(/^#/,'');
    if(strippedHex.length === 3){
        strippedHex = strippedHex[0] + strippedHex[0] + 
        strippedHex[1] + strippedHex[1] +
        strippedHex[2] + strippedHex[2];
    }

    const r = parseInt(strippedHex.substring(0,2),16);
    const g = parseInt(strippedHex.substring(2,4),16);
    const b = parseInt(strippedHex.substring(4,6),16);

    return {r,g,b};
}

const convertRGBToHex = (r,g,b) => {
    const pairR = ("0"+r.toString(16)).slice(-2); //slice: selects only last two
    const pairG = ("0"+g.toString(16)).slice(-2);
    const pairB = ("0"+b.toString(16)).slice(-2);

    return "#" + pairR + pairG + pairB;
}

const increaseWithin0And255 = (rgb, amount) => {
    // const newrgb = rgb + amount;
    // if(newrgb>255) return 255;
    // if(newrgb<0) return 0;
    // return newrgb;
    return Math.min(255, Math.max(0,rgb+amount));
}

const alterColor = (hex, percentage) => {
    const {r,g,b} = convertHexToRGB(hex);
    const amount = Math.floor((percentage/100)*255);
    const newR = increaseWithin0And255(r, amount);
    const newG = increaseWithin0And255(g, amount);
    const newB = increaseWithin0And255(b, amount);
    return convertRGBToHex(newR, newG, newB);
}

//console.log(alterColor("000", -5));

slider.addEventListener("input",()=>{
    if(!validHexInput(hexInput.value)) return;
    sliderText.textContent = `${slider.value}%`;

    const valueAddition = toggleBtn.classList.contains("toggled") ? 
    -slider.value :  slider.value;

    const color = alterColor(hexInput.value, valueAddition);
    alteredColor.style.backgroundColor = color;
    alteredColorText.innerText = `Altered Color: ${color}`;
})


const reset = () => { 
    slider.value = 0;
    sliderText.innerText=`0%`;
    alteredColor.style.backgroundColor = `#${hexInput.value}`;
    alteredColorText.innerText = `Altered Color: #${hexInput.value}` ; 
  
  }
