export interface Toast{
    mensaje: string;
    type: string;
    mostrar: boolean;
    fixed?:  boolean;
}

export enum TypeToast {
    success = "success",
    danger = "danger",
}

