import Member from "../Models/MemberModels.js";

// function get All Member
export const getAllMember = async (req, res) => {
  try {
    const response = await Member.findAll({
      attributes: ["code", "name"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// function get member by code
export const getMemberByCode = async (req, res) => {
  try {
    const code = req.params.code;
    const member = await Member.findOne({ where: { code: code } });
    if (!member) {
      return res.status(404).json({ msg: "Member not found" });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// function create member
export const createMember = async (req, res) => {
  const { code, name } = req.body;
  if (!code || !name) {
    return res.status(400).json({ msg: "Code and name are required" });
  }
  try {
    const existingMember = await Member.findOne({ where: { code: code } });
    if (existingMember) {
      return res.status(400).json({ msg: "Member already exists" });
    }
    await Member.create({
      code: code,
      name: name,
    });
    res.status(201).json({ msg: "Member Created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
// function delete user
export const deleteMember = async (req, res) => {
  const member = await Member.findOne({
    where: {
      code: req.params.code,
    },
  });
  if (!member) return res.status(400).json({ msg: "Member not found" });
  try {
    await member.destroy({
      where: {
        code: req.params.code,
      },
    });
    res.status(200).json({ msg: "Member Deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
