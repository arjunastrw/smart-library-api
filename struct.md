| Backend2
├── src
│ ├── controllers
│ │ ├── memberController.js
│ │ ├── bookController.js
│ │ └── LoanController.js
│ ├── models
│ │ ├── memberModel.js
│ │ ├── bookModel.js
│ │ └── LoanModel.js
│ ├── routes
│ │ ├── memberRoutes.js
│ │ ├── bookRoutes.js
│ │ └── LoanRoutes.js
│ ├── services
│ │ ├── memberService.js
│ │ ├── bookService.js
│ │ └── LoanService.js
│ ├── app.js
│ └── swagger.json
├── config
│ └── database.js
├── migrations
├── seeders
├── tests
└── index.js

depedencies yang di butuhkan
npm install express mysql2 sequelize swagger-ui-express express-session dotenv
npm install connect-session-sequelize
npm install cors
npm install swagger-ui-express swagger-jsdoc
