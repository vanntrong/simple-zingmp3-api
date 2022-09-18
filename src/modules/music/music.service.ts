import { Injectable, Logger } from '@nestjs/common';
import * as ZingMp3 from 'zingmp3-api';

@Injectable()
export class MusicService {
  private logger: Logger;
  constructor() {
    this.logger = new Logger(MusicService.name);
  }
  async getHome(page?: number) {
    try {
      const res = await ZingMp3.getHome(page);

      this.logger.log(`getHome:::${page}`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getMusicById(id: string) {
    try {
      const res = await ZingMp3.getFullInfo(id);

      this.logger.log(`getMusicById:::${id}`);
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

  async getTop100() {
    try {
      const res = await ZingMp3.getTop100();

      this.logger.log(`get top 100`);
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
      const res = await ZingMp3.getDetailPlaylist(id);

      this.logger.log(`getAlbumById:::${id}`);
      return res;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
