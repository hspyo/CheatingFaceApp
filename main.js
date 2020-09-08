// Navbar Toggle Button
const navMenu = document.querySelector(".nav__menu");
const navToggleBtn = document.querySelector(".nav__toggle__btn");
navToggleBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// Remove Menu list after clicking on
document.querySelectorAll(".nav__menu__list").forEach((item) => {
  item.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

// Check Gender
function checkGender() {
  const checkedGender = document.getElementsByClassName(
    "gender__toggle-state"
  )[0].checked;

  if (checkedGender) {
    return "female";
  } else {
    return "male";
  }
}

// Show Image Preview
function showPreview(event) {
  document.getElementsByClassName("upload__form").hidden = false;
  let loader = document.querySelector(".loader");
  let loadingMsg = document.querySelector(".loading__msg");
  if (event.target.files.length > 0) {
    let src = window.URL.createObjectURL(event.target.files[0]);
    let preview = document.getElementById("preview-image");
    let form = document.getElementsByClassName("upload__label")[0];
    preview.src = src;
    preview.style.display = "block";
    form.style.display = "none";
    loader.style.display = "block";
    loadingMsg.style.display = "block";
  }
  init().then(() => {
    loader.style.display = "none";
    loadingMsg.style.display = "none";
    predict();
  });
}

// Show SNS Share Button
function showShareBtn() {
  const shareBtn = document.getElementById("shareBtn");
  shareBtn.style.display = "block";
}

// Try Again Button
function tryAgainBtn() {
  let tryAgain = document.querySelector(".tryAgainBtn");
  tryAgain.style.display = "block";
  tryAgain.addEventListener("click", () => {
    location.reload();
  });
}

// Teachable Machine
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
  console.log(prediction[0].className);
  // If User is a male
  if (checkGender() === "male") {
    for (let i = 0; i < maxPredictions; i++) {
      if (
        prediction[i].className === "badmen" ||
        prediction[i].className === "goodmen"
      ) {
        const resultProbability =
          Math.round(prediction[i].probability.toFixed(2) * 100) + "%";
        let label;
        let testResult;
        switch (prediction[i].className) {
          case "badmen":
            testResult = "바람꾼";
            label = "바람기 👉🏻 ";
            break;
          case "goodmen":
            testResult = "순정남";
            label = "순정도 👉🏻";
            break;
          default:
            testResult = "알수없음";
        }
        // the Test Main Result to show only one time
        if (mainResult !== 0) {
          let result = document.querySelector(".test-result");
          result.innerText = testResult;
          result.style.display = "block";
          var mainResult = 0;
        }
        // View a face feature about Men
        let moreBtn = document.querySelector(".viewMoreMen");
        moreBtn.style.display = "block";
        labelContainer.childNodes[i].innerHTML = label + resultProbability;
        showShareBtn();
        tryAgainBtn();
      } else {
        if (i === 0) {
          alert("얼굴이 잘 나온 다른 사진으로 재시도 해주세요");
          tryAgainBtn();
          break;
        }
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
        const resultProbability =
          Math.round(prediction[i].probability.toFixed(2) * 100) + "%";
        let label;
        let testResult;
        switch (prediction[i].className) {
          case "badwomen":
            testResult = "바람꾼";
            label = "바람기 👉🏻 ";
            break;
          case "goodwomen":
            testResult = "순정녀";
            label = "순정도 👉🏻 ";
            break;
          default:
            testResult = "알수없음";
        }
        if (mainResult !== 0) {
          let result = document.querySelector(".test-result");
          result.innerText = testResult;
          result.style.display = "block";
          var mainResult = 0;
        }
        let moreBtn = document.querySelector(".viewMoreWomen");
        moreBtn.style.display = "block";
        labelContainer.childNodes[i].innerHTML = label + resultProbability;
        showShareBtn();
        tryAgainBtn();
      } else {
        if (i === 0) {
          alert("얼굴이 잘 나온 다른 사진으로 재시도 해주세요");
          tryAgainBtn();
          break;
        }
        continue;
      }
    }
  }
}
