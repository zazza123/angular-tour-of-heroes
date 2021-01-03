import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.getHero()
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
        .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void{
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  deletePower(power: string): void {
    // Aggiorno i poteri all'eroe in evidenza
    this.hero.powers = this.hero.powers.filter(p => p !== power);

    // Chiamo il servizio per rimuoverlo su server
    this.heroService.deletePower(this.hero, power).subscribe();
  }

  addPower(power: string): void {
    // Aggiorno i poteri all'eroe in evidenza
    this.hero.powers.push(power);

    // Chiamo il servizio per aggiungerlo su server
    this.heroService.addPower(this.hero, power).subscribe();
  }
}
