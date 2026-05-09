import { AbstractActionComponent } from '../abstract-action/abstract-action.class';

export abstract class BackButtonRoutingStrategy {
  abstract handleCanDeactivate(component: AbstractActionComponent): boolean;
}
export class CloseOpenDialogRoutingStrategy extends BackButtonRoutingStrategy {
  handleCanDeactivate(component: AbstractActionComponent) {
    if (component.isOpen()) {
      component.closeDialog();
      return false;
    }

    return true;
  }
}
export class KeepOpenDialogRoutingStrategy extends BackButtonRoutingStrategy {
  handleCanDeactivate(component: AbstractActionComponent) {
    if (component.isOpen()) {
      component.closeDialog();
    }

    return !component.isOpen();
  }
}

export const keepOpenDialogueStrategy = new KeepOpenDialogRoutingStrategy();
export const closeOpenDialogueStrategy = new CloseOpenDialogRoutingStrategy();
