import Service from "./service";

export default class Schedule {
    _apiBase = 'https://localhost:5001/api';
    request = new Service();

    async getAllClasses(id) {
        return this.request.getRequest(`${this._apiBase}/audience/${id}`)
            .then(audiences => {
                return new Promise(resolve => {

                    setTimeout(() => {
                        resolve(audiences.data.lessons.map(this._transformAllClass));
                    }, 1000)
                });
            })
    }

    async getClass(id) {
        return this.request.getRequest(`${this._apiBase}/audience/${id}/`)
            .then(audiences => {
                console.log(audiences);
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(this._transformClass(audiences.data));
                    }, 1000)
                });
            })
    }

    _transformClass(audience) {
        return {
            number: audience.number,
            name: audience.currentLesson.discipline,
            groups: audience.currentLesson.groups,
            teacher:  audience.currentLesson.teacher,
            time:  audience.currentLesson.time
        };
    }
    _transformAllClass(audience) {
        return {
            name: audience.discipline,
            groups: audience.groups,
            teacher:  audience.teacher,
            time:  audience.time
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
