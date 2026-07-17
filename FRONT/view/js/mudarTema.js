const btnConfig = document.getElementById("btnConfig");
const menuTema = document.getElementById("menuTema");

btnConfig.addEventListener("click", (e) => {
    e.stopPropagation();

    if (menuTema.style.display === "block") {
        menuTema.style.display = "none";
    } else {
        menuTema.style.display = "block";
    }
});

document.addEventListener("click", (e) => {
    if (!menuTema.contains(e.target) && !btnConfig.contains(e.target)) {
        menuTema.style.display = "none";
    }
});