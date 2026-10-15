import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAnalyticsEvent extends Document {
  eventType: "page_view" | "button_click" | "section_engagement";
  eventName: string;
  pagePath: string;
  elementId?: string;
  sectionId?: string;
  durationMs?: number;
  sessionId: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const AnalyticsEventSchema = new Schema<IAnalyticsEvent>(
  {
    eventType: {
      type: String,
      required: true,
      enum: ["page_view", "button_click", "section_engagement"],
      index: true,
    },
    eventName: { type: String, required: true },
    pagePath: { type: String, required: true, index: true },
    elementId: { type: String },
    sectionId: { type: String },
    durationMs: { type: Number, default: 0 },
    sessionId: { type: String, required: true, index: true },
    timestamp: { type: Date, default: Date.now, index: true },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
  }
);

// Helpful compound indexes for queries
AnalyticsEventSchema.index({ eventType: 1, timestamp: -1 });
AnalyticsEventSchema.index({ sectionId: 1, eventType: 1 });
AnalyticsEventSchema.index({ elementId: 1, eventType: 1 });

export const AnalyticsEvent: Model<IAnalyticsEvent> =
  mongoose.models.AnalyticsEvent ||
  mongoose.model<IAnalyticsEvent>("AnalyticsEvent", AnalyticsEventSchema);
