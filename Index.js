main = document.getElementsByTagName("Header")[0];

if(!navigator.userAgentData.mobile) {
    document.addEventListener("mousemove", () => {
        main.style.boxShadow = (event.clientX - window.innerWidth / 2) / -15 + "px " + (event.clientY - window.innerHeight / 2) / -15 + "px 0 #fff";
    });
}