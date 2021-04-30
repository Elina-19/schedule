using System;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Sheets.v4;
using System.IO;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace GoogleParser
{
    public class GoogleTableParser
    {
        static readonly string[] Scopes = { SheetsService.Scope.Spreadsheets };

        static readonly string AppName = "TableParserForProject";

        static readonly string SheetId = "1nY-DOpm8MOE83y7CvpQaXS0HJFALy1N8bvKHgPeXrPU";

        static readonly string sheetName = "TimeTable2021";

        static SheetsService service;

        public static void TableAccess()
        {
            GoogleCredential credential;
            using (var stream = new FileStream("table_parser.json", FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream).CreateScoped(Scopes);
            }

            service = new SheetsService(new Google.Apis.Services.BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = AppName,
            });
            var arr = ReadEntries();

            //Работа с json файлом
            WriteTojson(arr);

            //TableWriter(arr);
        }

        private static void WriteTojson(object[,] arr)
        {
            var dayNumber = 0;
            var subjects = new List<Subject>();

            //создание списака групп
            var groupsNumber = new List<string>();
            for (int i = 0; i < arr.GetLength(1); i++)
            {
                groupsNumber.Add(arr[0, i].ToString());
            }

            //обработка массива данных с GoogleTable
            for (int i = 1; i < arr.GetLength(0); i++)
            {
                if (i % 7 == 0) dayNumber = i / 7;

                for (int j = 0; j < arr.GetLength(1); j++)
                {
                    if (subjects.Count != 0 && subjects[subjects.Count - 1].AllInf == arr[i, j].ToString())
                    {
                        subjects[subjects.Count - 1].Groups = groupsNumber[j];
                    }
                    else
                    {
                        subjects.Add(new Subject(dayNumber, arr[i, j].ToString(), groupsNumber[j]));
                    }
                }
            }

            //Забись в json
            using (FileStream fs = new FileStream("schedule.json", FileMode.OpenOrCreate))
            {
                foreach (var item in subjects)
                {
                    JsonSerializer.SerializeAsync<Subject>(fs, item);
                }
                Console.WriteLine("Data has been saved to file");
            }

        }

        private static void TableWriter(object[,] array)
        {
            for (int i = 0; i < 43; i++)
            {
                for (int j = 0; j < 50; j++)
                {
                    Console.Write(array[i, j] + "|");
                }
                Console.WriteLine();
            }
        }

        private static object[,] ReadEntries()
        {
            var readRange = $"{sheetName}!B3:AY45";
            var request = service.Spreadsheets.Values.Get(SheetId, readRange);

            var response = request.Execute();
            var values = response.Values;
            var list = new object[43, 50];
            var j = 0;
            if (values != null && values.Count > 0)
            {
                foreach (var item in values)
                {
                    for (int i = 0; i < item.Count; i++)
                    {
                        if (item[i] == "")
                        {
                            list[j, i] = "------";
                        }
                        else
                        {
                            list[j, i] = item[i];
                        }
                    }
                    for (int k = item.Count; k < 50; k++)
                    {
                        list[j, k] = "------";
                    }
                    j++;
                }
                return list;

            }
            else
                throw new Exception("NO DATA");
        }
    }

}

