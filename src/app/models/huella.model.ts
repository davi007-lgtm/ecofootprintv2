export interface CalidadAire {
  status: string;
  data: {
    aqi: number;
    city: {
      name: string;
    };
    iaqi: {
      pm25?: { v: number };
      t?: { v: number };
      h?: { v: number };
    };
  };
}

export interface Huella {
  id: number;
  accion: string;
  impacto: number;
  tipo: 'positivo' | 'negativo';
}