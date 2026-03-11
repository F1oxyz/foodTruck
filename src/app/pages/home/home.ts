import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { CardFood } from "../../components/card_food/card_food";
import { AddFoodModal } from '../../components/add_food_modal/add_food_modal';
import { FoodSupabaseSevice } from '../../services/food_supabase_sevice';
import { Food } from '../../interfaces/food.interface';

@Component({
  selector: 'app-home',
  imports: [CardFood],
  templateUrl: './home.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Home {
  foodService = inject(FoodSupabaseSevice);
  cdr = inject(ChangeDetectorRef); //para forzar la deteccion de cambios
  foods: Food[] = [];

  constructor() {
    // const data = this.foodService.getFood();
    // console.log(data);
    this.getFood();
  }

  handleSubmit(food: Omit<Food, 'id'>) {
    console.log('Nuevo platillo:', food);
    // TODO: llamar al servicio para guardar en Supabase
    // this.closeModal();
  }

  async getFood() {
    // console.log('holis');
    
    const data = await this.foodService.getFood();
    if (data) {
      this.foods = data; //no va solo por q puede ser null
    }
    this.cdr.detectChanges(); //para forzar la deteccion de cambios
    // console.log('Platillos obtenidos:', data);
  }
}
