// Retrieve userId from LocalStorage
var userId = localStorage.getItem("userId");
const pdfUrl = `https://localhost:44309/api/Orders/DownloadPDF`;
const excelUrl = `https://localhost:44309/api/Orders/DownloadExcel`;

// Check if userId exists
if (!userId) {
  Swal.fire("Error", "User ID not found in LocalStorage.", "error");
}

document
  .getElementById("downloadPdfBtn")
  .addEventListener("click", function () {
    downloadFile(pdfUrl, "PDF");
  });

document
  .getElementById("downloadExcelBtn")
  .addEventListener("click", function () {
    downloadFile(excelUrl, "Excel");
  });

function downloadFile(url, fileType) {
  Swal.fire({
    title: "Do you want to proceed with the download?",
    text: `A ${fileType} file will be downloaded.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, proceed",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = url; // This triggers the file download
      Swal.fire(
        "Download started!",
        `${fileType} file is being downloaded.`,
        "success"
      );
    }
  });
}
