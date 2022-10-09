import { Injectable, Logger } from '@nestjs/common';
import * as Nhaccuatui from 'nhaccuatui-api';
import * as ZingMp3 from 'zingmp3-api';

@Injectable()
export class MusicService {
  private logger: Logger;
  constructor() {
    this.logger = new Logger(MusicService.name);
  }
  async getHome(page?: number) {
    try {
      const res = await Nhaccuatui.getHome(page);

      this.logger.log(`Get Home Success:::page=${page}`);
      return res;
    } catch (error) {
      this.logger.error(error, '', 'getHome');
      throw error;
    }
  }

  async getMusicById(id: string) {
    try {
      const res = await Nhaccuatui.getSong(id);

      this.logger.log(`getMusicById:::id=${id}`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async search(keyword: string) {
    try {
      const res = await ZingMp3.search(keyword);

      this.logger.log(`search:::${keyword}`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getTop100(key: string) {
    try {
      const res = await Nhaccuatui.getTop100(key);

      this.logger.log(`get top 100`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getTop20() {
    try {
      const res = await Nhaccuatui.getTop20();

      this.logger.log(`get top 20`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getTopic() {
    try {
      const res = await Nhaccuatui.getTopic();

      this.logger.log(`get topic`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getArtistById(keyword: string) {
    try {
      const res = await ZingMp3.getDetailArtist(keyword);

      this.logger.log(`getArtistById:::${keyword}`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAlbumById(id: string) {
    try {
      const res = await Nhaccuatui.getPlaylist(id);

      this.logger.log(`getAlbumById:::${id}`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getLyric(id: string) {
    try {
      const res = await Nhaccuatui.getLyric(id);

      this.logger.log(`getLyric:::${id}`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
