export interface RequestComprometerBillete {
    ipEstacion:                string;
    idUsersPosPerfilAdmin:     string;
    denominacionBilleteMoneda: DenominacionBilleteMoneda[];
}

export interface DenominacionBilleteMoneda {
    idDenominacionBilleteMoneda:       string;
    cantidadDenominacionBilleteMoneda: number;
    totalDenominacionBilleteMoneda:    number;
}

// Converts JSON strings to/from your types
export class ConvertBilletes {
    public static toRequestComprometerBillete(json: string): RequestComprometerBillete {
        return JSON.parse(json);
    }

    public static requestComprometerBilleteToJson(value: RequestComprometerBillete): string {
        return JSON.stringify(value);
    }
}
