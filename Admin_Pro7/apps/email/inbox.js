async function loadMessages() {
  try {
      // Fetch data from the API
      const response = await fetch('https://localhost:44309/api/ContactUs/AllContacts');
      const data = await response.json();

      const messagesContainer = document.getElementById('messages');

      data.forEach(contact => {
          const messageHTML = `
              <a class="message d-flex mb-3 text-high-emphasis text-decoration-none" href="/apps/email/message.html?id=${contact.id}">
                  <div class="message-actions me-3">
                      <svg class="icon">
                          <use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-star"></use>
                      </svg>
                  </div>
                  <div class="message-details flex-wrap pb-3 border-bottom">
                      <div class="message-headers d-flex flex-wrap">
                          <div class="message-headers-from">${contact.name}</div>
                          <div class="message-headers-subject w-100 fs-5 fw-semibold">${contact.subject}</div>
                      </div>
                      <div class="message-body">${contact.message}</div>
                  </div>
              </a>
          `;
          messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
      });
  } catch (error) {
      console.error('Error fetching messages:', error);
  }
}

window.onload = loadMessages;