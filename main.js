function showPreview(event) {
  document.getElementsByClassName("upload__form").hidden = false;
  if(event.target.files.length > 0) {
    var src = window.URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("preview-image");
    var form = document.getElementsByTagName("label");
    preview.src = src;
    preview.style.display = "block";
    form[0].style.display = "none";
  }
}

