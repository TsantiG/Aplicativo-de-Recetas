import 'express-session';

declare module 'express-session' {
  interface Session {
    userId: number;  // Agrega la propiedad userId a la sesión
  }
}
