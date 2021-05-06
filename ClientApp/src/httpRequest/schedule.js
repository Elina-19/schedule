import Service from "./service";

export default class Schedule {
    _apiBase = 'https://swapi.dev/api';
    request = new Service();

    async getAllClasses() {
        return this.request.getRequest(`${this._apiBase}/planets/`)
            .then(audiences => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(audiences.data.results.map(this._transformClass));
                    }, 1000)
                });
            })
    }

    async getClass(id) {
        return this.request.getRequest(`${this._apiBase}/planets/${id}/`)
            .then(audiences => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(this._transformClass(audiences.data));
                    }, 1000)
                });
            })
    }

    _transformClass(planet) {
        return {
            number: planet.gravity,
            name: planet.name,
            groups: planet.orbital_period,
            teacher:  planet.edited,
            time:  planet.diameter
        };
    }

    _extractClass(href) {
        try {
            const idRegExp = /\/([0-9]*)\/$/;
            return href.match(idRegExp)[1];
        } catch (error) {
            return 2;
        }

    }
}
