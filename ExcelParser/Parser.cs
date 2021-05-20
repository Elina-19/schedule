using System;
using System.Collections.Generic;
using System.IO;
using ExcelDataReader;
using Schedule.Models;

namespace ExcelParser
{
    public class ExcelParser
    {
        public void parsing()
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            // Открывает excel файл по указанному path
            string[,] cells = new string[43, 50];
            using (var stream = File.Open(@"C:\Users\HP\Downloads\timetable_2020-2021.xlsx", 
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
                    
                    //пример работы
                    Console.WriteLine(cells[2, 2]);
                    Console.WriteLine(cells[2, 13]);
                    Console.WriteLine(cells[2, 6]);
                    Console.WriteLine(cells[2, 7]);
                    Console.WriteLine(cells[6, 17]);
                    
                    //пример работы парсинга объединённой ячейки
                    if (cells[3, 3].Contains(','))
                    {
                        int id = 0;
                        List<Lesson> lessons = new List<Lesson>();
                        List<Audience> audiences = new List<Audience>();
                        string[] strLessons = cells[3, 3].Split(',');
                        for (int j = 0; j < strLessons.Length; j++)
                        {
                            var lesson = new Lesson();
                            var audience = new Audience();
                            lesson.Id = id;
                            id++;
                            lesson.Time = cells[3, 0];
                            lessons.Add(lesson);
                            audiences.Add(audience);
                        }
                        string[] str = strLessons[0].Split(' ');
                        string discipline = str[0] + " ";
                        int i = 1;
                        while (!char.IsUpper(str[i][0]))
                        {
                            discipline += str[i] + " ";
                            i++;
                        }

                        for (int j = 0; j < lessons.Count; j++)
                        {
                            lessons[j].Discipline = discipline;
                        }

                        string teacher = "";
                        string number = "";
                        for (int j = i; j < str.Length; j++)
                        {
                            if (!str[j].Equals("") && char.IsUpper(str[j][0]))
                            {
                                teacher += str[j] + " ";
                            }

                            if (!str[j].Equals("") && char.IsNumber(str[j][1]))
                            {
                                number = str[j];
                            }
                        }

                        lessons[0].Teacher = teacher;
                        audiences[0].Number = Int32.Parse(number);
                        for (int j = 1; j < strLessons.Length; j++)
                        {
                            teacher = "";
                            number = "";
                            str = strLessons[j].Split(' ');
                            for (int k = 0; k < str.Length; k++)
                            {
                                if (!str[k].Equals("") && char.IsUpper(str[k][0]))
                                {
                                    teacher += str[k] + " ";
                                }

                                if (!str[k].Equals("") && char.IsNumber(str[k][0]))
                                {
                                    number = str[k];
                                }
                            }

                            lessons[j].Teacher = teacher;
                            if (!number.Equals(""))
                            {
                                audiences[j].Number = Int32.Parse(number);   
                            }
                        }

                        for (int j = 0; j < lessons.Count; j++)
                        {
                            Console.WriteLine(lessons[j].Discipline);
                            Console.WriteLine(lessons[j].Teacher);
                            Console.WriteLine(lessons[j].Time);
                        }
                    }
                }
            }
        }
    }
}