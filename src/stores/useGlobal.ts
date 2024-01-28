import { defineStore } from 'pinia';

export const useGlobal = defineStore('useGlobal', () => {
  function isProd() {
    return ['www.portus.world', 'portus.world'].includes(location.host);
  }

  return { isProd };
});
