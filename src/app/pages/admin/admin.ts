import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FoodSupabaseSevice } from '../../services/food_supabase_sevice';
import { Food } from '../../interfaces/food.interface';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { AddFoodModal } from '../../components/add_food_modal/add_food_modal';


@Component({
  selector: 'app-admin',
  imports: [CurrencyPipe, AddFoodModal],
  templateUrl: './admin.html',
  styles: `
    :host {
      display: block;
    }
  `,

  changeDetection: ChangeDetectionStrategy.Default,
})
export class Admin {
  showModal = signal(false);
  foodService = inject(FoodSupabaseSevice);
  cdr = inject(ChangeDetectorRef);
  foods: Food[] = [];

  constructor() {
    this.getFood();
  }

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  async getFood() {
    const data = await this.foodService.getFood();
    if (data) {
      this.foods = data;
    }
    this.cdr.detectChanges();
  }

  async deleteFood(id_food: number) {
    const data = await this.foodService.deleteFood(id_food);
    console.log(data);
    this.getFood();
  }

  confirmar(id_food: number) {
    Swal.fire({
      title: "¿Estas seguro de eliminar este platillo?",
      text: "No podras revertir esta accion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteFood(id_food);
        Swal.fire({
          title: "Eliminado!",
          text: "El platillo ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

}
