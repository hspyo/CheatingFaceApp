function showPreview(event) {
  if(event.target.files.length > 0) {
    var src = window.URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("preview-image");
    preview.src = src;
    preview.style.display = "block";
  }
}