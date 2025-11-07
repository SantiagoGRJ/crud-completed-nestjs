import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateorderPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    
     if (value === '' || value === null || value === undefined) {
      return undefined;
    }

    const lower = value.toLowerCase();
    
    if (typeof value === 'string') {
      
      if (lower === 'true') return true;
      if (lower === 'false') return false;

      throw new BadRequestException(
        `Parameter "order" only can be true or false.`,
      );
    }

    if (typeof value === 'boolean' && lower === 'true') return value;
    if (typeof value === 'boolean' && lower === 'false') return value;


   
    return value;
  }
}
