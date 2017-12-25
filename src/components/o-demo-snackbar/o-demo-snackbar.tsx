import { Component, Listen, Prop, Element } from '@stencil/core';
import { MDCSnackbar } from '@material/snackbar';

@Component({
  tag: 'o-demo-snackbar',
  styleUrl: 'o-demo-snackbar.scss',
  shadow: true
})
export class DemoSnackbarComponent {
  public snackbarToast: any;

  @Element() el: HTMLElement;
  @Prop() events: any;

  componentDidLoad() {
    const rootEl = this.el.shadowRoot.querySelector('.mdc-snackbar');
    this.snackbarToast = new MDCSnackbar(rootEl);
    this.snackbarToast.dismissesOnAction = true;

    // Compute events if there is any event add eventListeners
    if (this._computeEvents()) {
      this._computeEvents().forEach(el => {
        window.addEventListener(
          el,
          evt => {
            const payload: object = {
              message: `${evt.type} : ${JSON.stringify(evt.detail)} `,
              actionText: 'Close',
              multiline: false,
              actionOnBottom: true,
              actionHandler: () => false
            };
            this.snackbarToast.show(payload);
          },
          false
        );
      });
    }
  }

  componentDidUnload() {
    this.snackbarToast.destroy();
    this._computeEvents().forEach(el => {
      window.removeEventListener(el, () => {}, true);
    });
  }

  _destroyEvents() {}

  _computeEvents() {
    if (this.events !== '' && this.events.split(',').length > 0) {
      return this.events.split(',');
    } else {
      return false;
    }
  }

  render() {
    return (
      <div
        class="mdc-snackbar mdc-snackbar--align-start"
        aria-live="assertive"
        aria-atomic="true"
        aria-hidden="true"
      >
        <div class="mdc-snackbar__text" />
        <div class="mdc-snackbar__action-wrapper">
          <button type="button" class="mdc-snackbar__action-button" />
        </div>
      </div>
    );
  }
}
