document.addEventListener("DOMContentLoaded", function() {
  const productUrl = "https://localhost:44309/api/Books/AddNewBook";
  const categoryUrl = "https://localhost:44309/api/Category/GetAllCategories";

  var form = document.getElementById("form");
  // var imageUrlInput = document.getElementById('imageUrlInput');
  // var imagePreview = document.getElementById('imagePreview');
  // var imagePreviewContainer = document.getElementById('imagePreviewContainer');

  // Function to add a new product
  async function addProduct(event) {
    event.preventDefault();  // Prevent form submission

    const formData = new FormData(form);

    try {
      const response = await fetch(productUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Product added successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/Product/Product.html';  // Redirect to Product page
          }
        });
      } else {
        const errorData = await response.json();
        Swal.fire('Error!', `Failed to add product: ${errorData.message}`, 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'An error occurred while adding the product.', 'error');
    }
  }

  // Function to load categories into the dropdown
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

  form.addEventListener("submit", addProduct);

  selectCat();
});
