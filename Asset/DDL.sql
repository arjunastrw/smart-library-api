CREATE TABLE Book (
                      code VARCHAR(10) PRIMARY KEY,
                      title VARCHAR(255),
                      author VARCHAR(255),
                      stock INT
);

CREATE TABLE Member (
                        code VARCHAR(10) PRIMARY KEY,
                        name VARCHAR(255)
);

CREATE TABLE Loan (
                      id INT PRIMARY KEY AUTO_INCREMENT,
                      member_code VARCHAR(10),
                      book_code VARCHAR(10),
                      loan_date DATE,
                      return_date DATE,
                      penalty_status BOOLEAN,
                      FOREIGN KEY (member_code) REFERENCES Member(code),
                      FOREIGN KEY (book_code) REFERENCES Book(code)
);
