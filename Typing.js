document.addEventListener('DOMContentLoaded', function() {
    const text = "Valenta Hanuš";
    const typingSpeed = 100;

    let index = 0;

    function typeText() {
        if (index < text.length) {
            document.getElementById('typed-text').innerHTML += text.charAt(index);
            index++;
            setTimeout(typeText, typingSpeed);
        }
    }

    typeText();
});
