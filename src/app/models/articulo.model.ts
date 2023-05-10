export class Articulo {

    item_id: number;
    cantidad: number;
    nombre: string;
    precio: number;


    constructor(item_id: number, cantidad: number, nombre: string, precio: number) {
        this.item_id = item_id;
        this.cantidad = cantidad;
        this.nombre = nombre;
        this.precio = precio;


    }

}