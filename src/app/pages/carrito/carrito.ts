import { CurrencyPipe } from '@angular/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FoodSupabaseSevice } from '../../services/food_supabase_sevice';
import { Food, ItemCarrito, newItemCarrito } from '../../interfaces/food.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  imports: [CurrencyPipe],
  template: `
    <div class="max-w-5xl mx-auto px-6 py-12">
      <h2 class="text-3xl font-black text-gray-900 tracking-tight mb-8">Tu Pedido</h2>
      
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Lista de platillos -->
        <div class="flex-1 space-y-4">
          @for (item of foods(); track $index) {
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div class="w-24 h-24 bg-amber-50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-amber-500">
                @if (item.foods.url_img) {
                  <img [src]="item.foods.url_img" [alt]="item.foods.name" class="w-full h-full object-cover rounded-xl" />
                } @else {
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
                  </svg>
                }
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-start">
                  <h3 class="font-bold text-gray-900 text-lg leading-tight">{{ item.foods.name }}</h3>
                  <button (click)="confirmar(item.id, item.foods.name)" class="text-gray-400 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                  </button>
                </div>
                <p class="text-gray-500 text-sm mt-1 line-clamp-2">{{ item.options || item.foods.description }}</p>
                <div class="text-amber-600 font-black mt-2 text-lg">$ {{ item.total }}</div>
              </div>
              <div class="flex items-center gap-3 bg-gray-50 px-2 py-1.5 rounded-xl border border-gray-200 self-start sm:self-auto">
                <button class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-amber-600 hover:bg-white rounded-lg transition-colors font-bold text-lg">-</button>
                <span class="font-bold text-gray-900 w-4 text-center">{{ item.quantity }}</span>
                <button class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-amber-600 hover:bg-white rounded-lg transition-colors font-bold text-lg">+</button>
              </div>
            </div>
          } @empty {
            <p class="text-gray-500 text-center py-8">Tu carrito está vacío</p>
          }
        </div>

        <!-- Resumen de compra -->
        <div class="w-full lg:w-[340px] shrink-0">
          <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-6 hover:shadow-md transition-shadow">
            <h3 class="text-xl font-black text-gray-900 mb-6 tracking-tight">Resumen</h3>
            
            <div class="space-y-4 mb-6">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span class="font-medium text-gray-900">{{subtotal | currency:'MXN':'symbol-narrow'}}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Descuento</span>
                <span class="font-medium text-gray-900">- {{discount() | currency:'MXN':'symbol-narrow'}}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Costo de envío</span>
                <span class="font-medium text-green-600">Gratis</span>
              </div>
              <div class="h-px w-full bg-gray-100 my-2"></div>
              <div class="flex justify-between text-gray-900 text-lg font-black">
                <span>Total</span>
                <span class="text-amber-600">{{total | currency }}</span>
              </div>
            </div>

            <button (click)="confirmarPedido()" class="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30">
              Continuar con la compra
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            
            <p class="text-center text-gray-400 text-xs mt-4">
              Impuestos incluidos. El tiempo de entrega estimado es de 30-45 minutos.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carrito {

  foodService = inject(FoodSupabaseSevice);
  cdr = inject(ChangeDetectorRef); //para forzar la deteccion de cambios
  //arreglo de items de
  foods = signal<ItemCarrito[]>([]);

  constructor() {
    this.getItemsCarrito();
  }

  discount = signal(0);

  get totalItems(): number {
    return this.foods().reduce((total, i) => total + i.quantity, 0);
  }

  get subtotal(): number {
    return this.foods().reduce((total, i) => total + i.foods.price * i.quantity, 0);
  }

  get total(): number {
    return this.subtotal - this.discount();
  }
    
    


  async getItemsCarrito() {
    //console.log('holis');

    const data = await this.foodService.getCarrito();
    if (data) {
      this.foods.set(data); //no va solo por q puede ser null
    }
    this.cdr.detectChanges(); //para forzar la deteccion de cambios
    console.log('Platillos obtenidos:', data);
  }

  async deleteItemCarrito(id_item: number) {
      const data = await this.foodService.deleteItemCarrito(id_item);
      console.log(data);
      this.getItemsCarrito();
    }
  
    confirmar(id_food: number, name: String) {
      Swal.fire({
        title: `¿Estas seguro de eliminar este ${name}?`,
        text: "No podras revertir esta accion",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4c8c55",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteItemCarrito(id_food);
          Swal.fire({
            title: "Eliminado!",
            text: "El platillo ha sido eliminado.",
            icon: "success"
          });
        }
      });
    }


    async confirmarPedido() {
      const idArray = this.foods().map(item => item.id);
      console.log('id array', idArray);
      const data = await this.foodService.vaciarCarrito(idArray);
      if(data.success){
        Swal.fire({
          title: "Pedido confirmado!",
          text: "El pedido ha sido confirmado.",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#4c8c55",
        });
        this.clearCart();
      }
    }

    clearCart(){
      this.foods.set([]);
      this.cdr.detectChanges();
    }

}
