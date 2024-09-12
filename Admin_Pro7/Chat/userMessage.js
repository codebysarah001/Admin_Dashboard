var userId = localStorage.getItem('userId');

async function GetAllMessage() {
    if (!userId) {
        console.error('User ID is not found in localStorage.');
        return;
    }

    const API = `https://localhost:44309/api/Chat/showMessage/${userId}`;

    try {
        const response = await fetch(API);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const messageContainer = document.getElementById("message-container");
        messageContainer.innerHTML = '';

        data.forEach(message => {
            const messageClass = message.flag === 1 ? 'message-admin' : 'message-user';
            messageContainer.innerHTML += `
                <div class="${messageClass}">
                    <strong>${message.flag === 1 ? 'Admin' : 'User'}:</strong>
                    <p>${message.cmessages || 'No message content'}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

GetAllMessage();

async function sendMessage() {
    const messageInput = document.getElementById('message-input').value.trim();
    if (!messageInput) {
        alert("Please enter a message before sending.");
        return;
    }

    const API = `https://localhost:44309/api/Chat/replayMessage/${userId}`;
    
    const formData = new FormData();
    formData.append('cmessages', messageInput);
    formData.append('flag', 1); 

    try {
        const response = await fetch(API, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        document.getElementById('message-input').value = '';
        GetAllMessage();
    } catch (error) {
        console.error('Error sending message:', error);
    }
}
