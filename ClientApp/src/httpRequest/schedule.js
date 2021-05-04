import Service from "./service";

export default class Schedule {
    _apiBase = 'https://swapi.dev/api';
    request = new Service();

    async getAllClasses() {
        return this.request.getRequest(`${this._apiBase}/planets/`)
            .then(posts => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(posts.data.results.map(this._transformClass));
                    }, 1000)
                });
            })
    }

    async getClass(id) {
        return this.request.getRequest(`${this._apiBase}/planets/${id}/`)
            .then(posts => {
                console.log(posts.data)
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(this._transformClass(posts.data, id));
                    }, 1000)
                });
            })
    }

    _transformClass(planet, id) {
        return {
            numberOfClass: planet.gravity,
            time: planet.diameter,
            nameOfDiscipline: planet.name,
            groupNumber: planet.orbital_period,
            teacherName: planet.edited,
            classType: planet.gravity,
            img: id,
            idClass: planet.edited
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
