using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using ExcelDataReader;
using Schedule.Models;

namespace ExcelParser
{
    public class Parser
    {
        private static int id = 0;
        static List<Lesson> lessons = new List<Lesson>();
        static List<Floor> floors = new List<Floor>();
        static List<Audience> audiences = new List<Audience>();

        public void parsing(string path)
            {
                System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
                // Открывает excel файл по указаному path
                string[,] cells = new string[43, 50];
                using (var stream = File.Open(@path,
                    FileMode.Open, FileAccess.Read))
                {
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        // Прочитывание ячеек и запись в двумерный массив
                        for (int i = 0; i < 2; i++)
                        {
                            reader.Read();
                        }

                        for (int i = 0; i < 43; i++)
                        {
                            reader.Read();
                            for (int j = 1; j < 51; j++)
                            {
                                cells[i, j - 1] = reader.GetString(j);
                            }
                        }

                        // Решение проблемы с объединёнными ячейками
                        CellRange[] cellRange = reader.MergeCells;
                        for (int i = 0; i < cellRange.Length; i++)
                        {
                            if (cellRange[i].FromRow < 2 || cellRange[i].FromRow > 44 ||
                                cellRange[i].FromColumn < 1 || cellRange[i].FromColumn > 50)
                            {
                                continue;
                            }

                            int row = cellRange[i].FromRow - 2;
                            for (int j = cellRange[i].FromColumn - 1; j < cellRange[i].ToColumn; j++)
                            {
                                cells[row, j] = cells[row, cellRange[i].FromColumn - 1];
                            }
                        }


                        //Чтение таблицы
                        for (int row = 1; row < 43; row++)
                        {
                            var timeForRow = cells[row, 0];

                            for (int column = 1; column < 50; column++)
                            {
                                // Читаем строку в ячейке и проверяем находится ли она в объединение
                                var str = cells[row, column];

                                var isHav = false;
                                if (str != null)
                                {
                                    var regex = new Regex(@"\d{4}");
                                    isHav = regex.IsMatch(str);
                                    if (!isHav)
                                    {
                                        regex = new Regex(@"\d{3}");
                                        isHav = regex.IsMatch(str);
                                    }
                                }

                                if (isHav)
                                {
                                    string strrrrrr = str.ToLower();
                                    isHav = !strrrrrr.Contains("уникс");
                                }

                                if (str == null || str.Equals(" ") || !isHav)
                                {
                                    continue;
                                }
                                else
                                {
                                    if (column < 49 && cells[row, column].Equals(cells[row, column + 1]))
                                    {
                                        int z = 1;
                                        int mergeArea = 2;
                                        while (column + z < 49 &&
                                               cells[row, column + z].Equals(cells[row, column + z + 1]))
                                        {
                                            mergeArea++;
                                            z++;
                                        }

                                        var groupsList = new List<string>();
                                        for (int w = 0; w < mergeArea; w++)
                                        {
                                            groupsList.Add(cells[0, column + w]);
                                        }

                                        // Содержит ли данная ячейка запятые
                                        bool isHave = false;

                                        if (str.Contains(","))
                                        {
                                            string[] strsss = str.Split(',');
                                            for (int j = 0; j < strsss[1].Length; j++)
                                            {
                                                if (char.IsUpper(strsss[1][j]))
                                                {
                                                    isHave = true;
                                                    break;
                                                }
                                            }
                                        }

                                        if (isHave && !str.Contains("сети"))
                                        {
                                            if (str.Contains(":"))
                                            {
                                                string[] stringsBeforeAndAfterColon = new string[2];
                                                for (int i = 0; i < str.Length; i++)
                                                {
                                                    if (str[i].Equals(':'))
                                                    {
                                                        stringsBeforeAndAfterColon[0] = str.Substring(0, i);
                                                        stringsBeforeAndAfterColon[1] = str.Substring(i + 1);
                                                        break;
                                                    }
                                                }

                                                if (stringsBeforeAndAfterColon[1][0].Equals(' '))
                                                {
                                                    stringsBeforeAndAfterColon[1] =
                                                        stringsBeforeAndAfterColon[1].Substring(1);
                                                }

                                                string[] strings = stringsBeforeAndAfterColon[1].Split(',');
                                                for (int j = 0; j < strings.Length; j++)
                                                {
                                                    if (strings[j].Equals("    "))
                                                    {
                                                        continue;
                                                    }

                                                    strings[j] = Regex.Replace(strings[j], @"\(.*?\)", "");

                                                    while (strings[j][0].Equals(' '))
                                                    {
                                                        strings[j] = strings[j].Substring(1);
                                                    }

                                                    if (strings[j].Contains("  Дисциплина по выбору:"))
                                                    {
                                                        string[] tempStrings = strings[j]
                                                            .Split("  Дисциплина по выбору:");
                                                        j--;
                                                        strings[j] = tempStrings[0];
                                                        strings[j + 1] = tempStrings[1];
                                                    }
                                                    if (strings[j].Contains("  Дисциплина по выбору :"))
                                                    {
                                                        string[] tempStrings = strings[j]
                                                            .Split("  Дисциплина по выбору :");
                                                        j--;
                                                        strings[j] = tempStrings[0];
                                                        strings[j + 1] = tempStrings[1];
                                                    }
                                                    if (strings[j].Contains("-Кири"))
                                                    {
                                                        j--;
                                                        strings[j] = strings[j + 1];
                                                        strings[j + 1] = strings[j]
                                                            .Split("-")[1];
                                                    }
                                                    if (strings[j][0].Equals('п') && strings[j][1].Equals('о'))
                                                    {
                                                        strings[j] = strings[j].Remove(0, 14).TrimStart();
                                                    }
                                                    if (strings[j].Contains("   Программирование на С++"))
                                                    {
                                                        string[] tempStrings = strings[j]
                                                            .Split("   Программирование на С++");
                                                        j--;
                                                        strings[j] = tempStrings[0];
                                                        strings[j + 1] = "Программирование на С++" + tempStrings[1];
                                                    }
                                                    if (strings[j].Contains("   Проектирование"))
                                                    {
                                                        string[] tempStrings = strings[j]
                                                            .Split("   Проектирование");
                                                        j--;
                                                        strings[j] = tempStrings[0];
                                                        strings[j + 1] = "Проектирование" + tempStrings[1];
                                                    }

                                                    Lesson lesson = new Lesson();
                                                    bool isHaveNameOfDisc = false;
                                                    for (int i = 1; i < strings[j].Length; i++)
                                                    {
                                                        if (char.IsUpper(strings[j][i]))
                                                        {
                                                            if (strings[j][i + 1].Equals('.'))
                                                            {
                                                                break;
                                                            }

                                                            isHaveNameOfDisc = true;
                                                            break;
                                                        }
                                                    }

                                                    string[] stringsWithNames;
                                                    if (isHaveNameOfDisc)
                                                    {
                                                        stringsWithNames =
                                                            stringBetweenCapitalLetters(strings[j]);
                                                        if (stringsWithNames[0].Contains("Дисциплина"))
                                                        {
                                                            stringsWithNames[0] = stringsWithNames[0].Split(':')[1];
                                                        }
                                                        lesson.Discipline = stringsBeforeAndAfterColon[0] + ": " +
                                                                            stringsWithNames[0];
                                                    }
                                                    else
                                                    {
                                                        if (stringsBeforeAndAfterColon[0].Contains("Дисциплина"))
                                                        {
                                                            stringsWithNames =
                                                                stringBetweenCapitalLetters(stringsBeforeAndAfterColon[0] +
                                                                    strings[j]);
                                                            lesson.Discipline = lessons[lessons.Count - 1].Discipline;
                                                        }
                                                        else
                                                        {
                                                            stringsWithNames =
                                                                stringBetweenCapitalLetters(stringsBeforeAndAfterColon[0] +
                                                                    strings[j]);
                                                            lesson.Discipline = stringsWithNames[0];   
                                                        }
                                                    }

                                                    lesson.Time = timeForRow;
                                                    lesson.Teacher = stringsWithNames[1];
                                                    lesson.Groups = groupsList;

                                                    lessons.Add(lesson);
                                                    addToAudienceList(stringsWithNames[2], lesson, row);
                                                }
                                            }
                                            else
                                            {
                                                str = Regex.Replace(str, @"\(.*?\)", "");
                                                string[] strings = str.Split(',');
                                                int ptr = 0;
                                                for (int i = 1; i < strings[0].Length; i++)
                                                {
                                                    if (char.IsUpper(strings[0][i]))
                                                    {
                                                        ptr = i;
                                                        break;
                                                    }
                                                }

                                                string discipline = strings[0].Remove(ptr).Trim();
                                                string teacher = "";
                                                strings[0] = strings[0].Remove(0, ptr);
                                                for (int i = 0; i < strings.Length; i++)
                                                {
                                                    strings[i] = Regex.Replace(strings[i], @"\(.*?\)", "");
                                                    int countDots = 0;
                                                    for (int j = 0; j < strings[i].Length; j++)
                                                    {
                                                        if (strings[i].Contains("гр.1"))
                                                        {
                                                            for (int k = 0; k < strings[i].Length; k++)
                                                            {
                                                                if (strings[i][k].Equals('1'))
                                                                {
                                                                    strings[i] = strings[i]
                                                                        .Remove(0, k + 6).TrimStart();
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                        if (strings[i][j].Equals('.'))
                                                        {
                                                            countDots++;
                                                        }

                                                        if (countDots == 2 && !lessons[lessons.Count - 1].Teacher
                                                            .Equals(strings[i].Remove(j + 1).Trim()))
                                                        {
                                                            if (j + 1 < strings[i].Length)
                                                            {
                                                                teacher = strings[i].Remove(j).Trim();
                                                            }
                                                            else
                                                            {
                                                                teacher = strings[i].Trim();
                                                            }

                                                            if (teacher[0].Equals(' '))
                                                            {
                                                                teacher = teacher.Remove(0, 1);
                                                            }

                                                            break;
                                                        }
                                                    }

                                                    if (countDots < 2)
                                                    {
                                                        continue;
                                                    }

                                                    Lesson lesson = new Lesson();
                                                    id++;
                                                    lesson.Id = id;
                                                    lesson.Discipline = discipline;
                                                    lesson.Time = timeForRow;
                                                    lesson.Teacher = teacher;
                                                    lesson.Groups = groupsList;
                                                    lessons.Add(lesson);
                                                }
                                            }
                                        }
                                        else
                                        {
                                            //Если не содержит, то создаёт один объект урок и задает ему необходимые параметры
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

                                            lessons.Add(lesson);
                                            addToAudienceList(strings[2], lesson, row);
                                            
                                            if (str.Contains("  Введение"))
                                            {
                                                var newLesson = new Lesson();
                                                str = "Введение" + str.Split(" Введение")[1];
                                                strings = stringBetweenCapitalLetters(str);

                                                newLesson.Time = timeForRow;
                                                if (isContain)
                                                {
                                                    newLesson.Discipline = strBefore + " " + strings[0];
                                                }
                                                else
                                                {
                                                    newLesson.Discipline = strings[0];
                                                }

                                                newLesson.Teacher = strings[1];
                                                newLesson.Groups = groupsList;

                                                lessons.Add(newLesson);
                                                addToAudienceList(strings[2], newLesson, row);
                                            }
                                        }


                                        //Пропускает следующие ячейки строки
                                        column = column + mergeArea - 1;
                                    }

                                    //Если ячейка не объединенная
                                    else
                                    {
                                        string strBefore = "";
                                        bool isContain = false;
                                        if (str.Contains(":"))
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
                                        if (strings[0].Contains("1308"))
                                        {
                                            strings[0] = strings[0].Remove(strings[0].Length - 7);
                                        }
                                        var groupsList = new List<string>();
                                        groupsList.Add(cells[0, column]);

                                        lesson.Time = timeForRow;
                                        if (isContain)
                                        {
                                            lesson.Discipline = strBefore + " " + strings[0];
                                        }
                                        else
                                        {
                                            lesson.Discipline = strings[0];
                                        }

                                        if (strings[1].Contains("Св"))
                                        {
                                            strings[1] = strings[1].Trim().Remove(strings[1].Length - 1);
                                        }
                                        lesson.Teacher = strings[1];
                                        lesson.Groups = groupsList;

                                        lessons.Add(lesson);
                                        addToAudienceList(strings[2], lesson, row);
                                    }
                                }
                            }
                        }
                    }
                }

                for (int i = 0; i < audiences.Count; i++)
                {
                    bool isHaveFloor = false;
                    for (int j = 0; j < floors.Count; j++)
                    {
                        if (audiences[i].Floor.Equals(floors[j].Id.ToString()))
                        {
                            isHaveFloor = true;
                            break;
                        }
                    }

                    if (!isHaveFloor)
                    {
                        Floor floor = new Floor();
                        floor.Id = int.Parse(audiences[i].Floor);
                        var auds = new List<Audience>();
                        for (int j = 0; j < audiences.Count; j++)
                        {
                            if (audiences[j].Floor.Equals(audiences[i].Floor))
                            {
                                auds.Add(audiences[j]);
                            }
                        }

                        floor.Audiences = auds;
                        floors.Add(floor);
                    }
                }
            }

            public void addToAudienceList(string str, Lesson lesson, int row)
            {
                DayOfWeek dayOfWeek = DayOfWeek.Sunday;
                if (row >= 1 && row < 8)
                {
                    dayOfWeek = DayOfWeek.Monday;
                }

                if (row >= 8 && row < 15)
                {
                    dayOfWeek = DayOfWeek.Tuesday;
                }

                if (row >= 15 && row < 22)
                {
                    dayOfWeek = DayOfWeek.Wednesday;
                }

                if (row >= 22 && row < 29)
                {
                    dayOfWeek = DayOfWeek.Thursday;
                }

                if (row >= 29 && row < 36)
                {
                    dayOfWeek = DayOfWeek.Friday;
                }

                if (row >= 36 && row < 43)
                {
                    dayOfWeek = DayOfWeek.Saturday;
                }

                id++;
                lesson.Id = id;
                Regex regex = new Regex(@"\d{4}");
                if (regex.IsMatch(str))
                {
                    Match result = regex.Match(str);
                    int number = int.Parse(result.ToString());
                    bool isHave = false;
                    for (int i = 0; i < audiences.Count; i++)
                    {
                        if (audiences[i].Number.Equals(number))
                        {
                            var lessonsList = audiences[i].Lessons;
                            lessonsList.Add(lesson);
                            isHave = true;
                            if (isCurrentLesson(lesson.Time, dayOfWeek))
                            {
                                audiences[i].CurrentLesson = lesson;
                            }

                            break;
                        }
                    }

                    if (!isHave)
                    {
                        var audience = new Audience();
                        audience.Number = number;
                        audience.Floor = (number / 100).ToString();
                        var lessonList = new List<Lesson>();
                        lessonList.Add(lesson);
                        audience.Lessons = lessonList;
                        if (isCurrentLesson(lesson.Time, dayOfWeek))
                        {
                            audience.CurrentLesson = lesson;
                        }

                        audiences.Add(audience);
                    }
                }
                else
                {
                    regex = new Regex(@"\d{3}");
                    if (regex.IsMatch(str))
                    {
                        Match result = regex.Match(str);
                        int number = int.Parse(result.ToString());
                        bool isHave = false;
                        for (int i = 0; i < audiences.Count; i++)
                        {
                            if (audiences[i].Number.Equals(number))
                            {
                                var lessonsList = audiences[i].Lessons;
                                lessonsList.Add(lesson);
                                isHave = true;
                                if (isCurrentLesson(lesson.Time, dayOfWeek))
                                {
                                    audiences[i].CurrentLesson = lesson;
                                }

                                break;
                            }
                        }

                        if (!isHave)
                        {
                            var audience = new Audience();
                            audience.Number = number;
                            audience.Floor = (number / 100).ToString();
                            var lessonList = new List<Lesson>();
                            lessonList.Add(lesson);
                            audience.Lessons = lessonList;
                            if (isCurrentLesson(lesson.Time, dayOfWeek))
                            {
                                audience.CurrentLesson = lesson;
                            }

                            audiences.Add(audience);
                        }
                    }
                }
            }

            //Получение 3 строк: Названия предмета, ФИО учителя, Остальное
            public string[] stringBetweenCapitalLetters(string str)
            {
                //Убрать текст между скобками
                str = Regex.Replace(str, @"\(.*?\)", "");
                str = str.TrimStart();
                List<int> ints = new List<int>();
                bool isHavePatronymic = false;
                bool isHaveName = false;

                for (var i = 1; i < str.Length; i++)
                {
                    if (str[i].Equals('J'))
                    {
                        ints.Clear();
                        continue;
                    }
                    if (char.IsUpper(str[i]))
                    {
                        if (ints.Count < 1)
                        {
                            if (!str[i + 1].Equals('+'))
                            {
                                ints.Add(i);
                            }
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
                                            if (str[k].Equals(' ') && k < str.Length - 1 && !char.IsUpper(str[k + 1]))
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
                        ints.Add(i);
                        break;
                    }
                }

                var strings = new string[3];

                if (isHaveName)
                {
                    if (isHavePatronymic)
                    {
                        strings[0] = str.Substring(0, ints[0]).Trim();
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

            public Boolean isCurrentLesson(string str, DayOfWeek dayOfWeek)
            {
                DateTime dateTime = DateTime.Now;
                double c = Int32.Parse(dateTime.Hour.ToString()) + (double) int.Parse(dateTime.Minute.ToString()) / 100;
                double a = Int32.Parse(str.Substring(0, 2)) + (double) Int32.Parse(str.Substring(3, 2)) / 100;
                double b = Int32.Parse(str.Substring(6, 2)) + (double) Int32.Parse(str.Substring(9, 2)) / 100;
                if (c < b && c > a && dateTime.DayOfWeek.Equals(dayOfWeek))
                {
                    return true;
                }

                return false;
            }
            
            public void printLessons()
            {
                for (int i = 0; i < lessons.Count; i++)
                {
                    Console.WriteLine("id = " + lessons[i].Id);
                    Console.WriteLine("discipline = " + lessons[i].Discipline);
                    Console.WriteLine("teacher = " + lessons[i].Teacher);
                    Console.WriteLine("time = " + lessons[i].Time);
                    Console.WriteLine("___________");
                }
            }
    }
}