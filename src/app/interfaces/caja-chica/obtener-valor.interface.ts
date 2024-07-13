export interface ObtenerCajaChicaResponse {
    error:      boolean;
    resolucion: Resolucion[];
    mensaje:    string;
}

export interface Resolucion {
    total_caja: number;
}