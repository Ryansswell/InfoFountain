const postFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const title = document.querySelector('#title').value.trim();
    const post_text = document.querySelector('#post_text').value.trim();

    if (title && post_text) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, post_text }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/userportal');
        } else {
            alert(response.statusText);
        }
    }
};


document
    .querySelector('#submit')
    .addEventListener('submit', postFormHandler);
