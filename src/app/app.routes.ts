import { Routes } from '@angular/router';
import { StartScreen } from './start-screen/start-screen';
import { Gametable } from './gametable/gametable';


export const routes: Routes = [
    { path: '', component: StartScreen },
    {path: 'gametableX/:id', component: Gametable}
];
