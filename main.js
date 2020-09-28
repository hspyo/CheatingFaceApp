// 네비게이션 토글 버튼
const navMenu = document.querySelector(".nav__menu");
const navToggleBtn = document.querySelector(".nav__toggle__btn");
navToggleBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// 메뉴 클릭 후 닫아주기
document.querySelectorAll(".nav__menu__list").forEach((item) => {
  item.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

// 성별 체크
function checkGender() {
  const checkedGender = document.querySelector(".gender__state").checked;

  // 토글버튼이 체크되어있으면 true 여성, 체크되어있지 않으면 false 남자
  if (checkedGender) {
    return "female";
  } else {
    return "male";
  }
}

// 이미지 프리뷰
function showPreview(event) {
  const loader = document.querySelector(".loader");
  const loadingMsg = document.querySelector(".loading__msg");

  if (event.target.files.length > 0) {
    let src = window.URL.createObjectURL(event.target.files[0]);
    let preview = document.querySelector(".preview__image");
    let uploadForm = document.getElementsByClassName("upload__label")[0];
    preview.src = src;
    preview.style.display = "block";
    uploadForm.style.display = "none";
    loader.style.display = "block";
    loadingMsg.style.display = "block";
  }
  // 이미지 가져온 후 이미지 분석 시작 (티처블 머신 실행)
  init().then(() => {
    loader.style.display = "none";
    loadingMsg.style.display = "none";
    predict();
  });
}

// SNS 공유버튼 보여주기
function showShareBtn() {
  const shareBtn = document.getElementById("sns__share__btn");
  shareBtn.style.display = "block";
}

// 재시도 버튼
function tryAgainBtn() {
  let tryAgain = document.querySelector(".tryAgain__btn");
  tryAgain.style.display = "block";
  tryAgain.addEventListener("click", () => {
    location.reload();
  });
}

// Teachable Machine
// 나의 커스텀 티처블 머신 주소
const URL = "https://teachablemachine.withgoogle.com/models/PMw8cuZzx/";

let model, resultContainer, maxPredictions;

// Teachable Machine 실행하기
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // 모델과 메타데이터 로드, 모델의 전체 클래스 받아오기
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // 결과를 담을 컨테이너
  resultContainer = document.getElementById("result__container");
  for (let i = 0; i < maxPredictions; i++) {
    resultContainer.appendChild(document.createElement("div"));
  }
}

// 업로드된 이미지 예측하기
async function predict() {
  let image = document.querySelector(".preview__image");
  const prediction = await model.predict(image, false);
  // prediction안에는 4가지 객체 배열이 들어있다 [{..}{..}{..}{..}]
  // key : className, probability
  // className-value : badmen, goodmen, badwomen, goodwomen
  // probability-vlaue : 실수값 (AI는 업로드된 사진을 분석하여 위 4개 key값에 부여하는 점수)

  // probability(점수)가 높게 나온대로 배열 순서를 재정렬한다.
  prediction.sort(
    (a, b) => parseFloat(b.probability) - parseFloat(a.probability)
  );
  // 성별 체크
  checkGender();
  // 남자일 경우
  if (checkGender() === "male") {
    for (let i = 0; i < maxPredictions; i++) {
      if (
        prediction[i].className === "badmen" ||
        prediction[i].className === "goodmen"
      ) {
      // 실수값으로 나온 결과를 백분율로 바꿔준다.
        const resultProbability = Math.round(prediction[i].probability.toFixed(2) * 100) + "%";
        let testResult;
        let label;
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
        // 이미지 테스트 결과
        let result = document.querySelector(".result");
        result.innerText = testResult;
        result.style.display = "block";

        // 남자 바람상 특징 확인 버튼
        let viewMenBtn = document.querySelector(".view__more__men");
        viewMenBtn.style.display = "block";
        
        // 결과 컨테이너에 담아준다.
        resultContainer.childNodes[i].innerHTML = label + resultProbability;
        showShareBtn(); // SNS 공유버튼
        tryAgainBtn();  // 재시도 버튼
      } else {
        // 만약 0번 인덱스가 badmen 또는 goodmen이 아닐 경우 
        // 즉 얼굴이 제대로 안나오거나 여자사진이 올라온 경우 재시도 유도
        if (i === 0) {
          alert("얼굴이 잘 나온 다른 사진으로 재시도 해주세요");
          tryAgainBtn();
          break;
        }
        continue;
      }
    }
  }
  // 여자일 경우
  else {
    for (let i = 0; i < maxPredictions; i++) {
      if (
        prediction[i].className === "badwomen" ||
        prediction[i].className === "goodwomen"
      ) {
        // 실수값으로 나온 결과를 백분율로 바꿔준다.
        const resultProbability = Math.round(prediction[i].probability.toFixed(2) * 100) + "%";
        let testResult;
        let label;
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
        // 이미지 테스트 결과
        let result = document.querySelector(".result");
        result.innerText = testResult;
        result.style.display = "block";
        
        // 여자 바람상 특징 확인 버튼
        let moreBtn = document.querySelector(".view__more__women");
        moreBtn.style.display = "block";

        // 결과를 컨테이너에 담아준다.
        resultContainer.childNodes[i].innerHTML = label + resultProbability;
        showShareBtn();
        tryAgainBtn();
      } else {
        // 만약 0번 인덱스가 badmen 또는 goodmen이 아닐 경우 
        // 즉 얼굴이 제대로 안나오거나 남자사진이 올라온 경우 재시도 유도
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

