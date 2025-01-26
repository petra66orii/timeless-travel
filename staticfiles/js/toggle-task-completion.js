document.addEventListener('DOMContentLoaded', function () {
    // Define our variables
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

        // Change colors dynamically depending on tasks completion
        if (progress <= 33) {
            progressBar.style.backgroundColor = '#cf065a';
        } else if (progress <= 67) {
            progressBar.style.backgroundColor = '#eb8808';
        } else {
            progressBar.style.backgroundColor = '#64C431';
        }
    }

    toggleButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            // Define the url and the CSRF token
            const url = this.getAttribute('data-url');
            const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

            // Use fetch() and AJAX to update task completion and progress bar dynamically
            fetch(url, {
                    method: 'POST',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRFToken': csrftoken
                    }
                })
                // Add error handling
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                // Changes the button's color and text based on whether the task is completed or not
                .then(data => {
                    if (data.completed) {
                        this.classList.add('btn-green');
                        this.classList.remove('btn-red');
                        this.textContent = 'Undo';
                    } else {
                        this.classList.add('btn-red');
                        this.classList.remove('btn-green');
                        this.textContent = 'Complete';
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