import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const oneMb=1048576

    const allowedTypes = ['image/png','image/jpg','image/jpeg']

    
    if(!value || typeof value.size !== 'number'){
      throw new BadRequestException(`Must be send a valid file`)
    }

    if(!allowedTypes.includes(value.mimetype)){
      throw new BadRequestException('Image must be PNG, JPG OR JPGE')
    }

    if(value.size > oneMb){
      throw new BadRequestException(`The file must be Less than 1Mb in size`)
    }
    

    return value;
  }
}
