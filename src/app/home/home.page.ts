import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Geolocation} from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
//import * as watermark from 'watermarkjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //@ViewChild('waterMarkedImage') waterMarkImage: ElementRef | undefined;

  latitude: any = 0; //latitud
  longitude: any = 0; //longitud
  clickedImage: any; 
  
  //Propiedades :( no entiendo 
  loadingLocation: any;
  locationCordinates: any;
  blobImage: any;
  originalImage: any;
  

  constructor(
    private geolocation: Geolocation, 
    private camera: Camera
  ){}

  options = {
    timeout: 10000, //tiempo de espera máximo en milisegundos
    enableHighAccuracy: true, 
    maximumAge: 3600 //Validez máxima de los datos de geolocalización en ms
  };

  optionsC: CameraOptions = {
    quality: 80, //calidad de la imagen
    destinationType: this.camera.DestinationType.DATA_URL, //Formato de valor de retorno
    encodingType: this.camera.EncodingType.JPEG, //Tipo de archivo de imagen
    mediaType: this.camera.MediaType.PICTURE, //Obtener un medio de tipo imagen/fotografía
    sourceType: this.camera.PictureSourceType.CAMERA
  }

  // utilizar la geolocalización para obtener las coordenadas del dispositivo del usuario
  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  //Tomar una foto 
  captureImage() {
    this.camera.getPicture(this.optionsC).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;
      //subir foto a firebase Storage
      
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }



  /*
  //Capturar cordenadas
  getLatLong() {
    this.loadingLocation = true;
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      this.locationCordinates = resp.coords;
      this.loadingLocation = false;
    }).catch((error) => {
      this.loadingLocation = false;
      console.log('Error getting location', error);
    });
  }

  takeSnap() {
    this.camera.getPicture(this.optionsC).then((imageData) => {
      this.originalImage = 'data:image/jpeg;base64,' + imageData;
 
      fetch(this.originalImage)
        .then(res => res.blob())
        .then(blob => {
          this.blobImage = blob;
          //this.watermarkImage()
        });
    }, (error) => {
       console.log(error);      
    });
  }

  /*watermarkImage() {
    watermark([this.blobImage])
    .image(watermark.text.lowerLeft("("+this.locationCordinates.lattitude+", "+this.locationCordinates.longitude+")", '170px Arial', '#F5A905', 0.8))
      .then((img: { src: any; }) => {
        this.watermarkImage.nativeElement.src = img.src;
      });
  }*/
  

}
