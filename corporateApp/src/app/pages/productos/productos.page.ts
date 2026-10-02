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
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner
} from '@ionic/angular';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.interface';

@Component({
  standalone: true,
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonGrid,
    IonRow,
    IonCol,
    IonSpinner
  ]
})
export class ProductosPage implements OnInit {
  products: Product[] = [];
  cargando: boolean = true;

  constructor(
    private productService: ProductsService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    try {
      this.products = await this.productService.getProducts();
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      this.cargando = false;
      this.cdr.markForCheck();
    }
  }
}
