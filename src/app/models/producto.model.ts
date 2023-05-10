export class Producto {

    id?: number;
    nombre: string;
    detalle?: string;
    categoria_id: number;


    constructor(nombre: string, detalle: string, categoria_id: number) {
        this.nombre = nombre;
        this.detalle = detalle;
        this.categoria_id = categoria_id;

    }

}