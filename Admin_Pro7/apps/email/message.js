function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id')
    };
}

// Function to fetch and display message details
async function loadMessageDetails() {
    const queryParams = getQueryParams();
    const messageId = queryParams.id;

    if (!messageId) {
        console.error('No message ID found in URL');
        return;
    }

    try {
        // Fetch data from the API
        const response = await fetch(`https://localhost:44309/api/ContactUs/contactMsg/${messageId}`);
        const data = await response.json();

        if (data.length > 0) {
            const contact = data[0];
            const messageHTML = `
                <div class="message-details flex-wrap pb-3">
                    <div class="message-headers d-flex flex-wrap">
                        <div class="message-headers-subject w-100 fs-5 fw-semibold">${contact.subject}</div>
                        <div class="message-headers-from">${contact.name}<span class="text-body-secondary">(${contact.email})</span></div>
                    </div>
                    <hr>
                    <div class="message-body">
                        <p>${contact.message}</p>
                    </div>
                    <hr>
                    <form class="mt-3" method="post">
                        <div class="mb-3">
                            <textarea class="form-control" id="message" name="body" rows="12" placeholder="Click here to reply"></textarea>
                        </div>
                        <div class="mb-3">
                            <button class="btn btn-success" tabindex="3" type="submit">Send message</button>
                        </div>
                    </form>
                </div>
            `;
            document.getElementById('message').innerHTML = messageHTML;
        } else {
            console.error('No message found for the given ID');
        }
    } catch (error) {
        console.error('Error fetching message details:', error);
    }
}

// Function to handle form submission
async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const queryParams = getQueryParams();
    const messageId = queryParams.id;

    if (!messageId) {
        console.error('No message ID found in URL');
        return;
    }

    const form = event.target;
    const body = form.body.value;

    try {
        // Fetch the original message details to get the recipient email
        const response = await fetch(`https://localhost:44309/api/ContactUs/contactMsg/${messageId}`);
        const data = await response.json();

        if (data.length > 0) {
            const contact = data[0];

            const emailRequest = {
                to: contact.email, // Set recipient email dynamically from the contact details
                subject: `Reply to your message regarding: ${contact.subject}`, // Set subject dynamically
                body: body
            };

            const sendResponse = await fetch('https://localhost:44309/api/ContactUs/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailRequest)
            });

            if (sendResponse.ok) {
                alert('Message sent successfully!');
                form.reset(); // Clear the form
            } else {
                const errorData = await sendResponse.json();
                console.error('Error sending message:', errorData);
            }
        } else {
            console.error('No message found for the given ID');
        }
    } catch (error) {
        console.error('Error fetching message details:', error);
    }
}

// Attach the form submit event listener
window.onload = function() {
    loadMessageDetails();
    document.querySelector('form').addEventListener('submit', handleFormSubmit);
};