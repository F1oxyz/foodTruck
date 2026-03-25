import { ChangeDetectionStrategy, Component, inject, Input, } from '@angular/core';
import { Food, newItemCarrito } from '../../interfaces/food.interface';
import { CurrencyPipe } from '@angular/common';
import { FoodSupabaseSevice } from '../../services/food_supabase_sevice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-food',
  imports: [CurrencyPipe],
  template: `
    <article class="group relative w-72 rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">

      <!-- Image -->
      <div class="relative h-52 overflow-hidden bg-amber-50">
        <img
          src="{{food.url_img}}"
          alt="{{food.name}}"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <!-- Badge disponibilidad -->
        <span class="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
          {{food.available ? 'Disponible' : 'No disponible'}}
        </span>
        <!-- Precio flotante -->
        <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-1 shadow">
          <span class="text-amber-600 font-black text-lg leading-none">{{ food.price | currency }}</span>
        </div>
      </div>

      <!-- Body -->
      <div class="p-5 flex flex-col gap-3">

        <!-- Categoría -->
        <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">
          {{food.category}}
        </span>

        <!-- Nombre -->
        <h3 class="text-gray-900 font-black text-xl leading-tight tracking-tight">
          {{food.name}}
        </h3>

        <!-- Descripción -->
        <p class="text-gray-400 text-sm leading-relaxed line-clamp-1">
          {{food.description}}
          <!-- con line-clamp-1 para evitar que el texto se desborde y mantener el diseño limpio y ordenado. Esta clase es especialmente útil para mostrar descripciones largas de manera concisa, asegurando que la tarjeta mantenga su tamaño uniforme sin importar la longitud del texto. Además, mejora la legibilidad al evitar que el contenido se extienda demasiado, lo que podría distraer al usuario o romper la estética visual de la tarjeta. Con line-clamp-1, podemos garantizar que cada tarjeta de comida tenga un aspecto profesional y atractivo, incluso cuando las descripciones varían en longitud. -->
        </p>

        <!-- Divider -->
        <div class="w-full h-px bg-gray-100"></div>

        <!-- Footer -->
        <div class="flex items-center justify-between">
          <span class="text-xs text-gray-400 font-medium"># {{food.id}}</span>
          <button
            class="flex items-center gap-2 bg-gray-900 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-2xl transition-all duration-300 active:scale-95"
            (click)="addToCarrito(food)"
            >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Agregar
          </button>
        </div>

      </div>
    </article>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFood {

  private supaService = inject(FoodSupabaseSevice);
  @Input() food!: Food;

  async addToCarrito(food: Food) {

    const encontrado = await this.buscarItem(food.id.toString());

    if (!encontrado) {
      console.log('no está ese producto');

      const item: newItemCarrito = {
        id_food: food.id,
        options: null,
        quantity: 1,
        total: food.price * 1,

      }
      const newItem = await this.supaService.postCarrito(item);
      console.log('respuesta', newItem);

      //alerta
      Swal.fire({
        title: '¡Producto agregado!',
        text: 'El producto ha sido agregado al carrito.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#4c8c55',
      });

    } else {
      console.log('ya está ese producto');
      //aqui se actualizaria
    }


  }

  async buscarItem(id: String) {
    const item = await this.supaService.getItemCarrito(id);
    if (item) {
      return item[0];
    }
    return null;
  }

}