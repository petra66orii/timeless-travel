document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.toggle-task');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const url = this.getAttribute('data-url');
            const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

            fetch(url, {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': csrftoken
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.completed) {
                        this.classList.add('btn-green');
                        this.classList.remove('btn-red');
                        this.textContent = 'Completed';
                    } else {
                        this.classList.add('btn-red');
                        this.classList.remove('btn-green');
                        this.textContent = 'Pending';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    });
});
