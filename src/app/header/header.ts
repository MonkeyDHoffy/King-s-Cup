import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Gametable } from '../gametable/gametable'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, Gametable],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
