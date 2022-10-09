import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchMusicDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  keyword: string;
}

export class GetDetailArtistDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  keyword: string;
}

export class GetAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}

export class GetTop10Dto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  key: string;
}
