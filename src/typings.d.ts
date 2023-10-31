import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    scenes?: 'submitted' | 'participated' | 'store';
  }
}
