

const links = document.querySelectorAll("a");

function router(e) {
    e.preventDefault();
    let url = new URL(e.target.href);
    let pathname = url.pathname;
    //append the pathname onto the url if the current url includes .github.io
    if (String(url).includes(".github.io")) {
        url += pathname;
    }
    location.href = url;
}

links.forEach(link => {
    link.addEventListener("click", router);
})

