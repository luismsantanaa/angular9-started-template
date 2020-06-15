import { AlertType } from '../helpers/enums.enum';

export class AlertModel {
    id: string;
    type: AlertType;
    status: number;
    statusText: string;
    message: string;
    autoClose: boolean;
    keepAfterRouteChange: boolean;
    fade: boolean;

    constructor(init?: Partial<AlertModel>) {
        Object.assign(this, init);
    }
}

