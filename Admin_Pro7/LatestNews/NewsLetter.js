async function Subscription() {
    const pointTable = document.getElementById("container");
    const sendAllButton = document.getElementById("sendAllButton");

    try {
        const response = await fetch('https://localhost:44309/api/NewsLetter/GetAllSubscription');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const users = await response.json();

        users.forEach(point => {
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${point.email}</td>
            <td></td>
            `;

            pointTable.appendChild(row);
        });

        sendAllButton.addEventListener("click", async () => {
            try {
                const response = await fetch('https://localhost:44309/api/NewsLetter/SendNewsLetters', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                alert("News sent to all subscribers successfully!");
            } catch (error) {
                console.error('Error sending news:', error);
                alert("Failed to send news.");
            }
        });
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        pointTable.innerHTML = `<tr><td colspan="2">Failed to load subscriptions.</td></tr>`;
    }
}

window.onload = Subscription;
