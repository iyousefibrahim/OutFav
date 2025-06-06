import { Component } from '@angular/core';
import { MainHeroComponent } from "../main-hero/main-hero.component";
import { FeaturesComponent } from "../features/features.component";
import { ProductItemComponent } from "../products/product-item/product-item.component";
import { CategoriesCtaComponent } from "../categories/categories-cta/categories-cta.component";
import { NewsletterComponent } from "../newsletter/newsletter.component";

@Component({
  selector: 'app-home',
  imports: [MainHeroComponent, FeaturesComponent, ProductItemComponent, CategoriesCtaComponent, NewsletterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

}
