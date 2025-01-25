// Handle inline editing
document.addEventListener('DOMContentLoaded', () => {
    let commentForm = document.getElementById('comment-form');
    let commentText = document.getElementById('id_content');
    let submitButton = document.getElementById('submit-btn');

    let deleteButton = document.getElementById('delete-btn');
    let editButtons = document.querySelectorAll('.edit-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            let commentId = button.getAttribute('data-comment-id');
            let commentContent = document.getElementById(`comment-${commentId}`).innerText;
            commentText.value = commentContent; // Populate the form with the comment content
            submitButton.innerText = 'Update'; // Change button text
            commentForm.setAttribute("action", `edit_comment/${commentId}`); // Update form action
        });
    });
})