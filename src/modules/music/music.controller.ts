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
  getHome() {
    return this.musicService.getHome();
  }

  @Get('search')
  searchMusic(@Query() { keyword }: SearchMusicDto) {
    return this.musicService.search(keyword);
  }

  @Get('top-100')
  getTop100(@Query() { key }: GetTop10Dto) {
    return this.musicService.getTop100(key);
  }

  @Get('playlists')
  getPlaylists() {
    return this.musicService.getPlaylist();
  }

  @Get('playlists/:id')
  getPlaylistDetail(@Param('id') id: string) {
    return this.musicService.getPlaylistDetail(id);
  }

  @Get('topic')
  getTopic() {
    return this.musicService.getTopic();
  }

  @Get('topic/:id')
  getTopicDetail(@Param('id') id: string) {
    return this.musicService.getTopicDetail(id);
  }

  @Get('artists/trending')
  getTrendingArtist() {
    return this.musicService.getTrendingArtist();
  }

  // @Get('artits/explorer')
  // getExplorerArtist() {
  //   return this.musicService.getExplorerArtist();
  // }

  @Get('artists/:id')
  getArtistDetail(@Param('id') id: string) {
    return this.musicService.getArtistDetail(id);
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
