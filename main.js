function showPreview(event) {
  document.getElementsByClassName("upload__form").hidden = false;
  if (event.target.files.length > 0) {
    var src = window.URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("preview-image");
    var form = document.getElementsByTagName("label");
    preview.src = src;
    preview.style.display = "block";
    form[0].style.display = "none";
  }
  init().then(() => {
    predict();
  })
}

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/PMw8cuZzx/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // or files from your local hard drive
  // Note: the pose library adds "tmImage" object to your window (window.tmImage)
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // append elements to the DOM
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) {
    // and class labels
    labelContainer.appendChild(document.createElement("div"));
  }
}

// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  var image = document.getElementById("preview-image");
  const prediction = await model.predict(image, false);
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
  }
}
