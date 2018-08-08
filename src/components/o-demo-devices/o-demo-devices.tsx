import { Component , Prop , Element , State} from '@stencil/core';
import {Devices} from './devices';
@Component({
  tag: 'o-demo-devices',
  styleUrl: 'o-demo-devices.scss',
  shadow: true
})

export class DemoDevicesComponent {
  private evtListenerRotate : any;
  private evtListenerDeviceChange : any;
  @Element() el: any;
  @Prop() orientation : string;
  @State() selectedDevice = 0;

  deviceArray = [ Devices.iphoneX ,Devices.iphone8 , Devices.note8 , Devices.nexus5 , Devices.lumia920]

  componentWillUpdate(){
    window.requestAnimationFrame(()=> this._sizeFrame());
  }

  componentDidLoad() {
    this.evtListenerRotate = document.addEventListener('rotate-device' ,this.rotateDevice.bind(this));
    this.evtListenerDeviceChange = document.addEventListener('change-device' , this.changeDevice.bind(this));
  }

  componentDidUnload(){
    document.removeEventListener('rotate-device' , this.evtListenerRotate );
    document.removeEventListener('rotate-device' , this.evtListenerDeviceChange );
  }

  _sizeFrame(){
    const slotEl= this.el.querySelector('[slot=screen]');
    const iFrameEl = this.el.querySelector('iframe');

    iFrameEl.width = `${slotEl.clientWidth}px`;
    iFrameEl.height = `${slotEl.clientHeight}px`;

    console.log('SlotW' , slotEl.clientWidth)
    console.log('framW' ,   iFrameEl.width)
    console.log('SlotH' , slotEl.clientHeight)
    console.log('framH' ,   iFrameEl.height)
  }

  changeDevice(evt : any){
      if(evt.detail === 'navigate-next'){
        this.selectedDevice < 4 ? this.selectedDevice++ : this.selectedDevice = 0;
      }
      else if(evt.detail === 'navigate-before'){
        this.selectedDevice > 0 ?  this.selectedDevice-- : this.selectedDevice = 4;
      }
  }

  rotateDevice(){
    this.el.forceUpdate();
    this.el.shadowRoot.querySelector('.marvel-device').classList.toggle('landscape');
  }
  render() {
    return this.deviceArray[this.selectedDevice];
  }
}
