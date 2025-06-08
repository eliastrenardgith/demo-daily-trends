import mongoose, { Schema } from 'mongoose';

export interface IFeed extends Document {
  url: string;
  newsPaperUrl: string;
  title: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

const FeedSchema: Schema = new Schema(
  {
    /**
     * URL of the news.
     */
    url: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Feeds WILL BE UNIQUE, to keep integrity avoiding unnecessary redundancy and duplications.
    },

    /**
     * URL of the news.
     */
    newsPaperUrl: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * News title
     */
    title: { type: String, required: true },

    /**
     * News summary
     */
    summary: { type: String, required: false },
  },
  { timestamps: true },
);

export default mongoose.model<IFeed>('Feed', FeedSchema);
