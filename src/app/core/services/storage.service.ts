export class StorageService {
  public get<T>(key: string): T | null {
    try {
      const item = globalThis.localStorage.getItem(key);
      if (!item) {
        // Si no hay ningún valor, retorna null
        return null;
      }

      // Si el valor existe, intenta parsearlo
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error al parsear el valor de la clave "${key}":`, error);
      return null; // Retorna null si hay un error en el parseo
    }
  }

  public set<T>(key: string, payload: T): void {
    try {
      globalThis.localStorage.setItem(key, JSON.stringify(payload));
    } catch (error) {
      console.error(`Error al guardar el valor en la clave "${key}":`, error);
    }
  }

  public remove(key: string): void {
    try {
      globalThis.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error al eliminar el valor de la clave "${key}":`, error);
    }
  }
}
