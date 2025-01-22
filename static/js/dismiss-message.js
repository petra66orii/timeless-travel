document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        const messageElement = document.getElementById('msg');
        if (messageElement && !event.target.closest('.alert') && !event.target.closest('.btn-close')) {
            messageElement.remove();
        }
    });
    // Prevents the function from repeating itself - credits to W3Schools
    const messageElement = document.getElementById('msg');
    if (messageElement) {
        messageElement.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }
});