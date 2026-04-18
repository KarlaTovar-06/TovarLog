export function getVerificationStatus(date?: string) {
  if (!date) return "unknown";

  const today = new Date();
  const target = new Date(date);

  const diff = (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (diff < 0) return "urgent";
  if (diff <= 30) return "upcoming";
  return "ok";
}
