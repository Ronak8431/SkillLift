import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
     resume: {
      url: String,
      public_id: String,

    },
    cgpa: {
        type: Number,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }
});

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },

    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },

    students: [studentSchema] 
}, { timestamps: true });

export const Application = mongoose.model("Application", applicationSchema);
