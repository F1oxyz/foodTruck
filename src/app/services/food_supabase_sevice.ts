import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Food, FoodCreate, newItemCarrito } from '../interfaces/food.interface';

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

    if (error) throw error;
    return foods;
  }

  async postFood(food: FoodCreate) {
    const { data, error } = await this.supabase
      .from('foods')
      .insert([food])
      .select();

    if (error) throw error;
    return data;

  }

  async deleteFood(id_food: number) {

    const { data, error } = await this.supabase
      .from('foods')
      .delete()
      .eq('id', id_food)

    if (error) throw error;
    return data;

  }

  async updateFood(id_food: number, food: Food) {

    const { data, error } = await this.supabase
      .from('foods')
      .update({...food})
      .eq('id', id_food)
      .select()
    if (error) throw error;
    return data;

  }

  async postCarrito(item: newItemCarrito) {
    const { data, error } = await this.supabase
      .from('items_carrito')
      .insert([
        item
      ])
      .select();

    if (error) throw Error;
    return data;

  }

  async getItemCarrito(id: String) {
    let {data, error} = await this.supabase
      .from('items_carrito')
      .select('*')
      .eq('id_food', id)
      ;
    if (error) throw Error;
    return data;
  }

  async getCarrito() {
    const { data, error } = await this.supabase
      .from('items_carrito')
      .select('*, foods(*)');
    if (error) {
      console.error('Error fetching carrito:', error);
      throw error;
    }
    return data;
  }

  async deleteItemCarrito(id_item: number) {

    const { data, error } = await this.supabase
      .from('items_carrito')
      .delete()
      .eq('id', id_item)
    console.log(data);
    if (error) throw error;
    return data;

  }

  async vaciarCarrito(idArray: number[]) {
    const { data, error } = await this.supabase
      .from('items_carrito')
      .delete()
      .in('id', idArray)
    console.log(data);
    if (error) throw error;
    return {
      message: 'Carrito vaciado correctamente',
      success: true
    };
  }
    

  



}
