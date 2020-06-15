export class MyMarkerModel {
    public lat: number;
    public lng: number;
    public title: string = '';
    public desc: string = '';
    public labelColor: string = '';
    public labetext: string = '';

    constructor(init?: Partial<MyMarkerModel>) {
        Object.assign(this, init);
      }
}
