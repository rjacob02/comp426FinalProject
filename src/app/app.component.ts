import { Component, Renderer2, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'comp426FinalProject';

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    const defaultTheme = 'light-mode';
    this.renderer.addClass(document.body, defaultTheme);
  }

  toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);
  }
}

