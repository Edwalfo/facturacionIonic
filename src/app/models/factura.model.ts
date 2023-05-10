import { Articulo } from "./articulo.model";

export class Factura {

    id?: string;
    fecha?: any;
    consecutivo?: any;
    user_id: string;
    articulos: Articulo[];
    subtotal: number;
    iva: number;
    descuento: number;
    total: number


    constructor( user_id: string, articulos: Articulo[], subtotal: number, iva: number, descuento: number, total: number) {
        this.user_id = user_id;
        this.articulos = articulos;
        this.subtotal = subtotal;
        this.iva = iva;
        this.descuento = descuento;
        this.total = total;


    }

}