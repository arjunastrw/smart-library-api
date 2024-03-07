import Member from "../Source/Models/MemberModels.js";
import { getAllMember } from "../Source/Controllers/MemberControllers.js";

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

jest.mock("../Source/Models/MemberModels.js", () => ({
  findAll: jest.fn(),
}));

describe("getAllMember function", () => {
  // Get All Member Success
  test("should return all members", async () => {
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
  test("should handle error when fetching members", async () => {
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
