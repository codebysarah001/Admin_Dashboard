const newsID = localStorage.getItem("NewsID");
const API = `https://localhost:44309/api/LatestNews/UpdateNews/${newsID}`;

async function updateNews(event) {
    event.preventDefault();

    const form = document.getElementById("form");
    const formData = new FormData(form);

    try {
        const response = await fetch(API, {
            method: "PUT",

            body: formData
        });

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: 'News updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = "/LatestNews/LatestNews.html";
            });
        } else {
            console.error('Response Status:', response.status);
            const errorText = await response.text();
            console.error('Response Text:', errorText);

            Swal.fire({
                title: 'Error!',
                text: `Failed to update news: ${errorText}`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        console.error('Fetch Error:', error);

        Swal.fire({
            title: 'Error!',
            text: 'An error occurred while updating the news.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

async function loadNewsData() {
    if (!newsID) return;

    try {
        const response = await fetch(`https://localhost:44309/api/LatestNews/GetNewsById/${newsID}`);
        const news = await response.json();

        document.getElementById('imageURL').value = news.imageUrl;
        document.getElementById('newsType').value = news.newsType;
        document.getElementById('Description').value = news.description;
    } catch (error) {
        console.error('Load News Data Error:', error);

        Swal.fire({
            title: 'Error!',
            text: 'Failed to load news data.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

document.getElementById("form").addEventListener("submit", updateNews);
window.onload = loadNewsData;
