document.addEventListener("DOMContentLoaded", function() {
    const newsUrl = "https://localhost:44309/api/LatestNews/AddNews";
  
    var form = document.getElementById("form");
  
    async function addNews(event) {
      event.preventDefault(); 
  
      const formData = new FormData(form);
  
      try {
        const response = await fetch(newsUrl, {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          Swal.fire({
            title: 'Success!',
            text: 'News added successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/LatestNews/LatestNews.html';
            }
          });
        } else {
          const errorData = await response.json();
          Swal.fire('Error!', `Failed to add news: ${errorData.message}`, 'error');
        }
      } catch (error) {
        Swal.fire('Error!', 'An error occurred while adding the news.', 'error');
      }
    }

    form.addEventListener("submit", addNews);
  
  });
  