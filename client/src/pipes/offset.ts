import { Pipe, PipeTransform } from '@angular/core';
import { Offset } from '../services/times';

@Pipe({
    name: 'offset',
})
export class OffsetPipe implements PipeTransform {
    transform(value: Offset, args: any[]) {
        if (value === null) return;
        
        let out = [];
        
        if (value.hours > 1) out.push(`${value.hours} hours`);
        if (value.hours === 1) out.push(`${value.hours} hour`);
        
        if (value.minutes > 1) out.push(`${value.minutes} minutes`);
        if (value.minutes === 1) out.push(`${value.minutes} minutes`);
        
        if (out.length === 0) return 'now';
        
        return out.join(', ');
    }
}