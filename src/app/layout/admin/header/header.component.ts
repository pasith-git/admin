import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RouteLinks } from './route.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public display: boolean = false;
  routeLinks: RouteLinks = [
    {
      name: 'ໜ້າຫຼັກ', link: '/',
    },
    {
      name: 'ຜູ້ໃຊ້', link: '/user',
    }
  ]
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }
  logout() {
    this.authService.clearAllAndRotate();
  }
}