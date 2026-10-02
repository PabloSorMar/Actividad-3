import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export interface ContactMessage {
  correo: string;
  mensaje: string;
  fecha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  async guardarMensaje(correo: string, mensaje: string): Promise<void> {
    await Preferences.set({
      key: 'ultimoMensaje',
      value: JSON.stringify({
        correo,
        mensaje
      })
    });
  }

  async obtenerUltimoMensaje(): Promise<ContactMessage | null> {
    const res = await Preferences.get({ key: 'ultimoMensaje' });
    if (res.value) {
      try {
        return JSON.parse(res.value);
      } catch (e) {
        console.error('Error parseando último mensaje:', e);
        return null;
      }
    }
    return null;
  }
}
