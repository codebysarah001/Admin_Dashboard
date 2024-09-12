async function GetAllNews() {
    const API = 'https://localhost:44309/api/LatestNews/GetLatestNews';
    
    let request = await fetch(API);
    let response = await request.json();

    let cardGroup = document.getElementById("card-group");
    cardGroup.innerHTML = ''; 

    response.forEach(news => {
        cardGroup.innerHTML += `
            <div class="card">
            <img src="${news.imageUrl}" class="card-img-top" alt="${news.newsType}" style="width: 500px; height: 300px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${news.newsType}</h5>
                    <p class="card-text">${news.description}</p>
                </div>
                <div class="card-footer">
                    <small class="text-body-secondary">Published at ${new Date(news.publishedAt).toLocaleDateString()}</small>
                    <div class="mt-2">
                        <a href="/LatestNews/editNews.html" onclick="Edit(${news.id})" class="btn btn-primary btn-sm">Edit</a>
                        <button class="btn btn-danger btn-sm" onclick="DeleteItem(${news.id}, this)">Delete</button>
                    </div>
                </div>
            </div>`;
    });
}

function Edit(id) {
    localStorage.setItem("NewsID", id);
    window.location.href = `/LatestNews/editNews.html`; 
}

async function DeleteItem(id, buttonElement) {
    event.preventDefault();

    // Show SweetAlert confirmation dialog
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete this news item?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    });

    // If confirmed
    if (result.isConfirmed) {
        const API = `https://localhost:44309/api/LatestNews/DeleteNews/${id}`;
        
        try {
            let response = await fetch(API, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Show success SweetAlert
                Swal.fire(
                    'Deleted!',
                    'News item has been deleted successfully.',
                    'success'
                );

                // Remove the card from the page
                buttonElement.closest('.card').remove();
            } else {
                // Show error SweetAlert
                Swal.fire(
                    'Error!',
                    'There was a problem deleting the news item.',
                    'error'
                );
            }
        } catch (error) {
            // Handle fetch error (network issue, etc.)
            Swal.fire(
                'Error!',
                'An error occurred while deleting the news item.',
                'error'
            );
        }
    }
}

GetAllNews();
