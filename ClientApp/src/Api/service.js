import axios from 'axios';

export default class Service {

    getRequest = (address) => {
        return axios.get(address)
    };
}
