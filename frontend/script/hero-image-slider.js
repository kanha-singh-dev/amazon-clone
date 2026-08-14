const swiper = new Swiper(".hero-slider", {

    loop:true,

    autoplay:{

        delay:5000,

        disableOnInteraction:false,

    },

    navigation:{

        nextEl:".swiper-button-next",

        prevEl:".swiper-button-prev",

    },

});