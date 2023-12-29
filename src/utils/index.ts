export function isProd() {
  return ['www.portus.world', 'portus.world'].includes(window.location.host);
}
