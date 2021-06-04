import Service from "./service";

export default class Schedule {
    _apiBase = 'https://localhost:5001/api';
    request = new Service();
    
    async getAudience(id) {
        return this.request.getRequest(`${this._apiBase}/audience/${id}/`)
            .then(audiences => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(audiences.data);
                    }, 1000)
                });
            })
    }
    
    async getFloor(id) {
        return this.request.getRequest(`${this._apiBase}/floor/${id}/`)
            .then(floor => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(floor.data);
                    }, 1000)
                });
            })
    }
  
}
