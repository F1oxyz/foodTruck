import { ChangeDetectionStrategy, Component, EventEmitter, inject, input, Output, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Food } from '../../interfaces/food.interface';
import { JsonPipe } from '@angular/common';
import { FoodSupabaseSevice } from '../../services/food_supabase_sevice';

@Component({
  selector: 'app-add-food-modal',
  imports: [FormsModule, ReactiveFormsModule, JsonPipe],
  template: `
    @if (isOpen()) {
      <!-- Backdrop -->
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        (click)="close()"
      >
        <!-- Modal card -->
        <div
          class="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          (click)="$event.stopPropagation()"
        >
          <!-- Accent bar -->
          <div class="h-1.5 w-full bg-linear-to-r from-emerald-400 via-amber-400 to-emerald-400"></div>

          <!-- Header -->
          <div class="flex items-center justify-between px-7 pt-6 pb-5">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-sm shadow-emerald-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </div>
              <div>
                <h2 class="text-lg font-black text-gray-900 tracking-tight leading-none">Nuevo Platillo</h2>
                <p class="text-xs text-gray-400 mt-0.5">Completa los datos del item</p>
              </div>
            </div>
            <button
              type="button"
              (click)="close()"
              class="w-8 h-8 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-400 flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div class="w-full h-px bg-gray-100"></div>

          <!-- Form -->
          <form [formGroup]="formFood" (ngSubmit)="saveFood()" class="px-7 py-6 flex flex-col gap-5 overflow-y-auto max-h-[70vh]">

            <!-- Nombre -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Nombre</label>
              <input
                type="text"
                name="name"
                formControlName="name"
                required
                placeholder="Ej: Classic Smash Burger"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-300 outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition-all "
              />
              <p class="text-xs text-red-400">{{ getErrorMessage('name') }}</p>
            </div>


            <!-- Precio + Categoría -->
            <div class="grid grid-cols-2 gap-4">

              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Precio</label>
                <div class="relative">
                  <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-500 font-black text-sm pointer-events-none select-none">$</span>
                  <input
                    type="number"
                    name="price"
                    formControlName="price"
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    class="w-full rounded-xl border border-gray-200 bg-gray-50 pl-8 pr-4 py-3 text-sm text-gray-900 placeholder-gray-300 outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition-all"
                  />
                </div>
                <p class="text-xs text-red-400">{{ getErrorMessage('price') }}</p>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Categoría</label>
                <div class="relative">
                  <select
                    name="category"
                    formControlName="category"
                    required
                    class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition-all cursor-pointer appearance-none"
                  >
                    <option value="" disabled>Seleccionar...</option>
                    @for (cat of categories; track cat) {
                      <option [value]="cat">{{ cat }}</option>
                    }
                  </select>
                  <!-- chevron -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
                <p class="text-xs text-red-400">{{ getErrorMessage('category') }}</p>
              </div>

            </div>

            <!-- Descripción -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Descripción</label>
              <textarea
                name="description"
                formControlName="description"
                rows="3"
                placeholder="Describe el platillo brevemente..."
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-300 outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition-all resize-none"
              ></textarea>
              <p class="text-xs text-red-400">{{ getErrorMessage('description') }}</p>
            </div>

            <!-- URL Imagen -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">URL de Imagen</label>
              <div class="relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <input
                  type="url"
                  name="url_img"
                  formControlName="url_img"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  class="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-300 outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>
              <p class="text-xs text-red-400">{{ getErrorMessage('url_img') }}</p>
            </div>

            <!-- Disponible toggle -->
            <div class="flex items-center justify-between px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <p class="text-sm font-semibold text-gray-900">Disponible</p>
                <p class="text-xs text-gray-400">Visible para los clientes</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="available"
                  formControlName="available"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-checked:bg-emerald-500 rounded-full transition-colors duration-200 relative
                  after:content-[''] after:absolute after:top-0.5 after:left-0.5
                  after:bg-white after:rounded-full after:h-5 after:w-5
                  after:shadow-sm after:transition-transform after:duration-200
                  peer-checked:after:translate-x-5">
                </div>
              </label>
            </div>

            <!-- Divider -->
            <div class="w-full h-px bg-gray-100"></div>

            <!-- Buttons -->
            <div class="flex gap-3">
              <button
                type="button"
                (click)="close()"
                class="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-500 font-bold text-sm hover:border-gray-300 hover:text-gray-700 transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gray-900 hover:bg-amber-500 text-white font-bold text-sm uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
                Guardar
              </button>
            </div>

          </form>
        </div>
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFoodModal {
  @Output() foodSaved = new EventEmitter<void>();
  
  isOpen = input<boolean>(false);
  onClose = output<void>();
  onSubmit = output<Omit<Food, 'id'>>();
  foodService = inject(FoodSupabaseSevice);


  // FormBuilder esta sirve para crear formularios reactivos de manera más sencilla, pero en este caso estamos usando ngModel para un formulario template-driven, así que no es estrictamente necesario. Sin embargo, lo dejo aquí por si queremos migrar a reactive forms en el futuro o para manejar validaciones más complejas.
  categories = [
    'Burgers', 'Pizzas', 'Tacos', 'Sandwiches',
    'Ensaladas', 'Bebidas', 'Postres', 'Otros', 'Mexican Food'
  ];

  errorMessages: any = {
    name: {
      required: 'El nombre es requerido',
      minlength: 'El nombre debe tener al menos 5 caracteres',
    },
    description: {
      required: 'La descripción es requerida',
      minlength: 'La descripción debe tener al menos 15 caracteres',
    },
    price: {
      required: 'El precio es requerido',
      min: 'El precio debe ser mayor a 0',
    },
    category: {
      required: 'La categoría es requerida',
    },
    url_img: {
      required: 'La URL de la imagen es requerida',
    },
  }

  getErrorMessage(controlName : string): string{
    const control = this.formFood.get(controlName);
    if(!control || !control.errors || control.untouched){
      return '';
    }
    const errors = control.errors;
    console.log(`Errrores ${controlName}: `, errors)

    for(const errkey in errors){ //falta
      if (this.errorMessages[controlName][errkey]) {
        return this.errorMessages[controlName][errkey];
      }
    }

    return '';
  }

  form: Omit<Food, 'id'> = {
    name: '',
    created_at: new Date().toISOString(),
    price: 0,
    description: '',
    available: true,
    category: '',
    url_img: '',
  };

  close() {
    this.onClose.emit();
  }

  submit() {
    this.onSubmit.emit({ ...this.form });
    this.resetForm();
  }

  private resetForm() {
    this.form = {
      created_at: new Date().toISOString(),
      name: '',
      price: 0,
      description: '',
      available: true,
      category: '',
      url_img: '',
    };
  }

  //Desde aqui agregar
  formFood!: FormGroup; // Este es el formulario reactivo que usaremos para manejar los datos del nuevo platillo. Aunque en el template estamos usando ngModel, tener un FormGroup nos permite tener una estructura más clara y fácil de manejar, especialmente si queremos agregar validaciones o lógica más compleja en el futuro. Además, nos da la flexibilidad de cambiar a un enfoque completamente reactivo si decidimos hacerlo más adelante sin tener que reescribir todo el código del formulario.
  //contructor de formularios
  fb = inject(FormBuilder);
  constructor(){
    this.formFood = this.fb.group({
      name: [,[Validators.required, Validators.minLength(5)]],
      description: [,[Validators.required, Validators.minLength(15)]],
      price: [,[Validators.required, Validators.min(1)]], 
      category: [,Validators.required],
      available: [true],
      url_img: [,Validators.required],
    });
  }

  async saveFood(){
    if(this.formFood.invalid){
      this.formFood.markAllAsTouched();
      return;
    }
    console.log('valor de formulario', this.formFood.value)
    const newFood = await this.foodService.postFood(this.formFood.value);
    this.foodSaved.emit();
    this.close();
    this.formFood.reset();
  }
}
