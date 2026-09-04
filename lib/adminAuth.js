export function isAuthorized(request) {
  const secret = request.headers.get("x-admin-secret");
  return Boolean(process.env.ADMIN_API_SECRET) && secret === process.env.ADMIN_API_SECRET;
}
