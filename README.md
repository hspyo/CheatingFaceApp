# 바람예보
### 인공지능 바람기 테스트 어플리케이션 
✅ Website ->  www.cheatingface.tk <br/>
✅ GooglePlayStore -> https://play.google.com/store/apps/details?id=com.spyohan.cheatingface

# SCREEN SHOTS
<p width="100%">
  <img width="33%" height= "550px" alt="스크린샷 2020-09-09 오후 3 10 53" src="https://user-images.githubusercontent.com/53952734/93163694-b38d9200-f752-11ea-9f2d-75a7f3bfaff3.png">
  <img width="33%" height= "550px" alt="스크린샷 2020-09-09 오후 2 59 52" src="https://user-images.githubusercontent.com/53952734/93163444-1b8fa880-f752-11ea-93c0-ed23f7f02c61.png">
  <img width="33%" height= "550px" alt="스크린샷 2020-09-09 오후 3 10 53" src="https://user-images.githubusercontent.com/53952734/93163449-1fbbc600-f752-11ea-84e0-a5bd2a6b677c.png">
 </p>

# 기획의도
"연애를 시작하기 전, 상대방의 바람기를 미리 알 수 있다면?" 한 문장의 호기심으로 프로젝트가 시작되었습니다.

# 기술 스택
* HTML
* CSS
* JavaScript
* Teachable Machine (AI Tool)
* Expo (구글스토어 출시를 위해 Webview로 변환)

# 주요 기능

     1. AI 얼굴 바람기 테스트 측정
     2. 이미지 업로더 폼
     3. 로딩 중 처리
     4. 반응형 웹앱 디자인

# 기타 사항

     1. 비동기 처리
     2. 구글 플레이 스토어 출시 (2020.09.09 승인)
     3. 첫 다운로드 달성 (2020.09.14)
     4. 검색엔진 최적화 SEO

# 페이지

 ✔️ Home
<br/> ✔️ About
<br/> ✔️ Men (남자 바람기 얼굴 상세페이지)
<br/> ✔️ Women (여자 바람기 얼굴 상세페이지)


# Teachable Machine Modeling

1. 남녀 바람기 관상에 특징에 대해 조사
2. 바람기 특징에 해당되는 남녀 연예인 각각 10명씩 총 20명을 선정
3. 네이버를 바탕으로 웹크롤링(파이썬이용)을 하여 2000장 사진을 수집
4. 2000장 중 얼굴이 잘 안나오거나 배경위주의 사진들을 제거
5. 클렌징된 데이터들을 이용해 Teachable Machine을 학습
6. 학습된 JS 모듈을 받아 코드를 커스텀하여 활용 (Webcam 형식을 -> 파일업로드 형식으로)
