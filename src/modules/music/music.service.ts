import { Injectable, Logger } from '@nestjs/common';
import NhacCuaTui from 'nhaccuatui-api-full';

@Injectable()
export class MusicService {
  private logger: Logger;
  constructor() {
    this.logger = new Logger(MusicService.name);
  }
  async getHome() {
    try {
      const res = await NhacCuaTui.getHome();

      this.logger.log(`Get Home Success`);
      return res;
    } catch (error) {
      this.logger.error(error, '', 'getHome');
      throw error;
    }
  }

  async getMusicById(id: string) {
    try {
      const res = await NhacCuaTui.getSong(id);

      this.logger.log(`getMusicById:::id=${id}`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async search(keyword: string) {
    try {
      const res = await NhacCuaTui.searchByKeyword(keyword);

      this.logger.log(`search:::${keyword}`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getPlaylist() {
    try {
      const res = await NhacCuaTui.getPlaylists();

      this.logger.log(`getPlaylist`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getPlaylistDetail(id: string) {
    try {
      const res = await NhacCuaTui.getPlaylistDetail(id);

      this.logger.log(`get playlist detail`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getTop100(key: string) {
    try {
      const res = await NhacCuaTui.getTop100(key);

      this.logger.log(`get top 100`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getTopic() {
    try {
      const res = await NhacCuaTui.getTopics();

      this.logger.log(`get topic`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getTopicDetail(id: string) {
    try {
      const res = await NhacCuaTui.getTopicDetail(id);

      this.logger.log(`get topic detail::${id}`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // async getArtistById(keyword: string) {
  //   try {
  //     const res = await ZingMp3.getDetailArtist(keyword);

  //     this.logger.log(`getArtistById:::${keyword}`);
  //     return res;
  //   } catch (error) {
  //     this.logger.error(error);
  //     throw error;
  //   }
  // }

  // async getAlbumById(id: string) {
  //   try {
  //     const res = await NhacCuaTui.getPlaylist(id);

  //     this.logger.log(`getAlbumById:::${id}`);
  //     return res;
  //   } catch (error) {
  //     this.logger.error(error);
  //     throw error;
  //   }
  // }

  async getTrendingArtist() {
    try {
      const res = await NhacCuaTui.getTrendingArtists();

      this.logger.log(`getTrendingArtist`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getArtistDetail(id: string) {
    try {
      const res = await NhacCuaTui.getArtistDetail(id);

      this.logger.log(`getArtistDetail:::${id}`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  // async getExplorerArtist() {
  //   try {
  //     const res = await NhacCuaTui.exploreArtists()
  //   } catch (error) {
  //     this.logger.error(error);
  //     throw error;
  //   }
  // }

  async getLyric(id: string) {
    try {
      const res = await NhacCuaTui.getLyric(id);

      this.logger.log(`getLyric:::${id}`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
