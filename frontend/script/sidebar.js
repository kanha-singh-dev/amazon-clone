        const menuBtn = document.querySelector(".menu-btn");

const sidebar = document.querySelector(".sidebar");

const overlay = document.querySelector(".overlay");

const closeBtn = document.querySelector(".close-btn");

menuBtn.onclick = ()=>{

    sidebar.classList.add("active");

    overlay.classList.add("active");

}

closeBtn.onclick = ()=>{

    sidebar.classList.remove("active");

    overlay.classList.remove("active");

}

overlay.onclick = ()=>{

    sidebar.classList.remove("active");

    overlay.classList.remove("active");

}
const toggleBodyScroll = (disable) => {
    if (disable) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
};
menuBtn.onclick = () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    toggleBodyScroll(true); // FIX: Disable scroll when sidebar opens
};
const closeMenuHandler = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    toggleBodyScroll(false); // FIX: Enable scroll when sidebar closes
};
closeBtn.onclick = closeMenuHandler;
overlay.onclick = closeMenuHandler;