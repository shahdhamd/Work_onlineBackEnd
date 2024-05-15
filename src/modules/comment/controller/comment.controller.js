
import { modelModel } from "../../../../DB/model/model.js";

export const addComment = async (req, res) => {
    try {
        const currentDate = new Date(); // Rename Date variable to currentDate
        console.log('helloooo')
        const { id, servicesId } = req.params;
        const { comment } = req.body;
        console.log(comment)
        if (!comment) {
            return res.status(400).json({ message: "Comment is required" });
        }
        req.body.madeby = req.user._id;
        const findModule = await modelModel.findById(id);
        if (!findModule) {
            return res.status(404).json({ message: "Module not found" });
        }
        const serviceIndex = findModule.servicingUser.findIndex(service => service._id.toString() === servicesId);
        // console.log(serviceIndex)
        if (serviceIndex === -1) {
            return res.status(404).json({ message: "Service not found in the model" });
        }

        findModule.servicingUser[serviceIndex].comments.push({
            text: comment,
            madeby: req.user._id,
            DateAddComment: currentDate
        });

        await findModule.save();

        return res.status(200).json({ message: "Comment added successfully", findModule });
    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).json({ message: `Error adding comment: ${error.message}` });
    }
};


export const deletComment = async (req, res) => {
    try {
        const { id, servicesId, commentId } = req.params;

        const findModule = await modelModel.findById(id);

        if (!findModule) {
            return res.status(404).json({ message: "Module not found" });
        }

        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: "You must be logged in to delete the comment" });
        }

        const serviceIndex = findModule.servicingUser.findIndex(service => service._id.toString() === servicesId);

        if (serviceIndex === -1) {
            return res.status(404).json({ message: "Service not found in the model" });
        }

        const commentIndex = findModule.servicingUser[serviceIndex].comments.findIndex(comment => comment._id.toString() === commentId);

        if (commentIndex === -1) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (findModule.servicingUser[serviceIndex].comments[commentIndex].madeby.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this comment" });
        }

        findModule.servicingUser[serviceIndex].comments.splice(commentIndex, 1);

        await findModule.save();

        return res.status(200).json({ message: "Comment deleted successfully", findModule });
    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({ message: `Error deleting comment: ${error.message}` });
    }
};

export const showComment = async (req, res) => {
    try {
        const { id, servicesId } = req.params;
        const findModule = await modelModel.findById(id)

        if (!findModule) {
            return res.status(404).json({ message: "Module not found" });
        }

        const service = findModule.servicingUser.find(service => service._id.toString() === servicesId);

        if (!service) {
            return res.status(404).json({ message: "Service not found in the model" });
        }

        const comments = service.comments;

        return res.status(200).json({ comments });
    } catch (error) {
        console.error("Error retrieving comments:", error);
        return res.status(500).json({ message: `Error retrieving comments: ${error.message}` });
    }
};

