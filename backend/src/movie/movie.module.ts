import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { PopularSchema } from './schemas/popular.schema';
import { UpcomingSchema } from './schemas/upcoming.schema';
import { TrendingSchema } from './schemas/trending.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: 'Popular',
        schema: PopularSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'Upcoming',
        schema: UpcomingSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'Trending',
        schema: TrendingSchema,
      },
    ]),
  ],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
