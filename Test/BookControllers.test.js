import Books from "../Source/Models/BooksModels.js";
import {
  getAllBooks,
  getBooksByCode,
  createBooks,
  updateStockBooks,
  deleteBooks,
} from "../Source/Controllers/BooksControllers.js";

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

jest.mock("../Source/Models/BooksModels.js", () => ({
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe("getAllBooks function", () => {
  test("should return all books successfully", async () => {
    const mockBooks = [
      { code: "001", title: "Book 1", author: "Author 1", stock: 10 },
      { code: "002", title: "Book 2", author: "Author 2", stock: 5 },
    ];
    Books.findAll.mockResolvedValue(mockBooks);

    await getAllBooks({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockBooks);
  });

  test("should handle error when fetching all books", async () => {
    const mockError = new Error("Failed to fetch books");
    Books.findAll.mockRejectedValue(mockError);

    await getAllBooks({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError.message });
  });
});

describe("getBooksByCode function", () => {
  test("return book by code successfully", async () => {
    const mockBooks = {
      code: "001",
      title: "Book 1",
      author: "Author 1",
      stock: 10,
    };
    Books.findOne.mockResolvedValue(mockBooks);

    const mockRequest = { params: { code: "001" } };

    await getBooksByCode(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockBooks);
  });

  test("return book where not found", async () => {
    Books.findOne.mockResolvedValue(null);

    const mockRequest = { params: { code: "001" } };

    await getBooksByCode(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: "Books not found" });
  });

  test("return book by code failed", async () => {
    const mockError = new Error("Internal Server Error");
    Books.findOne.mockRejectedValue(mockError);

    const mockRequest = { params: { code: "001" } };

    await getBooksByCode(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError.message });
  });
});

describe("createBooks function", () => {
  test("return create books success", async () => {
    const mockRequest = {
      body: { code: "001", title: "Book 1", author: "Author 1", stock: 10 },
    };

    Books.findOne.mockResolvedValue(null);
    Books.create.mockResolvedValue();

    await createBooks(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: "Books Created" });
  });

  test("return error when field is empty", async () => {
    const mockRequest = {
      body: { code: "001" },
    };

    await createBooks(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: "Code, title, author and stock are required",
    });
  });

  test("return create books failed", async () => {
    const mockRequest = {
      body: { code: "001", title: "Book 1", author: "Author 1", stock: 10 },
    };

    const mockError = new Error("Internal Server Error");
    Books.findOne.mockRejectedValue(mockError);

    await createBooks(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError.message });
  });
});

// describe("updateStockBooks function", () => {
//   test("should update stock successfully", async () => {
//     const mockBook = {
//       code: "001",
//       title: "Book 1",
//       author: "Author 1",
//       stock: 10,
//     };
//     const mockRequest = { params: { code: "001" }, body: { stock: 30 } };

//     Books.findOne.mockResolvedValue(mockBook);

//     await updateStockBooks(mockRequest, mockResponse);

//     expect(Books.findOne).toHaveBeenCalledWith({ where: { code: "001" } });
//     expect(mockBook.stock).toBe(30);
//     expect(mockBook.save).toHaveBeenCalled();

//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//     expect(mockResponse.json).toHaveBeenCalledWith({
//       message: "Stock Updated Successfully",
//       book: mockBook,
//     });
//   });
// });

describe("deleteBooks", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("return error if books not found", async () => {
    Books.findOne.mockResolvedValue(null);

    const req = {
      params: {
        code: "001",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await deleteBooks(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: "Books not found" });
  });

  it("return books deleted success", async () => {
    const book = {
      code: "001",
      destroy: jest.fn(),
    };
    Books.findOne.mockResolvedValue(book);

    const req = {
      params: {
        code: "001",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await deleteBooks(req, res);

    expect(Books.findOne).toHaveBeenCalledWith({
      where: {
        code: "001",
      },
    });
    expect(book.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: "Books Deleted" });
  });

  it("return books deleted failed", async () => {
    const book = {
      code: "001",
      destroy: jest.fn(() => Promise.reject(new Error("Delete Books Error"))),
    };
    Books.findOne.mockResolvedValue(book);

    const req = {
      params: {
        code: "001",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await deleteBooks(req, res);

    expect(Books.findOne).toHaveBeenCalledWith({
      where: {
        code: "001",
      },
    });
    expect(book.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: "Delete Books Error" });
  });
});
