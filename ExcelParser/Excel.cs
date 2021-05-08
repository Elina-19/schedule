using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Schedule.Models;
using _Excel = Microsoft.Office.Interop.Excel;


namespace mysheet
{
    internal class Excel
    {
        private readonly _Excel._Application excel = new _Excel.Application();
        private string path = "";
        private _Excel.Range Rng;
        private readonly _Excel.Workbook wb;
        private readonly _Excel.Worksheet ws;

        // Открывает excel файл по указанному path и таблицу номер Sheet(>=1)
        public Excel(string path, int Sheet)
        {
            this.path = path;
            wb = excel.Workbooks.Open(path);
            ws = (_Excel.Worksheet) wb.Worksheets[Sheet];
        }

        //Прочитать ячейку
        public string readCell(int i, int j)
        {
            if (((_Excel.Range) ws.Cells[i, j]).Value2 != null)
                return (string) ((_Excel.Range) ws.Cells[i, j]).Value2;
            return "empty";
        }

        //Прочитать всю строку в столбце
        public void parseRowToJson(int row, int column = 51)
        {
            var timeForRow = readCell(row, 2);

            for (var i = 3; i <= column; i++)
            {
                // Читаем строку в ячейке и проверяем находится ли она в объединение
                var str = readCell(row, i);
                if (!str.Equals("empty"))
                {
                    Rng = (_Excel.Range) ws.Cells[row, i];
                    if (!str.Equals("empty"))
                    {
                        if ((bool) Rng.MergeCells)
                        {
                            var mergeArea = Rng.MergeArea.Count;
                            // Содержит ли данная ячейка запятые
                            //Если содержит, то создаёт массив уроков
                            if (str.Contains(','))
                            {
                                //TODO Для объединённой ячейки с несколькими уроками
                                var listLessons = new List<Lesson>();
                                string[] strings = str.Split(":");
                            }
                            else
                            {
                                //Если не содержит, то создаёт один объект урок и задает ему необходимые параметры
                                var lesson = new Lesson();
                                var strings = stringBetweenCapitalLetters(str);

                                var groupsList = new List<string>();
                                for (var a = column; a < column + mergeArea; a++) groupsList.Add(readCell(3, a));

                                if (strings[0].Equals("Элективные курсы по физической культуре и спорту в "))
                                {
                                    lesson.Discipline = "Элективные курсы по физической культуре и спорту";
                                    lesson.Teacher = "null";
                                    lesson.Groups = groupsList;
                                    var stringsForFizra = strings[2].Split(' ');
                                    lesson.Time = stringsForFizra[1];
                                    lesson.Id = 1;
                                    for (var j = 0; j < lesson.Groups.Count(); j++)
                                        Console.WriteLine(lesson.Groups.ToArray()[j]);
                                    Console.WriteLine(lesson);
                                }
                                else
                                {
                                    int id;
                                    var result = int.TryParse(strings[2], out id);
                                    lesson.Id = id;
                                    lesson.Time = timeForRow;
                                    lesson.Discipline = strings[0];
                                    lesson.Teacher = strings[1];
                                    lesson.Groups = groupsList;
                                    
                                    writeToJsonFile(lesson);

                                    //Для проверки корректности работы
                                    //for (var j = 0; j < lesson.Groups.Count(); j++)
                                    //    Console.WriteLine(lesson.Groups.ToArray()[j]);
                                    //Console.WriteLine(lesson);
                                }
                            }

                            //Пропускает следующие ячейки строки
                            i = i + mergeArea - 1;
                        }
                        //Если ячейка не объединенная
                        else
                        {
                            var lesson = new Lesson();
                            var strings = stringBetweenCapitalLetters(str);

                            if (strings[0].Equals("")) ;

                            var groupsList = new List<string>();

                            int id;
                            var result = int.TryParse(strings[2], out id);
                            lesson.Id = id;
                            lesson.Time = timeForRow;
                            lesson.Discipline = strings[0];
                            lesson.Teacher = strings[1];
                            lesson.Groups = new List<string> {str};

                            writeToJsonFile(lesson);

                            //Для проверки корректности работы
                            //for (var j = 0; j < lesson.Groups.Count(); j++)
                            //    Console.WriteLine(lesson.Groups.ToArray()[j]);
                            //Console.WriteLine(lesson);
                        }
                    }
                }
            }
        }

        //Получение 3 строк: Названия предмета, ФИО учителя, Остальное
        public string[] stringBetweenCapitalLetters(string str)
        {
            var stringWithoutBrackets = Regex.Replace(str, @"\(.*?\)", "");
            var ints = new List<int>();
            for (var i = 1; i < str.Length; i++)
                if (char.IsUpper(str[i]))
                {
                    if (ints.Count < 2)
                    {
                        ints.Add(i);
                    }
                    else
                    {
                        ints.Add(i);
                        for (var j = i; j < str.Length; j++)
                            if (str[j].Equals('.'))
                            {
                                ints.Add(j + 1);
                                break;
                            }
                            else
                            {
                                if (str[j].Equals(' '))
                                {
                                    ints.Add(j + 1);
                                    break;
                                }
                            }

                        break;
                    }
                }

            var strings = new string[3];
            strings[0] = str.Substring(0, ints[0]);
            strings[1] = str.Substring(ints[0], ints[3] - ints[0]);
            strings[2] = str.Substring(ints[3]);
            strings[2] = findId(strings[2]);

            return strings;
        }

        //Ищет в строке 3 или 4 значное число
        public string findId(string str)
        {
            str = str + " ";
            for (int i = 0; i < str.Length-3; i++)
            {
                char c1 = str[i];
                if (Char.IsDigit(c1))
                {
                    int j = i;
                    for (; j < i+4; j++)
                    {
                        char c2 = str[j];
                        if (!Char.IsDigit(c2))
                        {
                            break;
                        }
                    }

                    if (j == i + 3)
                    {
                        str = str.Substring(i, 4);
                        break;
                    }

                    j = i;
                    for (; j < i+3; j++)
                    {
                        char c2 = str[j];
                        if (!Char.IsDigit(c2))
                        {
                            break;
                        }
                    }
                    if (j == i + 2)
                    {
                        str = str.Substring(i, 3);
                        break;
                    }
                }
            }

            return str;
        }

        public void writeToJsonFile(Lesson lesson)
        {
            //TODO запись на json
        }
    }
}