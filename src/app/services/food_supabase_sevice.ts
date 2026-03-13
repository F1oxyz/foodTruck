import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Food, FoodCreate } from '../interfaces/food.interface';

@Injectable({
  providedIn: 'root'
})
export class FoodSupabaseSevice {
  APIKEY = environment.SupabaseKey;
  PROJECTID = environment.SupabaseURL;

  private supabase: SupabaseClient;

  constructor() {

    this.supabase = createClient(this.PROJECTID, this.APIKEY);

  }

  async getFood() {
    let { data: foods, error } = await this.supabase
      .from('foods')
      .select('*');

    if (error) throw Error;
    return foods;
  }

  async postFood(food: FoodCreate) {
    const { data, error } = await this.supabase
      .from('foods')
      .insert([food])
      .select();

    if (error) throw Error;
    return data;

  }

  async deleteFood(id_food: number) {

    const { data, error } = await this.supabase
      .from('foods')
      .delete()
      .eq('id', id_food)

    if (error) throw Error;
    return data;

  }

  async updateFood(id_food: number, food: Food) {

    const { data, error } = await this.supabase
      .from('foods')
      .update({...food})
      .eq('id', id_food)
      .select()
    if (error) throw Error;
    return data;

  }



}
