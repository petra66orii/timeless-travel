document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.toggle-task');
    const progressBar = document.getElementById('progress-bar');

    function updateProgress() {
        // Get total tasks and completed tasks
        const totalTasks = document.querySelectorAll('.toggle-task').length;
        const completedTasks = document.querySelectorAll('.toggle-task.btn-green').length;

        // Calculate progress percentage
        const progress = Math.round((completedTasks / totalTasks) * 100);

        // Update progress bar
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${progress}%`;

    }

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
                    updateProgress();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    });
    updateProgress();
});