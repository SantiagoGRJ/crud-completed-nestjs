import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const oneMb=1048576

    if(!value || typeof value.size !== 'number'){
      throw new BadRequestException(`Must be send a valid file`)
      
    }

    if(value.size > oneMb){
      throw new BadRequestException(`The file must be Less than 1Mb in size`)
    }
    
    return value;
  }
}
