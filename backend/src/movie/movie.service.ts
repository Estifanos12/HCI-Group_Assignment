import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryStringDto } from './dto/query.dto';
import { TrendingQueryStringDto } from './dto/queryTrending.dto';
import { RecommendationDto } from './dto/recommendation.dto';
import { Popular } from './schemas/popular.schema';
import { Category, Trending } from './schemas/trending.schema';
import { Upcoming } from './schemas/upcoming.schema';

@Injectable()
export class MovieService {
    
  constructor(
    @InjectModel('Popular') private readonly popularModel: Model<Popular>,
    @InjectModel('Upcoming') private readonly upcomingModel: Model<Upcoming>,
    @InjectModel('Trending') private readonly trendingModel: Model<Trending>,
  ) {}

    async getRecommendation(queryString: RecommendationDto):Promise<{ movies: any[], count: number}>{
    const {limit = 10, offset = 0, genre="" } = queryString;
    const genreList = genre.trim().split(",");

    const recommendationMovie: any[] = await this.popularModel
      .find({
         genre_ids: { $in: genreList } 
      })
      .limit(limit)
      .skip(offset)
      .select('backdrop_path genre_ids overview poster_path release_date orginal_title title vote_average')
      .exec();
    
      const count = await this.popularModel
      .count({
         genre_ids: { $in: genreList } 
      })

    
      return { movies: recommendationMovie, count};

    }

  async getAllPopular(
    queryString: QueryStringDto,
  ): Promise<{ movies: Popular[]; count: number }> {
    const { search = '', limit = 10, offset = 0 } = queryString;

    const popularMovies = await this.popularModel
      .find({
        $or: [
          {
            orginal_title: {
              $regex: search,
              $options: 'i',
            },
          },
          {
            title: {
              $regex: search,
              $options: 'i',
            },
          },
        ],
      })
      .limit(limit)
      .skip(offset)
      .select('backdrop_path genre_ids overview poster_path release_date orginal_title title vote_average')
      .exec();
    const count = await this.popularModel
      .count({
        $or: [
          {
            orginal_title: {
              $regex: search,
              $options: 'i',
            },
          },
          {
            title: {
              $regex: search,
              $options: 'i',
            },
          },
        ],
      })

    return { movies: popularMovies, count };
  }

  async getAllTrending(
    queryString: TrendingQueryStringDto,
  ): Promise<{ movies: any[]; count: number }> {
    const {
      search = '',
      limit = 10,
      offset = 0,
      category = Category.DAILY,
    } = queryString;

    const trendingMovies = await this.trendingModel
      .find({
        $or: [
          {
            orginal_title: {
              $regex: search,
              $options: 'i',
            },
          },
          {
            title: {
              $regex: search,
              $options: 'i',
            },
          },
        ],
      })
      .where('category')
      .equals(category)
      .limit(limit)
      .skip(offset)
      .select('backdrop_path genre_ids overview poster_path release_date orginal_title title vote_average category')
      .exec();
    const count = await this.trendingModel.count({
      $or: [
        {
          orginal_title: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          title: {
            $regex: search,
            $options: 'i',
          },
        },
      ],
    })
    .where('category')
    .equals(category);

    return { movies: trendingMovies, count };
  }

  async getAllUpcoming(
    queryString: QueryStringDto,
  ): Promise<{ movies: any[]; count: number }> {
    const { search = '', limit = 10, offset = 0 } = queryString;

    const upcomingMovies = await this.upcomingModel
      .find({
        $or: [
          {
            orginal_title: {
              $regex: search,
              $options: 'i',
            },
          },
          {
            title: {
              $regex: search,
              $options: 'i',
            },
          },
        ],
      })
      .limit(limit)
      .skip(offset)
      .select('backdrop_path genre_ids overview poster_path release_date orginal_title title vote_average category')
      .exec();
    const count = await this.upcomingModel.count();

    return { movies: upcomingMovies, count };
  }

  async getPopular(id: string): Promise<any> {
    const movie = await this.popularModel.findById(id).select('backdrop_path genre_ids overview poster_path release_date orginal_title title vote_average category')

    if (!movie) throw new NotFoundException('Movie Not Found');
    return movie;
  }

  async getTrending(id: string): Promise<any> {
    const movie = await this.trendingModel.findById(id).select(' category backdrop_path genre_ids overview poster_path release_date orginal_title title vote_average category')

    if (!movie) throw new NotFoundException('Movie Not Found');
    return movie;
  }

  async getUpcoming(id: string): Promise<any> {
    const movie = await this.upcomingModel.findById(id).select('backdrop_path genre_ids overview poster_path release_date orginal_title title vote_average category')
    if (!movie) throw new NotFoundException('Movie Not Found');
    return movie;
  }

  async createPopular(popularMovie: Popular | Popular[]): Promise<Popular> {
    return await this.popularModel.create(popularMovie);
  }

  async createTrending(
    trendingMovie: Trending | Trending[],
  ): Promise<Trending> {
    console.log(trendingMovie);
    return await this.trendingModel.create(trendingMovie);
  }

  async createUpcoming(
    upcomingMovie: Upcoming | Upcoming[],
  ): Promise<Upcoming> {
    return await this.upcomingModel.create(upcomingMovie);
  }

  async updatePopular(id: string, movie: Popular): Promise<Popular> {
      return this.popularModel.findByIdAndUpdate(id, movie, {upsert: true, returnDocument:"after"})
  }

  async updateTrending(id: string, movie: Trending): Promise<Trending> {
      return this.trendingModel.findByIdAndUpdate(id, movie, {upsert: true, returnDocument:"after"})
  }
  
  async updateUpcoming(id: string, movie: Upcoming): Promise<Upcoming> {
      return this.upcomingModel.findByIdAndUpdate(id, movie, {upsert: true, returnDocument:"after"})
  }

  async deletePopular(id: string): Promise<void> {
       this.popularModel.findByIdAndDelete(id)
  }

  async deleteTrending(id: string): Promise<void> {
       this.trendingModel.findByIdAndDelete(id)
  }

  async deleteUpcoming(id: string): Promise<void> {
       this.upcomingModel.findByIdAndDelete(id)
  }

}
