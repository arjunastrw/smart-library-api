import Member from "../Source/Models/MemberModels.js";
import {
  getAllMember,
  getMemberByCode,
  createMember,
  deleteMember,
} from "../Source/Controllers/MemberControllers.js";

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

jest.mock("../Source/Models/MemberModels.js", () => ({
  // function get All Member
  findAll: jest.fn(),
  // function get member by code
  findOne: jest.fn(),
  // function create member
  create: jest.fn(),
  // function delete member
  delete: jest.fn(),
}));

// unit test get all member
describe("getAllMember function", () => {
  // Get All Member Success
  test("return all members success", async () => {
    // Data yang akan di tampilkan untuk function findAll
    const mockMembers = [
      { code: "001", name: "Member 1" },
      { code: "002", name: "Member 2" },
    ];
    // Mengatur implementasi mock dari fungsi findAll untuk mengembalikan data mockMembers
    Member.findAll.mockResolvedValue(mockMembers);

    // Memanggil fungsi getAllMember dengan mock request dan response
    await getAllMember({}, mockResponse);

    // Memastikan status response adalah 200
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    // Memastikan response JSON berisi data yang diharapkan
    expect(mockResponse.json).toHaveBeenCalledWith(mockMembers);
  });

  // Get All Member Failed
  test("return all members failed", async () => {
    // Mock error untuk fungsi findAll
    const mockError = new Error("Failed to fetch members");
    // Mengatur implementasi mock dari fungsi findAll untuk melempar error
    Member.findAll.mockRejectedValue(mockError);

    // Memanggil fungsi getAllMember dengan mock request dan response
    await getAllMember({}, mockResponse);

    // Memastikan status response adalah 500
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    // Memastikan response JSON berisi pesan error yang diharapkan
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError.message });
  });
});

// unit test get member by code
describe("getMemberByCode function", () => {
  test("return member by code success", async () => {
    const mockMember = { code: "001", name: "Member 1" };
    Member.findOne.mockResolvedValue(mockMember);

    const mockRequest = { params: { code: "001" } };

    await getMemberByCode(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockMember);
  });

  test("return member where not found", async () => {
    Member.findOne.mockResolvedValue(null);

    const mockRequest = { params: { code: "001" } };

    await getMemberByCode(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: "Member not found" });
  });

  test("return member by code failed", async () => {
    const mockError = new Error("Internal Server Error");
    Member.findOne.mockRejectedValue(mockError);

    const mockRequest = { params: { code: "001" } };

    await getMemberByCode(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError.message });
  });
});

// unit test create user
describe("createMember function", () => {
  test("return create member success", async () => {
    const mockRequest = {
      body: { code: "001", name: "Member 1" },
    };

    Member.findOne.mockResolvedValue(null);
    Member.create.mockResolvedValue();

    await createMember(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: "Member Created" });
  });

  test("return error when field is empty", async () => {
    const mockRequest = {
      body: { code: "001" },
    };

    await createMember(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: "Code and name are required",
    });
  });

  test("return error when member already exists", async () => {
    const mockRequest = {
      body: { code: "001", name: "Member 1" },
    };

    Member.findOne.mockResolvedValue({});

    await createMember(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: "Member already exists",
    });
  });

  test("return create member failed", async () => {
    const mockRequest = {
      body: { code: "001", name: "Member 1" },
    };

    const mockError = new Error("Internal Server Error");
    Member.findOne.mockRejectedValue(mockError);

    await createMember(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: mockError.message });
  });
});

// unit test delete member
describe("deleteMember", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("return error if member not found", async () => {
    Member.findOne.mockResolvedValue(null);

    const req = {
      params: {
        code: "M001",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await deleteMember(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: "Member not found" });
  });

  it("return member deleted success", async () => {
    const member = {
      code: "M001",
      destroy: jest.fn(),
    };
    Member.findOne.mockResolvedValue(member);

    const req = {
      params: {
        code: "M001",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await deleteMember(req, res);

    expect(Member.findOne).toHaveBeenCalledWith({
      where: {
        code: "M001",
      },
    });
    expect(member.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: "Member Deleted" });
  });

  it("return member deleted failed", async () => {
    const member = {
      code: "M001",
      destroy: jest.fn(() => Promise.reject(new Error("Test Error"))),
    };
    Member.findOne.mockResolvedValue(member);

    const req = {
      params: {
        code: "M001",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await deleteMember(req, res);

    expect(Member.findOne).toHaveBeenCalledWith({
      where: {
        code: "M001",
      },
    });
    expect(member.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: "Test Error" });
  });
});
