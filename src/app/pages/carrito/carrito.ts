import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-carrito',
  imports: [],
  template: `
    <div class="max-w-5xl mx-auto px-6 py-12">
      <h2 class="text-3xl font-black text-gray-900 tracking-tight mb-8">Tu Pedido</h2>
      
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Lista de platillos -->
        <div class="flex-1 space-y-4">
          <!-- Item 1 -->
          <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div class="w-24 h-24 bg-amber-50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
              </svg>
            </div>
            <div class="flex-1">
              <div class="flex justify-between items-start">
                <h3 class="font-bold text-gray-900 text-lg leading-tight">Tacos al Pastor</h3>
                <button class="text-gray-400 hover:text-red-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </button>
              </div>
              <p class="text-gray-500 text-sm mt-1">Orden de 5 tacos con piña, cebolla y cilantro</p>
              <div class="text-amber-600 font-black mt-2 text-lg">$120.00</div>
            </div>
            <div class="flex items-center gap-3 bg-gray-50 px-2 py-1.5 rounded-xl border border-gray-200 self-start sm:self-auto">
              <button class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-amber-600 hover:bg-white rounded-lg transition-colors font-bold text-lg">-</button>
              <span class="font-bold text-gray-900 w-4 text-center">2</span>
              <button class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-amber-600 hover:bg-white rounded-lg transition-colors font-bold text-lg">+</button>
            </div>
          </div>

          <!-- Item 2 -->
          <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div class="w-24 h-24 bg-amber-50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
              </svg>
            </div>
            <div class="flex-1">
              <div class="flex justify-between items-start">
                <h3 class="font-bold text-gray-900 text-lg leading-tight">Hamburguesa Especial</h3>
                <button class="text-gray-400 hover:text-red-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </button>
              </div>
              <p class="text-gray-500 text-sm mt-1">Doble carne, tocino, queso, lechuga y papas fritas</p>
              <div class="text-amber-600 font-black mt-2 text-lg">$150.00</div>
            </div>
            <div class="flex items-center gap-3 bg-gray-50 px-2 py-1.5 rounded-xl border border-gray-200 self-start sm:self-auto">
              <button class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-amber-600 hover:bg-white rounded-lg transition-colors font-bold text-lg">-</button>
              <span class="font-bold text-gray-900 w-4 text-center">1</span>
              <button class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-amber-600 hover:bg-white rounded-lg transition-colors font-bold text-lg">+</button>
            </div>
          </div>
        </div>

        <!-- Resumen de compra -->
        <div class="w-full lg:w-[340px] shrink-0">
          <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-6 hover:shadow-md transition-shadow">
            <h3 class="text-xl font-black text-gray-900 mb-6 tracking-tight">Resumen</h3>
            
            <div class="space-y-4 mb-6">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span class="font-medium text-gray-900">$390.00</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Costo de envío</span>
                <span class="font-medium text-gray-900">$40.00</span>
              </div>
              <div class="h-px w-full bg-gray-100 my-2"></div>
              <div class="flex justify-between text-gray-900 text-lg font-black">
                <span>Total</span>
                <span class="text-amber-600">$430.00</span>
              </div>
            </div>

            <button class="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30">
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
export class Carrito { }
