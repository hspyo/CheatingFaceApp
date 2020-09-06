// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/PMw8cuZzx/";

let model, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // or files from your local hard drive
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // append elements to the DOM
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) {
    // and class labels
    labelContainer.appendChild(document.createElement("div"));
  }
}

// predict a uploaded image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  let image = document.getElementById("preview-image");
  const prediction = await model.predict(image, false);
  prediction.sort(
    (a, b) => parseFloat(b.probability) - parseFloat(a.probability)
  );
  // Check Gender
  checkGender();

  // If User is a male
  if (checkGender() === "male") {
    for (let i = 0; i < maxPredictions; i++) {
      if (
        prediction[i].className === "badmen" ||
        prediction[i].className === "goodmen"
      ) {
        const resultProbability = prediction[i].probability.toFixed(2);
        let label;
        let testResult;
        switch (prediction[i].className) {
          case "badmen":
            testResult = "바람필상";
            label = "바람필상";
            break;
          case "goodmen":
            testResult = "바람안필상";
            label = "바람안필상";
            break;
          default:
            testResult = "알수없음";
        }
        let result = document.querySelector(".test-result");
        result.innerText = testResult;
        result.style.display = "block";
        labelContainer.childNodes[i].innerHTML = label + resultProbability;
        showShareBtn();
      } else {
        continue;
      }
    }
  }
  // If User is a female
  else {
    for (let i = 0; i < maxPredictions; i++) {
      if (
        prediction[i].className === "badwomen" ||
        prediction[i].className === "goodwomen"
      ) {
        const resultProbability = prediction[i].probability.toFixed(2);
        let label;
        let testResult;
        switch (prediction[i].className) {
          case "badwomen":
            testResult = "바람필상";
            label = "바람필상";
            break;
          case "goodwomen":
            testResult = "바람안필상";
            label = "바람안필상";
            break;
          default:
            testResult = "알수없음";
        }
        let result = document.querySelector(".test-result");
        result.innerText = testResult;
        result.style.display = "block";
        labelContainer.childNodes[i].innerHTML = label + resultProbability;
        showShareBtn();
      } else {
        continue;
      }
    }
  }
}

const navMenu = document.querySelector(".nav__menu");
const navToggleBtn = document.querySelector(".nav__menu__btn");
document.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});
// SNS share btn
function showShareBtn() {
  const shareBtn = document.getElementById("shareBtn");
  shareBtn.style.display = "block";
}


function showPreview(event) {
  document.getElementsByClassName("upload__form").hidden = false;
  if (event.target.files.length > 0) {
    let src = window.URL.createObjectURL(event.target.files[0]);
    let preview = document.getElementById("preview-image");
    let form = document.getElementsByClassName("upload__label")[0];
    preview.src = src;
    preview.style.display = "block";
    form.style.display = "none";
  }
  init().then(() => {
    predict();
  });
}

function checkGender() {
  const checkedGender = document.getElementsByClassName("toggle-state")[0]
    .checked;

  if (checkedGender) {
    return "female";
  } else {
    return "male";
  }
}