import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Carrito } from './pages/carrito/carrito';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/login/login';

export const routes: Routes = [
    {
        path: 'home',
        component: Home,
        title: 'Home'
    },
    {
        path: 'admin',
        component: Admin,
        title: 'Admin'
    },
    {
        path: 'login',
        component: Login,
        title: 'Login'
    },
    {
        path: 'carrito',
        component: Carrito,
        title: 'Carrito'
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
