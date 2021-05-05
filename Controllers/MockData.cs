using System.Collections.Generic;
using System.Linq;
using Schedule.Models;

namespace Schedule.Controllers
{
    public static class MockData
    {
        public static List<Lesson> MockLessons { get; } = new List<Lesson>
        {
            new Lesson
            {
                Id = 1,
                Discipline = "Алгебра и геометрия",
                Groups = new List<string> {"11-002", "11-003", "11-004"},
                Teacher = "Кудрявцева Е.А.",
                Time = "08.30-10.00"
            },
            new Lesson
            {
                Id = 2,
                Discipline = "Иностранный язык:(английский)",
                Groups = new List<string> {"11-005", "11-006", "11-007", "11-008", "11-009", "11-010", "11-011"},
                Teacher = "Алеева Г.Х.",
                Time = "10.10-11.40"
            },
            new Lesson
            {
                Id = 3,
                Discipline = "Информатика и программирование",
                Groups = new List<string> {"11-002"},
                Teacher = "Леухин А.Д.",
                Time = "11.50-13.20"
            },
            new Lesson
            {
                Id = 4,
                Discipline = "Алгоритмы и структуры данных",
                Groups = new List<string> {"11-902", "11-903", "11-804"},
                Teacher = "Салимов Ф.И.",
                Time = "11.50-13.20"
            },
            new Lesson
            {
                Id = 5,
                Discipline = "Введение в проектную деятельность",
                Groups = new List<string> {"11-021", "11-022", "11-023"},
                Teacher = "Шигапов М.И.",
                Time = "11.50-13.20"
            },
            new Lesson
            {
                Id = 6,
                Discipline = "Русский язык и культура речи",
                Groups = new List<string> {"11-002"},
                Teacher = "Галиулина И.Р.",
                Time = "14.00-15.30"
            },
        };
        
        public static List<Audience> MockAudiences12 = new List<Audience>
        {
            new Audience
            {
                Number = 1201,
                Floor = "12",
                CurrentLesson = MockLessons[0],
                Lessons = new List<Lesson> {MockLessons[0], MockLessons[5], MockLessons[2]}
            },
            new Audience
            {
                Number = 1202,
                Floor = "12",
                CurrentLesson = MockLessons[2],
                Lessons = new List<Lesson> {MockLessons[0], MockLessons[5], MockLessons[2]}
            },
            new Audience
            {
                Number = 1203,
                Floor = "12",
                CurrentLesson = MockLessons[4],
                Lessons = new List<Lesson> {MockLessons[0], MockLessons[4], MockLessons[2]}
            },
            new Audience
            {
                Number = 1204,
                Floor = "12",
                CurrentLesson = MockLessons[5],
                Lessons = new List<Lesson> {MockLessons[1], MockLessons[5], MockLessons[2]}
            },
            new Audience
            {
                Number = 1205,
                Floor = "12",
                CurrentLesson = MockLessons[1],
                Lessons = new List<Lesson> {MockLessons[3], MockLessons[5], MockLessons[1]}
            },
        };

        public static List<Audience> MockAudiences13 = new List<Audience>
        {
            new Audience
            {
                Number = 1301,
                Floor = "13",
                CurrentLesson = MockLessons[5],
                Lessons = new List<Lesson> {MockLessons[0], MockLessons[5], MockLessons[2]}
            },
            new Audience
            {
                Number = 1302,
                Floor = "13",
                CurrentLesson = MockLessons[2],
                Lessons = new List<Lesson> {MockLessons[0], MockLessons[5], MockLessons[2]}
            },
            new Audience
            {
                Number = 1303,
                Floor = "13",
                CurrentLesson = MockLessons[3],
                Lessons = new List<Lesson> {MockLessons[0], MockLessons[3], MockLessons[2]}
            },
            new Audience
            {
                Number = 1304,
                Floor = "13",
                CurrentLesson = MockLessons[1],
                Lessons = new List<Lesson> {MockLessons[0], MockLessons[1], MockLessons[2]}
            },
            new Audience
            {
                Number = 1305,
                Floor = "13",
                CurrentLesson = MockLessons[0],
                Lessons = new List<Lesson> {MockLessons[0], MockLessons[5], MockLessons[2]}
            },
        };

        public static Floor Floor12 { get; } = new Floor
        {
            Id = 12, Audiences = MockAudiences12
        };

        public static Floor Floor13 { get; } = new Floor
        {
            Id = 13, Audiences = MockAudiences13
        };

        public static Audience FindAudience( int audienceNumber )
        {
            MockAudiences12.AddRange( MockAudiences13 );
            return MockAudiences12.FirstOrDefault( audience => audience.Number == audienceNumber );
        }
    }
}