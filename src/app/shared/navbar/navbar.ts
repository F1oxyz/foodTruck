import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <!-- Brand -->
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="1"/>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>
          <span class="font-black text-gray-900 text-lg tracking-tight">FoodTruck</span>
        </div>

        <!-- Nav links -->
        <div class="flex items-center gap-1 bg-gray-100 rounded-2xl p-1">
          <a
            routerLink="/home"
            routerLinkActive="bg-white shadow-sm! text-emerald-600! font-bold!"
            class="px-5 py-2 rounded-xl text-sm font-semibold text-gray-500 transition-all duration-200 hover:text-amber-500 cursor-pointer"
          >
            Home
          </a>
          <a
            routerLink="/admin"
            routerLinkActive="bg-white shadow-sm! text-emerald-600! font-bold!"
            class="px-5 py-2 rounded-xl text-sm font-semibold text-gray-500 transition-all duration-200 hover:text-amber-500 cursor-pointer"
          >
            Admin
          </a>
        </div>

        <!-- Cart button -->
        <a
          routerLink="/carrito"
          routerLinkActive="ring-2! ring-amber-300! shadow-md!"
          class="relative flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-sm shadow-amber-200 hover:shadow-md hover:shadow-amber-200 transition-all duration-200 active:scale-95 cursor-pointer select-none"
        >
          <!-- Cart icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Carrito

          <!-- Badge contador -->
          @if (cartCount() > 0) {
            <span class="absolute -top-2 -right-2 min-w-[20px] h-5 bg-emerald-500 text-white text-[10px] font-black rounded-full flex items-center justify-center px-1 leading-none shadow-sm ring-2 ring-white">
              {{ cartCount() }}
            </span>
          }
        </a>

      </div>
    </nav>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  cartCount = signal(0);
}
