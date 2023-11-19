export async function quizLoader({ params }) {
  return { name: params.quizId };
}
export async function attemptLoader({ params }) {
  return { name: params.attemptId };
}
