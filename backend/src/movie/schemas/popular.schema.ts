import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Popular {
  @Prop()
  backdrop_path: string;

  @Prop()
  genre_ids: string[];

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

export const PopularSchema = SchemaFactory.createForClass(Popular)