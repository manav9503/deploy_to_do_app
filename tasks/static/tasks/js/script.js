// tasks/static/tasks/js/script.js
document.addEventListener('DOMContentLoaded', function() {
    // Add date picker to due date field
    const dueDateFields = document.querySelectorAll('input[type="date"]');
    dueDateFields.forEach(field => {
        if (!field.value) {
            const today = new Date();
            const formattedDate = today.toISOString().substr(0, 10);
            field.value = formattedDate;
        }
    });

    // Add confirmation for delete actions
    const deleteForms = document.querySelectorAll('.delete-container form');
    deleteForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!confirm('Are you sure you want to delete this task?')) {
                e.preventDefault();
            }
        });
    });

    // Toggle task completion
    const completeForms = document.querySelectorAll('.complete-form');
    completeForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'X-CSRFToken': form.querySelector('[name=csrfmiddlewaretoken]').value,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                }
            })
            .catch(error => console.error('Error:', error));
        });
    });
});