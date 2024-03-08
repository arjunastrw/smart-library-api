import Books from "../Models/BooksModels.js";

// function get all Books
export const getAllBooks = async (req, res) => {
  try {
    const response = await Books.findAll({
      attributes: ["code", "title", "author", "stock"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// function get books by code
export const getBooksByCode = async (req, res) => {
  try {
    const code = req.params.code;
    const books = await Books.findOne({ where: { code: code } });
    if (!books) {
      return res.status(404).json({ msg: "Books not found" });
    }
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// function create Books
export const createBooks = async (req, res) => {
  const { code, title, author, stock } = req.body;
  if (!code || !title || !author || !stock) {
    return res
      .status(400)
      .json({ msg: "Code, title, author and stock are required" });
  }
  try {
    const existingBooks = await Books.findOne({
      where: { code: code },
    });
    if (existingBooks) {
      return res.status(400).json({ msg: "Books already exists" });
    }
    await Books.create({
      code: code,
      title: title,
      author: author,
      stock: stock,
    });
    res.status(201).json({ msg: "Books Created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// function Update Stock Books
export const updateStockBooks = async (req, res) => {
  try {
    const book = await Book.findOne({
      where: {
        code: req.params.code,
      },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.stock = req.body.stock;
    await book.save();

    return res
      .status(200)
      .json({ message: "Stock Updated Successfully", book });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// function delete books
export const deleteBooks = async (req, res) => {
  const books = await Books.findOne({
    where: {
      code: req.params.code,
    },
  });
  if (!books) return res.status(400).json({ msg: "Books not found" });
  try {
    await books.destroy({
      where: {
        code: req.params.code,
      },
    });
    res.status(200).json({ msg: "Books Deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
