import Member from "../Models/MemberModels";

// function get all member
export const getAllMember = async () => {
  try {
    const members = await Member.findAll();
    return members;
  } catch (error) {
    throw new Error("Failed to fetch members");
  }
};

// fucntion get member by id
export const getMemberByCode = async (code) => {
  try {
    const member = await Member.findOne({
      where: {
        code: code,
      },
    });
    if (!member) {
      throw new Error("Member not found");
    }
    return member;
  } catch (error) {
    throw new Error("Failed to fetch member");
  }
};

// function create member
export const createMember = async (data) => {
  try {
    const existingMember = await Member.findOne({ where: { code: data.code } });
    if (existingMember) {
      throw new Error("Member already exists");
    }
    const newMember = await Member.create(data);
    return newMember;
  } catch (error) {
    throw new Error("Failed to create member");
  }
};

// fucntion delete member
export const deleteMember = async (code) => {
  try {
    const member = await Member.findOne({
      where: {
        code: code,
      },
    });
    if (!member) {
      throw new Error("Member not found");
    }
    await member.destroy();
    return true;
  } catch (error) {
    throw new Error("Failed to delete member");
  }
};
