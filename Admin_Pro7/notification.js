async function updateDropdown() {
    try {
        // Fetch data from the API
        const response = await fetch('https://localhost:44309/api/ContactUs/AllContacts');

        // Check if the response is OK
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        const dropdownMenu = document.getElementById('dropdownMenu');

        // Clear previous content
        dropdownMenu.innerHTML = '';

        // Add a header
        const header = document.createElement('div');
        header.className = 'dropdown-header bg-body-tertiary text-body-secondary fw-semibold rounded-top mb-2';
        header.textContent = `You have ${data.length} messages`;
        dropdownMenu.appendChild(header);

        // Add messages to dropdown
        data.forEach(item => {
            const messageItem = document.createElement('a');
            messageItem.className = 'dropdown-item';
            messageItem.href = '#';
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'd-flex align-items-start'; // Added align-items-start to ensure proper alignment

            // Removed avatar section
            const messageContentDiv = document.createElement('div');
            messageContentDiv.className = 'message text-wrap flex-grow-1'; // Added flex-grow-1 to take remaining space
            
            const headerDiv = document.createElement('div');
            headerDiv.className = 'd-flex justify-content-between mt-1';
            const nameDiv = document.createElement('div');
            nameDiv.className = 'small text-body-secondary';
            nameDiv.textContent = item.name;
            const timeDiv = document.createElement('div');
            timeDiv.className = 'small text-body-secondary';
            timeDiv.textContent = 'Just now'; // Adjust this as needed or use item.time if available
            headerDiv.appendChild(nameDiv);
            headerDiv.appendChild(timeDiv);
            
            const subjectDiv = document.createElement('div');
            subjectDiv.className = 'fw-semibold';
            const subjectSpan = document.createElement('span');
            subjectSpan.className = 'text-danger';
            subjectSpan.textContent = '! ';
            subjectDiv.appendChild(subjectSpan);
            subjectDiv.appendChild(document.createTextNode(item.subject));
            
            const messageBodyDiv = document.createElement('div'); // Renamed from messageContentDiv to messageBodyDiv
            messageBodyDiv.className = 'small text-body-secondary';
            messageBodyDiv.textContent = item.message;
            
            messageContentDiv.appendChild(headerDiv);
            messageContentDiv.appendChild(subjectDiv);
            messageContentDiv.appendChild(messageBodyDiv);
            
            contentDiv.appendChild(messageContentDiv);
            
            messageItem.appendChild(contentDiv);
            
            dropdownMenu.appendChild(messageItem);
        });

        // Add a button to view all messages
        const viewAllButton = document.createElement('div');
        viewAllButton.className = 'p-2';
        const viewAllLink = document.createElement('a');
        viewAllLink.className = 'btn btn-outline-primary w-100';
        viewAllLink.href = '/apps/email/inbox.html'; // Update to link to the messages page
        viewAllLink.textContent = 'View all messages';
        viewAllButton.appendChild(viewAllLink);
        
        dropdownMenu.appendChild(viewAllButton);

    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateDropdown);