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
                            id++;
                            // Читаем строку в ячейке и проверяем находится ли она в объединение
                            var str = cells[row, column];
                            if (str == null || str.Equals(" "))
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
                                            };
                                        }
                                    }

                                    if (isHave)
                                    {
                                        if (str.Contains(":"))
                                        {
                                            string[] stringsBeforeAndAfterColon = new string[2];
                                            for (int i = 0; i < str.Length; i++)
                                            {
                                                if (str[i].Equals(':'))
                                                {
                                                    stringsBeforeAndAfterColon[0] = str.Substring(0, i);
                                                    stringsBeforeAndAfterColon[1] = str.Substring(i+1);
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
                                                if (strings[j][0].Equals(' '))
                                                {
                                                    strings[j] = strings[j].Substring(1);
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
                                                    lesson.Discipline = stringsBeforeAndAfterColon[0] + ": " + stringsWithNames[0];
                                                }
                                                else
                                                {
                                                    stringsWithNames =
                                                        stringBetweenCapitalLetters(stringsBeforeAndAfterColon[0] + strings[j]);
                                                    lesson.Discipline = stringsWithNames[0];
                                                }
                                                lesson.Id = id;
                                                lesson.Time = timeForRow;
                                                lesson.Teacher = stringsWithNames[1];
                                                lesson.Groups = groupsList;

                                                lessons.Add(lesson);
                                                addToAudienceList(stringsWithNames[2], lesson);
                                            }
                                        }
                                    }
                                    else
                                    {
                                        //Если не содержит, то создаёт один объект урок и задает ему необходимые параметры

                                        //Шоб не ломалось
                                        if (str.Contains("Проектный практикум (9н.) зач.с оц."))
                                        {
                                            var lesson = new Lesson();
                                            lesson.Discipline = "Проектный практикум";
                                            lesson.Time = timeForRow;
                                            lesson.Groups = groupsList;
                                            lesson.Teacher = "empty";
                                            lesson.Id = id;

                                            lessons.Add(lesson);
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

                                            //Шоб не ломалось
                                            if (strings[0]
                                                .Equals("Элективные курсы по физической культуре и спорту в "))
                                            {
                                                lesson.Discipline =
                                                    "Элективные курсы по физической культуре и спорту";
                                                lesson.Teacher = "empty";
                                                lesson.Groups = groupsList;
                                                lesson.Time = timeForRow;
                                                lesson.Id = id;

                                                lessons.Add(lesson);
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

                                                lessons.Add(lesson);
                                                addToAudienceList(strings[2], lesson);
                                            }
                                        }
                                    }


                                    //Пропускает следующие ячейки строки
                                    column = column + mergeArea - 1;
                                    id = id + mergeArea - 1;
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
                                    var groupsList = new List<string>();
                                    groupsList.Add(cells[0, column]);

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

                                    lessons.Add(lesson);
                                    addToAudienceList(strings[2], lesson);
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

        public void addToAudienceList(string str, Lesson lesson)
        {
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