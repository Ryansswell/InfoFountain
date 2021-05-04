const postFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const title = document.querySelector('#title').value.trim();
    const postText = document.querySelector('#postText').value.trim();

    if (title && postText) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, postText }),
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
    .querySelector('#postFormSubmit')
    .addEventListener('submit', postFormHandler);
