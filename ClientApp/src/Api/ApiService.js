export default class ApiService {

    _apiBase = 'https://swapi.dev/api';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    }


    async getAllClasses() {
        const res = await this.getResource(`/planets/`);
        
        return res.results.map(this._transformClass);
    }

    async getClass(id) {
        const planet = await this.getResource(`/planets/${id}/`);
        return this._transformClass(planet, id);
    }

    _transformClass(planet, id) {
        return {
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
