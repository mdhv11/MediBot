import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
    {
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor", // Ensure that "Doctor" matches the name of the Doctor model
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Ensure that "User" matches the name of the User model
            required: true,
        },
        ticketPrice: { type: String, required: true },
        appointmentDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "cancelled"],
            default: "pending",
        },
        isPaid: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
