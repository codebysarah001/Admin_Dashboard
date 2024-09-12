const categoryUrl = "https://localhost:44309/api/Category/GetAllCategories";
const productId = localStorage.getItem("ProductID");
const API = `https://localhost:44309/api/Books/UpdateBook/${productId}`;
var form = document.getElementById("form");
var imageUrlInput = document.getElementById('imageUrlInput');
var imagePreview = document.getElementById('imagePreview');
var imagePreviewContainer = document.getElementById('imagePreviewContainer');

async function updateProduct(event) {
    event.preventDefault();

    const productId = localStorage.getItem("ProductID");
    const API = `https://localhost:44309/api/Books/UpdateBook/${productId}`;

    const formData = new FormData(form);

    try {
        const response = await fetch(API, {
            method: "PUT",
            body: formData
        });

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: 'Product updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'Product.html';
                }
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update product.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred while updating the product.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

async function selectCat() {
    try {
        let request = await fetch(categoryUrl);
        let categories = await request.json();

        var select = document.getElementById("selectCat");
        select.innerHTML = '<option value="">Select Category</option>';
        categories.forEach(option => {
            select.innerHTML += `<option value="${option.id}">${option.name}</option>`;
        });
    } catch (error) {
        Swal.fire('Error!', 'Failed to load categories.', 'error');
    }
}

imageUrlInput.addEventListener('input', function() {
    const imageUrl = imageUrlInput.value;

    if (imageUrl) {
        imagePreview.src = imageUrl;
        imagePreviewContainer.classList.remove('d-none');  
    } else {
        imagePreview.src = ""; 
        imagePreviewContainer.classList.add('d-none');  
    }
});

form.addEventListener("submit", updateProduct);

selectCat();
