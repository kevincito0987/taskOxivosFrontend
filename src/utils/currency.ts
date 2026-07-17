// Tasa de cambio aproximada para la conversión (ejemplo: 1 USD = 4,000 COP)
export const USD_TO_COP_RATE = 4000;

/**
 * Formatea un valor numérico a moneda colombiana (COP) de forma limpia
 * Ejemplo: 340000 -> $340.000 COP
 */
export const formatToCOP = (valueInCOP: number): string => {
  return (
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(valueInCOP) + " COP"
  );
};
