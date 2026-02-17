export function calculateRank(score) {
    if (score <= 500) return "Calculador Novato";
    if (score <= 1500) return "Analista Numérico";
    if (score <= 3000) return "Calculadora Humana";
    return "Maestro de los Algoritmos (Rango Turing)";
}
