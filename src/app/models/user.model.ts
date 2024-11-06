export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _expirationDate: Date,
    public firstName: string,
    public lastName: string,
    public address: string,
    public phone: number,
    public ordini?: any[] // Aggiungi un array di ordini
  ) { }

  get token() {
    if (!this._expirationDate || new Date() > this._expirationDate) {
      return null;
    }
    return this._token;
  }
}
