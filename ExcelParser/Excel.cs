using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Schedule.Models;
using _Excel = Microsoft.Office.Interop.Excel;


namespace ExcelParser
{
    internal class Excel
    {
        private static int id = 0;
        public readonly _Excel._Application excel = new _Excel.Application();
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
            return " ";
        }

        //Прочитать всю строку в таблице
        public void readRow(int row, int column = 51)
        {
            var timeForRow = readCell(row, 2);

            for (var i = 3; i <= column; i++)
            {
                id++;
                // Читаем строку в ячейке и проверяем находится ли она в объединение
                var str = readCell(row, i);
                if (str.Equals(" "))
                {
                    continue;
                }
                else
                {
                    Rng = (_Excel.Range) ws.Cells[row, i];
                    if ((bool) Rng.MergeCells)
                    {
                        var mergeArea = Rng.MergeArea.Count;
                        // Содержит ли данная ячейка запятые
                        //Если содержит, то создаёт массив уроков
                        if (str.Contains(','))
                        {
                            Console.WriteLine("Не могу");
                        }
                        else
                        {
                            //Если не содержит, то создаёт один объект урок и задает ему необходимые параметры
                            if (str.Contains("Проектный практикум"))
                            {
                                Console.WriteLine("Уходи");
                                i = i + mergeArea - 1;
                                id = id + mergeArea - 1;
                                continue;
                            }
                            else
                            {
                                var lesson = new Lesson();
                                string strBefore = "";
                                bool isContain = false;
                                if (str.Contains(':'))
                                {
                                    isContain = true;
                                    string[] strs = str.Split(':');
                                    strBefore = strs[0];
                                    if (strs[1][0].Equals(' '))
                                    {
                                        str = strs[1].Substring(1);
                                    }
                                    else
                                    {
                                        str = strs[1];
                                    }
                                }

                                var strings = stringBetweenCapitalLetters(str);

                                var groupsList = new List<string>();
                                for (var a = i; a < i + mergeArea; a++) groupsList.Add(readCell(3, a));
                                if (strings[0].Equals("Элективные курсы по физической культуре и спорту в "))
                                {
                                    lesson.Discipline = "Элективные курсы по физической культуре и спорту";
                                    lesson.Teacher = "null";
                                    lesson.Groups = groupsList;
                                    var stringsForFizra = strings[2].Split(' ');
                                    lesson.Time = stringsForFizra[1];
                                    lesson.Id = id;
                                    for (var j = 0; j < lesson.Groups.Count(); j++)
                                        Console.WriteLine(lesson.Groups.ToArray()[j]);
                                    Console.WriteLine(lesson);
                                }
                                else
                                {
                                    lesson.Id = id;
                                    lesson.Time = timeForRow;
                                    if (isContain)
                                    {
                                        lesson.Discipline = strBefore + " " + strings[0];
                                    }
                                    else
                                    {
                                        lesson.Discipline = strings[0];
                                    }

                                    lesson.Teacher = strings[1];
                                    lesson.Groups = groupsList;

                                    //Для проверки корректности работы
                                    for (var j = 0; j < lesson.Groups.Count(); j++)
                                        Console.WriteLine(lesson.Groups.ToArray()[j]);
                                    Console.WriteLine(lesson);
                                }
                            }
                        }


                        //Пропускает следующие ячейки строки
                        i = i + mergeArea - 1;
                        id = id + mergeArea - 1;
                    }
                    //Если ячейка не объединенная
                    else
                    {
                        string strBefore = "";
                        bool isContain = false;
                        if (str.Contains(':'))
                        {
                            isContain = true;
                            string[] strs = str.Split(':');
                            strBefore = strs[0];
                            if (strs[1][0].Equals(' '))
                            {
                                str = strs[1].Substring(1);
                            }
                            else
                            {
                                str = strs[1];
                            }
                        }

                        var lesson = new Lesson();
                        var strings = stringBetweenCapitalLetters(str);
                        var groupsList = new List<string>();
                        groupsList.Add(readCell(3, i));

                        lesson.Id = id;
                        lesson.Time = timeForRow;
                        if (isContain)
                        {
                            lesson.Discipline = strBefore + " " + strings[0];
                        }
                        else
                        {
                            lesson.Discipline = strings[0];
                        }

                        lesson.Teacher = strings[1];
                        lesson.Groups = groupsList;

                        //Для проверки корректности работы
                        for (var j = 0; j < lesson.Groups.Count(); j++)
                            Console.WriteLine(lesson.Groups.ToArray()[j]);
                        Console.WriteLine(lesson);
                    }
                }
            }
        }

        //Получение 3 строк: Названия предмета, ФИО учителя, Остальное
        public string[] stringBetweenCapitalLetters(string str)
        {
            //Убрать текст между скобками
            str = Regex.Replace(str, @"\(.*?\)", "");
            List<int> ints = new List<int>();
            bool isHavePatronymic = false;
            bool isHaveName = false;

            for (var i = 1; i < str.Length; i++)
            {
                if (char.IsUpper(str[i]))
                {
                    if (ints.Count < 1)
                    {
                        ints.Add(i);
                    }
                    else
                    {
                        ints.Add(i);
                        isHaveName = true;
                        if (str[i + 1].Equals('.'))
                        {
                            if (char.IsUpper(str[i + 2]))
                            {
                                ints.Add(i + 2);
                                isHavePatronymic = true;
                                ints.Add(i + 4);
                            }
                            else
                            {
                                ints.Add(i + 1);
                                break;
                            }
                        }
                        else
                        {
                            isHavePatronymic = true;
                            for (var j = i; j < str.Length; j++)
                                if (char.IsUpper(str[j]) && ints.Count < 3)
                                {
                                    ints.Add(j);
                                    for (int k = j; k < str.Length; k++)
                                    {
                                        if (str[k].Equals(' '))
                                        {
                                            ints.Add(k);
                                        }
                                    }
                                }

                            break;
                        }
                    }
                }

                if (ints.Count == 1 && str[i].Equals('.'))
                {
                    ints.Add(i - 1);
                    break;
                }

                if (ints.Count == 1 && char.IsDigit(str[i]))
                {
                    ints.Add(i - 1);
                    break;
                }
            }

            var strings = new string[3];

            if (isHaveName)
            {
                if (isHavePatronymic)
                {
                    strings[0] = str.Substring(0, ints[0]);
                    strings[1] = str.Substring(ints[0], ints[3] - ints[0]);
                    strings[2] = str.Substring(ints[3]);
                }
                else
                {
                    strings[0] = str.Substring(0, ints[0]);
                    strings[1] = str.Substring(ints[0], ints[2] - ints[0] + 1);
                    strings[2] = str.Substring(ints[2]);
                }
            }
            else
            {
                strings[0] = str.Substring(0, ints[0]);
                strings[1] = str.Substring(ints[0], ints[1] - ints[0]);
                strings[2] = str.Substring(ints[1]);
            }

            return strings;
        }
    }
}