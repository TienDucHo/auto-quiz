export async function quizLoader({}) {
  return { name: "French" };
}
export async function attemptLoader({ params }) {
  return { name: params.attemptId };
}
