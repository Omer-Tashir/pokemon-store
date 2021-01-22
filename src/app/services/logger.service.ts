import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  public info(message: string) {
    console.log(`info: ${message}`);
  }

  public debug(message: string) {
    console.log(`debug: ${message}`);
  }

  public error(message: string) {
    console.log(`error: ${message}`);
  }
}
