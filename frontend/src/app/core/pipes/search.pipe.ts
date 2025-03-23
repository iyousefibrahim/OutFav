import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: IProduct[] | null, searchValue: string | null): IProduct[] {
    if (!products || !Array.isArray(products)) {
      return []; 
    }

    if (!searchValue || typeof searchValue !== 'string') {
      return products;
    }

    searchValue = searchValue.toLowerCase();
    
    return products.filter(product =>
      product.title?.toLowerCase().includes(searchValue) || 
      product.category?.name?.toLowerCase().includes(searchValue)
    );
  }

}
