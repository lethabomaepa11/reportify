

const links = document.querySelectorAll("a");

function router(e) {
    e.preventDefault();
    let url = location.href;
    let newPathname = new URL(e.target.href).pathname;
    url += newPathname.replace("/","");
    //route to the url
    location.href = url;
}

links.forEach(link => {
    link.addEventListener("click", router);
})

