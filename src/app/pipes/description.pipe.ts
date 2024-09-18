import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description',
  standalone: true
})
export class DescriptionPipe implements PipeTransform {

  transform(value: string,count:number, ...args: unknown[]): unknown {
    return value.split(" ").slice(0,count).join(" ");
  }

}
