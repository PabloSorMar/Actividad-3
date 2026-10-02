import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonIcon
} from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  standalone: true,
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonItem,
    IonInput,
    IonTextarea,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonText
  ]
})
export class ContactoPage implements OnInit {
  // Punto 15: Forms
  correo: string = '';
  mensaje: string = '';
  enviado: boolean = false;

  ultimoMensaje: { correo: string; mensaje: string } | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    await this.cargarUltimoMensaje();
  }

  async cargarUltimoMensaje() {
    const res = await Preferences.get({ key: 'ultimoMensaje' });
    if (res.value) {
      try {
        this.ultimoMensaje = JSON.parse(res.value);
        this.cdr.markForCheck();
      } catch (e) {
        console.error('Error parseando último mensaje:', e);
      }
    }
  }

  // Punto 15 y 16: Enviar y guardar en @capacitor/preferences
  async enviar() {
    if (!this.correo.trim() || !this.mensaje.trim()) {
      alert('Por favor, introduce el correo y el mensaje.');
      return;
    }

    await Preferences.set({
      key: 'ultimoMensaje',
      value: JSON.stringify({
        correo: this.correo,
        mensaje: this.mensaje
      })
    });

    this.enviado = true;
    this.ultimoMensaje = {
      correo: this.correo,
      mensaje: this.mensaje
    };

    // Limpiar campos tras enviar
    this.correo = '';
    this.mensaje = '';
    this.cdr.markForCheck();
  }
}
