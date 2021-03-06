import { Component , Element , State , ComponentInterface} from '@stencil/core';
import {devices} from './devices';

@Component({
  tag: 'o-demo-devices',
  styleUrl: 'o-demo-devices.scss',
  shadow: true
})

export class DemoDevicesComponent implements ComponentInterface {
  private evtListenerRotate : any;
  private evtListenerDeviceChange : any;
  @Element() el: any;

  @State() selectedDevice = 0;

  deviceArray = Object.keys(devices) as Array<keyof typeof devices>

  componentWillUpdate(){
    window.requestAnimationFrame(()=> this._sizeFrame());
  }

  componentDidLoad() {
    this.evtListenerRotate = document.addEventListener('rotate-device' ,this.rotateDevice.bind(this));
    this.evtListenerDeviceChange = document.addEventListener('change-device' , this.changeDevice.bind(this));
    this.el.forceUpdate();
  }

  componentDidUnload(){
    document.removeEventListener('rotate-device' , this.evtListenerRotate );
    document.removeEventListener('change-device' , this.evtListenerDeviceChange );
  }

  _sizeFrame(){
    const slotEl= this.el.querySelector('[slot=screen]');
    const iFrameEl = this.el.querySelector('iframe');
    iFrameEl.width = `${slotEl.clientWidth}px`;
    iFrameEl.height = `${slotEl.clientHeight}px`;
    this.el.forceUpdate();
  }

  changeDevice(evt : any){
      if(evt.detail === 'navigate-next'){
        this.selectedDevice < this.deviceArray.length -1 ? this.selectedDevice++ : this.selectedDevice = 0;
      }
      else if(evt.detail === 'navigate-before'){
        this.selectedDevice > 0 ?  this.selectedDevice-- : this.selectedDevice = this.deviceArray.length - 1;
      }
  }

  rotateDevice(){
    this._sizeFrame();
    this.el.shadowRoot.querySelector('.marvel-device').classList.toggle('landscape');
  }


  
  render() {
    return devices[this.deviceArray[this.selectedDevice]]();
  }
}
