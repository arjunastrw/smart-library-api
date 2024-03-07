# Smart Library API
##### Ini adalah Application Programming Interface sederhana untuk pengelolaan Perpustakaan


## Install API
````
git clone https://github.com/arjunastrw/smart-library-api
````
## Pindah Directory
````
cd smart-library-api
````
##  Depedencies yang di butuhkan
Jika ingin langsung install semua depedencies yang di butuhkan maka copy command berikut
````
npm install express mysql2 sequelize swagger-ui-express dotenv cors swagger-jsdoc jest supertest @babel/preset-typescript --save
````
##### express
Framework web untuk Node.js yang memungkinkan untuk membangun aplikasi web dengan mudah dan cepat.
````
npm install express
````
##### mysql2
Client MySQL yang dibuat di atas node-mysql dengan dukungan untuk Promise.
````
npm install mysql2
````
##### sequelize
ORM (Object-Relational Mapping) membuat aktivitas dengan database lebih abstrak tanpa menggunakan query native.
````
npm install sequelize
````
##### swagger-ui-express
Middleware Express yang menyajikan dokumen Swagger UI yang dihasilkan secara otomatis untuk API Express Anda.
````
npm install swagger-ui-express
````
##### dotenv
Modul untuk memuat variabel lingkungan dari file `.env` ke dalam `process.env`.
````
npm install dotenv
````
##### cors
Middleware Express yang memungkinkan permintaan lintas domain.
````
npm install cors
````
##### swagger-jsdoc
Dokumentasi Swagger secara otomatis dari komentar JSDoc di kode JavaScript.
````
npm install swagger-jsdoc
````
##### jest
Framework pengujian JavaScript yang kuat dengan fokus pada kesederhanaan.
````
npm install --save-dev jest
````
##### supertest
Pustaka pengujian HTTP untuk pengujian otomatis HTTP.
````
npm install --save-dev supertest
````
##### @babel/preset-typescript
````
npm install --save-dev @babel/preset-typescript
````
## Untuk Melihat documentasi API
Akses endpoint ini setelah semua depedencies di install untuk melihat dokumentasi API.
````
/api/docs
````

# Mock Data 
- Buku
````
[
    {
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1
    },
    {
        code: "SHR-1",
        title: "A Study in Scarlet",
        author: "Arthur Conan Doyle",
        stock: 1
    },
    {
        code: "TW-11",
        title: "Twilight",
        author: "Stephenie Meyer",
        stock: 1
    },
    {
        code: "HOB-83",
        title: "The Hobbit, or There and Back Again",
        author: "J.R.R. Tolkien",
        stock: 1
    },
    {
        code: "NRN-7",
        title: "The Lion, the Witch and the Wardrobe",
        author: "C.S. Lewis",
        stock: 1
    },
]
````
- Member
````
[
    {
        code: "M001",
        name: "Jhon",
    },
    {
        code: "M002",
        name: "Jeni",
    },
    {
        code: "M003",
        name: "Juni",
    },
]
````
