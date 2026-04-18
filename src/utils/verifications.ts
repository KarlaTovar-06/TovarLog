export function getEngomadoData(plate: string) {
  const lastDigit = plate.replace(/\D/g, "").slice(-1);

  switch (lastDigit) {
    case "5":
    case "6":
      return { color: "AMARILLO", months: [1, 2] };
    case "7":
    case "8":
      return { color: "ROSA", months: [2, 3] };
    case "3":
    case "4":
      return { color: "ROJO", months: [3, 4] };
    case "1":
    case "2":
      return { color: "VERDE", months: [4, 5] };
    case "9":
    case "0":
      return { color: "AZUL", months: [5, 6] };
    default:
      return { color: "DESCONOCIDO", months: [] };
  }
}

export function getNextVerificationDate(months: number[]) {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const nextMonth = months.find((m) => m >= currentMonth);

  if (nextMonth) {
    return new Date(currentYear, nextMonth - 1, 1).toISOString();
  }

  return new Date(currentYear, months[0] - 1, 1).toISOString();
}
