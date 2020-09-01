import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'convertToDate'
})
export class ConvertToDateTransform implements PipeTransform {
  transform(value: any): string {
    if (value.year && value.month && value.day) {
      return value.year + '-' + ("0" + value.month).slice(-2) + '-' + ("0" + value.day).slice(-2)
    }
    return ''
  }
}
