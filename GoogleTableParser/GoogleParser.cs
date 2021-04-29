using System;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Sheets.v4;
using System.IO;
using System.Collections.Generic;
using Google.Apis;

namespace GoogleParser
{
    public class GoogleTableParser
    {
        // стоит сразу же выработать какой нибудь общий код стайл, которого вы все в команде будете придерживаться


        // Убрать здесь main метод
        // В проекте не может быть два main метода.
        // И выглядит так, как будто вы пытались создать проект, но его создать не получилось и создали просто папку

        // Во вторых добавьте в gitignore table_parser.json, потому что у вас там все credentials, что конечно же неправильно
        // потому что дай волю, я могу их взять и просто задудосить и тогда гугл начнется ругаться, что за фигня, и заблочит ваше приложение

        // И почитайте про асинхронные запросы. У вас сейчас все синхронно выполняется


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
            TableWriter(arr);
        }

        private static void TableWriter(object[,] array)
        {
            for (int i = 0; i < 43; i++)
            {
                for (int j = 0; j < 50; j++)
                {
                    Console.Write(array[i, j] + "|");
                    //
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
                        if (item[i] =="")
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
