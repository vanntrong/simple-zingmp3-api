import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  GetAlbumDto,
  GetDetailArtistDto,
  GetTop10Dto,
  SearchMusicDto,
} from './music.dto';
import { MusicService } from './music.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('musics')
@ApiTags('musics')
export class MusicController {
  constructor(private musicService: MusicService) {}

  @Get('home')
  getHome(@Query('page') page?: number) {
    return this.musicService.getHome(page);
  }

  // @Get('search')
  // searchMusic(@Query() query: SearchMusicDto) {
  //   return this.musicService.search(query.keyword);
  // }

  @Get('top-100')
  getTop100(@Query() { key }: GetTop10Dto) {
    return this.musicService.getTop100(key);
  }

  @Get('top-20')
  getTop20() {
    return this.musicService.getTop20();
  }

  @Get('topic')
  getTopic() {
    return this.musicService.getTop20();
  }

  // @Get('artist')
  // getArtist(@Query() query: GetDetailArtistDto) {
  //   return this.musicService.getArtistById(query.keyword);
  // }

  @Get('album/:id')
  getAlbum(@Param() params: GetAlbumDto) {
    return this.musicService.getAlbumById(params.id);
  }

  @Get(':id')
  getMusic(@Param('id') id: string) {
    return this.musicService.getMusicById(id);
  }

  @Get(':id/lyric')
  getLyric(@Param('id') id: string) {
    return this.musicService.getLyric(id);
  }
}
