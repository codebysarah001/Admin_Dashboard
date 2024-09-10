async function GetAllUsers() {
    const API = 'https://localhost:44309/api/Chat/AllUsers';

    try {
        const response = await fetch(API);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const tableBody = document.getElementById("table-body-1");
        tableBody.innerHTML = '';

        let rows = '';
        data.forEach(row => {
            rows += `
            <tr>
                <td>User ${row.userId}</td>
                <td>
                    <button onclick="storeUserId(${row.userId})" class="btn btn-primary btn-sm">Chat</button>
                </td>
            </tr>`;
        });
        tableBody.innerHTML = rows;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Call the function to load users
GetAllUsers();

function storeUserId(userId) {
    localStorage.setItem('userId', userId);
    window.location.href = "/Chat/userMessage.html";
}
