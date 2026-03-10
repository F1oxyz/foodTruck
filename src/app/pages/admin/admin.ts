import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FoodSupabaseSevice } from '../../services/food_supabase_sevice';
import { Food } from '../../interfaces/food.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [CurrencyPipe],
  templateUrl: './admin.html',
  styles: `
    :host {
      display: block;
    }
  `,

  changeDetection: ChangeDetectionStrategy.Default,
})
export class Admin {
  foodService = inject(FoodSupabaseSevice);
  cdr = inject(ChangeDetectorRef);
  foods: Food[] = [];

  constructor() {
    this.getFood();
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

}
