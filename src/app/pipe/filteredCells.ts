import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filteredCells'
})
export class filteredCells implements PipeTransform {
    transform(enter:string):string {
        return enter.replace(/[^a-zA-Z0-9]/g, '');
    }
    
}