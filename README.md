# Shigatsutube

Cloning Youtube with VanillaJS and NodeJS

## Demo

[ShigatsuTube](https://enigmatic-spire-78020.herokuapp.com/)

## Preview

![Preview1](preview1.PNG)

![Preview2](preview2.PNG)

![Preview3](preview3.PNG)

## Technology Stack

| Frontend |       Technology        | Where  |
| :------: | :---------------------: | :----: |
|    01    |      Pug(Template)      | views  |
|    02    |        SCSS(CSS)        | assets |
|    03    |       JavaScript        | views  |
|    04    |        AJAX(API)        | assets |
|    05    | Webpack(Module Bundler) | static |

| Backend |       Technology       |     Where      |
| :-----: | :--------------------: | :------------: |
|   01    |     NodeJS(Server)     |     app.js     |
|   02    |  ExpressJS(Framework)  |     app.js     |
|   03    |   MongoDB(DataBase)    |     db.js      |
|   04    |   Mongoose(DataBase)   |     db.js      |
|   05    | Passport(Authenticate) |  passport.js   |
|   06    |    AWS S3(Storage)     | middlewares.js |
|   07    |   Heroku(Distribute)   |  package.json  |

## Pages

- [x] Home `1️⃣The Latest Video` `2️⃣The Best View Video` `3️⃣Uploaded Videos`

- [x] Join `Local Sign Up` + `Social Sign Up`

- [x] Login `Local Sign In` + `Social Sign In`

- [x] Search

- [x] Me Detail

- [x] User Detail

- [x] Edit Profile

- [x] Change Password

- [x] Upload `You can upload single video at once` + `You can upload record video!`

- [x] Video Detail `1️⃣Like or Dislike Video` `2️⃣Comment & Reply in Realtime~` `3️⃣Comment & Reply Heart` `4️⃣Flash Message & ModalBlock`

- [x] Edit Video

## Directory Structure

```
build
node_modules
src
|-- assets
|   |-- js
|   |   |-- addComment.js
|   |   |-- addReplyComment.js
|   |   |-- deleteComment.js
|   |   |-- deleteReply.js
|   |   |-- editComment.js
|   |   |-- editReplyComment.js
|   |   |-- heartComment.js
|   |   |-- heartReplyComment.js
|   |   |-- likeVideo.js
|   |   |-- main.js
|   |   |-- modalBlock.js
|   |   |-- notificationModal.js
|   |   |-- videoBlock.js
|   |   |-- videoPlayer.js
|   |   |-- videoRecorder.js
|   |-- scss
|   |   |-- config
|   |   |   |-- _variables.scss
|   |   |   |-- reset.scss
|   |   |-- pages
|   |   |   |-- home.scss
|   |   |   |-- search.scss
|   |   |   |-- userDetail.scss
|   |   |   |-- videoDetail.scss
|   |   |-- partials
|   |   |   |-- comment.scss
|   |   |   |-- commentBlock.scss
|   |   |   |-- flashMessage.scss
|   |   |   |-- footer.scss
|   |   |   |-- form.scss
|   |   |   |-- header.scss
|   |   |   |-- modalBlock.scss
|   |   |   |-- replyBlock.scss
|   |   |   |-- socialLogin.scss
|   |   |   |-- videoPlayer.scss
|   |   |   |-- videoRecorder.scss
|   |   |-- main.scss
|   |   |-- styles.scss
|-- controllers
|   |-- commentController.js
|   |-- replyController.js
|   |-- userController.js
|   |-- videoController.js
|-- modles
|   |-- Comment.js
|   |-- Reply.js
|   |-- User.js
|   |-- Video.js
|-- routers
|   |-- apiRouter.js
|   |-- globalRouter.js
|   |-- userRouter.js
|   |-- videoRouter.js
|-- static
|   |-- main.js
|   |-- styles.js
|-- uploads
|   |-- avatars
|   |-- videos
|-- views
|   |-- layouts
|   |   |-- main.pug
|   |   |-- mainGrey.pug
|   |   |-- subMain.pug
|   |   |-- subMainBlack.pug
|   |-- mixins
|   |   |-- commentBlock.pug
|   |   |-- flashMessage.pug
|   |   |-- modalBlock.pug
|   |   |-- replyBlock.pug
|   |   |-- videoBlock.pug
|   |   |-- videoPlayer.pug
|   |-- partials
|   |   |-- footer.pug
|   |   |-- footerGrey.pug
|   |   |-- header.pug
|   |   |-- socialLogin.pug
|   |-- changePassword.pug
|   |-- editProfile.pug
|   |-- editVideo.pug
|   |-- home.pug
|   |-- join.pug
|   |-- login.pug
|   |-- search.pug
|   |-- upload.pug
|   |-- userDetail.pug
|   |-- videoDetail.pug
|-- app.js
|-- db.js
|-- init.js
|-- middlewares.js
|-- passport.js
|-- routes.js
|-- webpack.config.js

```

**[⬆ Back to Top](#Shigatsutube)**

## Install and Setup

Git this repository. You will need `node` and `npm` installed globally on your device!<br><br>

1. `git clone https://github.com/ShigatsuEl/shigatsutube-clone.git`

2. `npm install`

If you are Window user, you need to change a few more

1. Go to pakage.json and fixed `"script": {"prebuild": "rm -rf build"}` -> `"script": {"prebuild": " rd /s /q build"}`

2. Go to pakage.json and fixed `"script": {"copyAll": "cp -R src/static build && cp -R src/views build"}` -> `"script": {"copyAll": "xcopy [option] src/static build && xcopy [option] src/views build"}`

## Run

To start Server:

`npm start`

## Reflection

프로젝트를 통해 느낌점을 정리한다.

### Client Side vs Server Side

프로젝트를 시작하기 전까지 HTML / CSS와 조금의 자바스크립트 개념을 가지고 있었다.<br>

그렇기 때문에 매우 정적인 웹사이트를 구현하는 것이 가능했지만 웹사이트 내에서 유저가 할 수 있는 것은 아무것도 없었다는 문제점을 가지게 되었다.<br>

이러한 문제점을 해결하기 위해서, 서버를 구축해야 할 필요가 있으며 데이터베이스를 다뤄보는 경험이 필요했다.<br>

하지만 HTML과 CSS 정도까지 다룰 줄 아는 선에서 서버라는 개념이 무엇인지 알기 어려웠으며 역할마저 모르고 개발을 진행했다.<br>

때문에 개발의 전체적인 사이클을 지나오고서야 내가 무엇을 하고 있었다는지 실감할 수 있었다.<br>

모든 시작은 클라이언트(유저)로부터 시작되며 서버에 리퀘스트(요청)을 보내게 되면 서버 측은 그에 알맞은 리스폰스(응답)을 하게 된다.<br>

그리고 우리가 앞에서 보여지는 모든 것들은 서버로부터 가공되는 데이터로부터 나오는 응답을 클라이언트의 상황에 알맞게 배치되어 제공되는 것이다.<br>

그렇기 때문에 유저가 서버로 요청하는 모든 것들은 모두 request 객체에 담겨있으며 반대로 서버가 유저에게 제공하는 것 역시 response 객체에 대부분이 포함되어 있을 확률이 크다.<br>

이와 같은 전체적인 흐름을 이해한 후부터 프론트로부터 데이터를 요청 받는 방법을 알고 백으로부터 데이터를 제공받는 방법을 알 수 있게 되었으며 모든 CRUD를 할 수 있게 되었다.<br>

이번 프로젝트를 통해 알게된 가장 값진 경험이 된 것 같다.<br>

### Core | ES6

프로젝트가 끝나고 나서야 느끼는 점이지만 내가 범했던 실수와 대부분의 모든 삽질은 자바스크립트가 미숙한 탓이었다.<br>

ES6 이상의 문법을 사용하기 위해 바벨과 웹팩을 사용했지만 ES6를 어떻게 사용하는지 대부분 몰랐었다.<br>

지나고 나서야 느끼는 바이지만 위와 비슷하게 비동기가 무엇인지 모르면서 async await를 사용하거나 promise를 사용해보지 않았으면서 es6기능인 async await를 사용하려고 했던 것이 문제점이었다.<br>

그래도 이러한 삽질들이 내가 다시 자바스크립트를 깊숙히 공부할 수 있게 되는 발판이 된 것 같다.<br>

혹시라도 누군가 자바스크립트의 스코프, 클로저, 호이스팅 등과 같은 개념을 모른채 위 프로젝트를 클론코딩 하려고 한다면 자바스크립트의 핵심을 한 번 공부한 후에 해보라고 추천드리고 싶다.<br>

그렇지 않으면 언젠가 만나게 될 이유를 알 수 없는 에러와 고치기 위한 오랜 시간의 삽질로 번아웃이 올지도 모른다고 말이다..<br>

개인적으로 You don't know JS라는 책을 추천한다.<br>

### React vs Javascript

Shigatsutube의 주된 기능들은 ajax를 사용해 데이터의 일부분을 비동기방식으로 작업하고, 바닐라 자바스크립트를 통해 faking처리를 해서 페이지가 새로고침되지 않게 일부분만 실시간으로 변경되는 작업을 하고 있다.<br>

추후에 리액트를 사용해보면서 이 방법이 얼마나 귀찮고 힘든 것인지를 알게 되었다.<br>

프로젝트 기능 중에 댓글에 답글 달기와 같은 기능을 만든 기억이 있는데 바닐라 자바스크립트로 구현할 때는 여러 DOM 엘리먼트를 정의해서 원하는 상황이 되도록 많은 줄의 코드를 적어야 했지만 리액트는 단지 JSX를 렌더링하면 될 뿐이다.<br>

아마 리액트부터 했었다면 바닐라 자바스크립트로만 프론트를 구현한다는 것이 얼마나 힘든 작업인지 알지 못했을 듯 하다.<br>

**[⬆ Back to Top](#Shigatsutube)**

## Improvement

개선해야 할 부분과 부족한 부분을 다뤄본다.

### Spadework

개발을 하면서 느끼게 된 점은 문제에 직면하게 되었을 때 그 문제를 해결하기 위해 너무 오랜시간 동안 고민을 한다는 것이다.<br>

가장 좋은 방법은 시간을 제한하고 해결하지 못했을 경우, 문서를 찾아보는 습관을 들이고 서칭 방법을 고민해보는 것이다.<br>

무엇을 만들면서 공식 문서를 제대로 활용하지 못해본 것이 가장 큰 고착상태로 밀어넣는 원인이 된다.<br>

### Record

프로젝트를 진행하면서 많은 문제와 직면했고 모두 해결해 나갔지만 시간이 한참 흐르고 나서 내가 무엇을 해결했었는지 인상깊게 기억나는 점이 몇가지 되지 않는다.<br>

이미 알고 있겠지만 이제부터는 개발을 하면서 어려웠던 점을 기록해나가지 않으면 내가 무엇을 개발했는지 어떤 점을 고민했었는지 공유하기 힘들 것이라고 예상된다.<br>

그러므로 앞으로 개발하면서 발생하는 문제점과 해결방법을 기술해 다른 개발자분들에게도 도움이 되도록 노력해보는 것이 어떨까한다.<br>

### Pagination

Shigatsutube를 배포하고 나서 들었던 아쉬운 점은 Pagination이 없다는 점이다.<br>

query를 받아와 mongo에서 db를 받아와 프론트로 보내주면 될 것 같은데 시간이 되면 한 번 해보도록 하자.<br>

**[⬆ Back to Top](#Shigatsutube)**

## Move Forward

### JavaScript30

이번 유튜브 챌린지를 통해 자바스크립트를 정말로 많이 배웠지만 아직까지는 자바스크립트가 친근하게 다가오지 않는 듯 하다.<br>

따라서 Wesbos의 [JavaScript30])(https://javascript30.com/) 프로젝트를 통해 많은 자바스크립트 코드를 작성해 볼 예정이다.<br>

### 33 Concepts every JavaScript developer should know

자바스크립트 코드를 작성할 줄 알지만 자바스크립트 에러가 왜 발생하는지 모르는 것.<br>

이것은 내가 자바스크립트 엔진이 동작하는 원리와 여러가지 중요한 코어 개념들을 모르기 때문일 확률이 크다.<br>

이 자바스크립트 33가지 개념은 필수는 아니지만 내가 자바스크립트가 어떻게 작동하는지 더 깊게 이해할 수 있게 도와줄 초석이 되어줄 거라 믿는다.<br>
[33 Concepts every JavaScript developer should know](https://github.com/yjs03057/33-js-concepts)

### Dream Coding JS Foundation

위의 33가지 개념과 같이 하면 좋을 것 같다는 생각이 들어 추가했다.<br>
1주 정도의 기간을 갖고 완주하는 것을 목표로 하고 있으며 완주하는 후로 JavaScript30 챌린지에 도전할 생각이다.<br>

## Finally

프로젝트를 진행하는 시점에서 마무리하는 마지막까지 제일 많이 들었던 생각은 자바스크립트를 너무 틈새사이로 알고 있는 것들이 많다는 것.<br>

많은 프로젝트를 경험해보면서 자바스크립트 기본기가 탄탄해질 수 있도록 노력하자.<br>
