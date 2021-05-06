import React, {Component} from 'react';
import '../DailySchedule/DailySchedule.css';
import Service from '../../httpRequest/schedule';


export class FloorSchedule extends Component {
    static displayName = FloorSchedule.name;

    state = {
        classes: []
    };

    service = new Service();

    constructor() {
        super();
        this.updateClass();
    }

    onClassLoaded = (classes) => {
        this.setState({classes});
    };

    updateClass() {
        this.service
            .getAllClasses()
            .then(this.onClassLoaded);
    }


    render() {
        const content = this.state.classes.map(
            (ourClass, index) =>
                <tr key={index}>
                    <th>{index+1}</th>
                    <th>{ourClass.time}</th>
                    <th>{ourClass.groups}</th>
                    <th>{ourClass.name}</th>
                    <th>{ourClass.teacher}</th>
                </tr>
        );

        return (
            <table className="tableR">
                <thead>
                <tr>
                    <th></th>
                    <th>Время</th>
                    <th>Группа</th>
                    <th>Название предмета</th>
                    <th>Имя преподавателя</th>
                </tr>
                </thead>
                <tbody>
                {content}
                </tbody>
            </table>
        );
    }
}



// this.state = {
//     audiences: [
//         {
//             numberOfAudience: '№ аудитории',
//             listOfClasses: [
//                 {
//                     nameOfDiscipline: 'Название предмета',
//                     teacherName: 'Имя преподавателя',
//                     groupNumber: 'Группа',
//                     time: 'Время',
//                 }
//             ]
//         },
//         {
//             numberOfAudience: '1301',
//             listOfClasses: [
//                 {
//                     nameOfDiscipline: 'Алгем',
//                     teacherName: 'Арсланов',
//                     groupNumber: '11-001',
//                     time: '8:30-10:00',
//                 },
//                 {
//                     nameOfDiscipline: 'Мат анализ',
//                     teacherName: 'Широкова',
//                     groupNumber: '11-004',
//                     time: '10:10-11:40',
//                 },
//             ]
//         },
//         {
//             numberOfAudience: '1302',
//             listOfClasses: [
//                 {
//                     nameOfDiscipline: 'Алгем',
//                     teacherName: 'Тапкин',
//                     groupNumber: '11-001',
//                     time: '8:30-10:00',
//                 },
//                 {
//                     nameOfDiscipline: 'Информатика',
//                     teacherName: 'Ференец',
//                     groupNumber: '11-906',
//                     time: '10:10-11:40',
//                 }
//             ]
//         },
//         {
//             numberOfAudience: '1303',
//             listOfClasses: [
//                 {
//                     nameOfDiscipline: 'Русский язык',
//                     teacherName: 'Гараева',
//                     groupNumber: '11-003',
//                     time: '8:30-10:00',
//                 },
//                 {
//                     nameOfDiscipline: 'Дискретная математика',
//                     teacherName: 'Зубков',
//                     groupNumber: '11-002',
//                     time: '10:10-11:40',
//                 }
//             ]
//         }
//     ]
// };