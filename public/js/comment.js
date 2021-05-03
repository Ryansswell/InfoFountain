const commentButton = document.getElementById('commentsubmit');

const commentFormHandler = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('post-id');

    // Collect values from the comment form
    const comment_text = document.querySelector('#comment_text').value.trim();

    console.log("YOYOHELO");
    if (comment_text) {
        // Send a POST request to the API endpoint
        const response = await fetch(`/api/posts/${id}`, {
            method: 'POST',
            body: JSON.stringify({ comment_text }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response);
        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/userportal');
        } else {
            alert(response.statusText);
        }
    }
};


commentButton.addEventListener('submit', commentFormHandler);
// document
//     .querySelector('#submitButton')
//     .addEventListener('submit', commentFormHandler);
