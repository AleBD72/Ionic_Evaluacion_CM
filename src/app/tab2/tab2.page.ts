import { Component, NgZone } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { CallbackID, Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  coordinate: any;
  watchCoordinate: any;
  watchId: any;

  constructor(public photoService: PhotoService, private zone: NgZone) {}

  //Obtener coordenadas
  getCurrentCoordinate() {
    Geolocation.getCurrentPosition().then(data => {
      this.coordinate = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
        accuracy: data.coords.accuracy
      };
    }).catch(err => {
      console.error(err);
    });
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  PhotoCoordinate(){
    this.addPhotoToGallery();
    this.getCurrentCoordinate();
  }

}
