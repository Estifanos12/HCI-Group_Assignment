import { Body, Controller, Get, Param, Post, Query, UseGuards, Put, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MovieService } from './movie.service';
import { Popular } from './schemas/popular.schema';
import { Trending } from './schemas/trending.schema';
import { Upcoming } from './schemas/upcoming.schema';
import { QueryStringDto } from './dto/query.dto';
import { TrendingQueryStringDto } from './dto/queryTrending.dto';
import { RecommendationDto } from './dto/recommendation.dto';

@Controller('movies')
@UseGuards(AuthGuard('jwt'))
export class MovieController {
    constructor(private readonly movieService: MovieService ){}

    @Get('popular')
    async getAllPopular(@Query() queryString: QueryStringDto):Promise<{movies: any[], count: number}>{
        return await this.movieService.getAllPopular(queryString);
    }

    @Get('popular/recommendation')
    async getRecommendation(@Query() queryString: RecommendationDto): Promise<{ movies: any[], count: number}>{
       return await this.movieService.getRecommendation(queryString);
    }

    @Get('trending')
    async getAllTrending(@Query() queryString: TrendingQueryStringDto):Promise<{movies: any[], count: number}>{
        return await this.movieService.getAllTrending(queryString);
    }
    
    @Get('upcoming')
    async getAllUpcoming(@Query() queryString: QueryStringDto):Promise<{movies: any[], count: number}>{
        return await this.movieService.getAllUpcoming(queryString);
    }

    @Get('popular/:id')
    async getPopular(@Param("id") id: string):Promise<any>{
        return await this.movieService.getPopular(id);
    }

    @Get('trending/:id')
    async getTrending(@Param("id") id: string):Promise<any>{
        return await this.movieService.getTrending(id);
    }
    
    @Get('upcoming/:id')
    async getUpcoming(@Param("id") id: string):Promise<any>{
        return await this.movieService.getUpcoming(id);
    }

    @Post('popular')
    async createPopular(@Body() movie: Popular|Popular[]):Promise<Popular|Popular[]>{
        return await this.movieService.createPopular(movie);
    }

    @Post('trending')
    async createTrending(@Body() movie: Trending|Trending[]):Promise<Trending|Trending[]>{
        return await this.movieService.createTrending(movie);
    }

    @Post('upcoming')
    async createUpcoming(@Body() movie: Upcoming | Upcoming[]):Promise<Upcoming|Upcoming[]>{
        return await this.movieService.createUpcoming(movie);
    }

    @Put('popular/:id')
    async updatePopular(@Param() id: string, @Body() movie: Popular):Promise<Popular>{
        return await this.movieService.updatePopular(id, movie);
    }

    @Put('trending/:id')
    async updateTrending(@Param() id: string, @Body() movie: Trending):Promise<Trending>{
        return await this.movieService.updateTrending(id, movie);
    }

    @Put('upcoming/:id')
    async updateUpcoming(@Param() id: string, @Body() movie: Upcoming):Promise<Upcoming>{
        return await this.movieService.updateUpcoming(id, movie);
    }

    @Delete('popular/:id')
    async DeletePopular(@Param() id: string):Promise<void>{
    await this.movieService.deletePopular(id);
    }

    @Delete('trending/:id')
    async DeleteTrending(@Param() id: string):Promise<void>{
         await this.movieService.deleteTrending(id);
    }

    @Delete('upcoming/:id')
    async DeleteUpcoming(@Param() id: string):Promise<void>{
        return await this.movieService.deleteUpcoming(id);
    }


}
