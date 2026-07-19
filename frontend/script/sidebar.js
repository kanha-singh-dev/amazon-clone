document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu-btn");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");
    const closeBtn = document.querySelector(".close-btn");

    if (!menuBtn || !sidebar || !overlay || !closeBtn) {
        return;
    }

    const toggleBodyScroll = (disable) => {
        document.body.style.overflow = disable ? "hidden" : "auto";
    };

    const openMenu = () => {
        sidebar.classList.add("active");
        overlay.classList.add("active");
        toggleBodyScroll(true);
    };

    const closeMenu = () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        toggleBodyScroll(false);
    };

    menuBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
});