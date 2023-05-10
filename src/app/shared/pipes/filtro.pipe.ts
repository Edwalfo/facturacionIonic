import { Pipe, PipeTransform } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { Producto } from 'src/app/models/producto.model';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(items: Item[], page: number = 0, selected: number = 0, seach: string = '', productos: Producto[]): Item[] {

    let newProductos

    //Filtro categoria
    if (selected > 0) {
      newProductos = productos.filter(p => p.categoria_id == selected);
    }else{
      newProductos=productos;
    }
   

    //Filtro busqueda
    const filtroProductos = newProductos.filter(p => p.nombre.toUpperCase().includes(seach.toUpperCase()))

    const newItem: Item[] = [];
    for (let i = 0; i < filtroProductos.length; i++) {

      const index = items.findIndex(it => it.producto_id == filtroProductos[i].id);


      if (index >= 0) {

        const newitem: Item = {
          id: items[index].id,
          precio: items[index].precio,
          stock: items[index].stock,
          producto_id: items[index].producto_id,
        }

        newItem.push(newitem);

      }


    }

    return newItem.slice(page, page + 5);


  }

}
