import mongoose from "mongoose";
const { Schema } = mongoose;
import { EventModel } from "models/client/event.model";

const eventSchema = new Schema<EventModel>(
  {
    time: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    is_active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Event ||
  mongoose.model("Event", eventSchema, "events");
