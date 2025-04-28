import { Note, User } from "../models/index.js";

export const getNotes = async (req, res) => {
    try {
      const { userId } = req.params;
      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(404).json({ success: false, error: "User not found" });
      }
      if (!userId) {
        return res
          .status(400)
          .json({ success: false, error: "User ID is required" });
      }
      // Remove the -_id from select to include the ID in response
      const notes = await Note.find({ userId })
        .select("message color _id")
        .lean();
      console.log(notes);
      if (!notes) {
        return res.status(404).json({ success: false, error: "Notes not found" });
      }
      return res.status(200).json({
        success: true,
        message: "Notes fetched successfully",
        data: { userId, notes },
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  };
  
export const createNote = async (req, res) => {
  try {
    const { userId } = req.params;
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    const { message, color } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, error: "User ID is required" });
    }
    if (!message || !color) {
      return res
        .status(400)
        .json({ success: false, error: "Message/color is required" });
    }
    const newnode = new Note({ message, color, userId: userId });
    await newnode.save();
    return res.status(200).json({
      success: true,
      message: "Note created successfully",
      data: newnode,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export const updateNote = async (req, res) => {
    try {
      const { userId, noteId } = req.params;
      const { message, color } = req.body;
  
      if (!userId || !noteId) {
        return res
          .status(400)
          .json({ success: false, error: "User ID and Note ID are required" });
      }
      if (!message || !color) {
        return res
          .status(400)
          .json({ success: false, error: "Message and color are required" });
      }
  
      const updatedNote = await Note.findOneAndUpdate(
        { _id: noteId, userId },
        { message, color },
        { new: true }
      ).select("_id message color");
  
      if (!updatedNote) {
        return res.status(404).json({ success: false, error: "Note not found" });
      }
  
      return res.status(200).json({
        success: true,
        message: "Note updated successfully",
        data: updatedNote
      });
    } catch (error) {
      console.error("Update error:", error);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  };

export const deleteNote = async (req, res) => {
  try {
    const { userId, noteId } = req.params;
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    if (!noteId) {
      return res
        .status(400)
        .json({ success: false, error: "Note ID is required" });
    }
    const note = await Note.findByIdAndDelete(noteId);
    if (!note) {
      return res.status(404).json({ success: false, error: "Note not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: note,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
