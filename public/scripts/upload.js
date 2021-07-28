'use strict';

// Select your file input
const fileInput = document.querySelector("input[type='file']");
// Add your onchange handler
fileInput.onchange = async (e) => {
  const files = e.target.files;

  for (const file of files) {
    let data = new FormData();
    data.append(`${file.name}`, file);

    console.log(data);

    // // Send as multipart/form-data
    // // Ensure the URL points to your server
    const response = await fetch('/upload', {
      method: 'POST',
      body: data,
    });

    const { url } = await response.json();
    console.log(url);
  }

  // Now you have a URL of the file uploaded to S3
};
