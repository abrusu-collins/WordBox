let yearp= document.getElementById("year");
let year= new Date().getFullYear();

document.addEventListener("load",()=>{
    yearp.innerHTML=`<span>&copy; ${year} | Abrusu Collins</span>`;
})
