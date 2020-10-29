# Shigatsuel\_\_Shigatsutube

Cloning Youtube with VanillaJS and NodeJS

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
