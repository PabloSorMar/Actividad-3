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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonSpinner,
  IonNote,
  IonIcon
} from '@ionic/angular';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  standalone: true,
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonSpinner,
    IonNote
  ]
})
export class NosotrosPage implements OnInit {
  distancia: string | number = 'Calculando...';
  userCoords: { latitude: number; longitude: number } | null = null;
  cargando: boolean = true;
  errorMsg: string = '';

  // Punto 12: Coordenadas oficinas Arcos de Jalón 18 (Madrid)
  readonly oficinaLat = 40.4452;
  readonly oficinaLon = -3.6115;

  constructor(
    private geoService: GeolocationService,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    await this.obtenerUbicacionYCalcular();
  }

  async obtenerUbicacionYCalcular() {
    this.cargando = true;
    this.errorMsg = '';
    try {
      const coords = await this.geoService.getCurrentPosition();
      this.userCoords = {
        latitude: coords.latitude,
        longitude: coords.longitude
      };

      const dist = this.calcularDistancia(
        coords.latitude,
        coords.longitude,
        this.oficinaLat,
        this.oficinaLon
      );
      this.distancia = dist.toFixed(2);
    } catch (error: any) {
      console.warn('Aviso al obtener geolocalización:', error);
      this.errorMsg = 'No se pudo obtener la geolocalización (permisos o GPS no disponible).';
      this.distancia = 'No disponible';
    } finally {
      this.cargando = false;
      this.cdr.markForCheck();
    }
  }

  // Punto 13: Fórmula Haversine
  calcularDistancia(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    return this.geoService.calcularDistancia(lat1, lon1, lat2, lon2);
  }
}
