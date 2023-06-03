import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export enum Category {DAILY = "Daily", WEEKLY = "Weekly"};

@Schema({
  timestamps: true,
})
export class Trending {
  @Prop()
  backdrop_path: string;

  @Prop()
  genre_ids: string[];

  @Prop()
  category: Category;

  @Prop()
  orginal_language: string;

  @Prop()
  orginal_title: string;

  @Prop()
  overview: string;

  @Prop()
  poster_path: string;

  @Prop()
  release_date: Date;

  @Prop()
  title: string;

  @Prop()
  vote_average: number;
}

export const TrendingSchema = SchemaFactory.createForClass(Trending)