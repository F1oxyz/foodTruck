import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-carrito',
  imports: [],
  template: `
    <div class="max-w-6xl mx-auto px-6 py-16 flex flex-col items-center gap-4">
      <div class="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      </div>
      <h2 class="text-2xl font-black text-gray-900 tracking-tight">Tu carrito está vacío</h2>
      <p class="text-gray-400 text-sm">Agrega platillos desde el menú principal.</p>
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
