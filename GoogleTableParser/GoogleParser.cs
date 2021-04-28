﻿using System;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Sheets.v4;
using System.IO;
using System.Collections.Generic;

namespace GoogleParser
{
    class Program
    {
        static readonly string[] Scopes = { SheetsService.Scope.Spreadsheets };

        static readonly string AppName = "TableParserForProject";

        static readonly string SheetId = "1nY-DOpm8MOE83y7CvpQaXS0HJFALy1N8bvKHgPeXrPU";

        static readonly string sheetName = "TimeTable2021";

        static SheetsService service;

        static void Main(string[] args)
        {
            

            GoogleCredential credential;
            using (var stream =new FileStream("table_parser.json", FileMode.Open,FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream).CreateScoped(Scopes);
            }

            service = new SheetsService(new Google.Apis.Services.BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = AppName,
            });

            /// Main Array for Data
            var mainArray=ReadEntries();
            TableWriter(mainArray);

        }

        // метод для вывода всей таблицы на консоль (позже допилить до распределителя данных) 
        static void TableWriter(object[,] array)
        {
            for (int i=0;i<43;i++)
            {
                for (int j=0;j<50;j++)
                {
                    Console.Write(array[i, j] + "|");
                    //
                }
                Console.WriteLine();
            }
        }
        
        static object[,] ReadEntries()
        {
            
            var readRange = $"{sheetName}!B3:AY45";
            var request = service.Spreadsheets.Values.Get(SheetId, readRange);

            var response = request.Execute();
            var values = response.Values;
            var list = new object[43,50];
            var j = 0;
            if (values != null && values.Count > 0)
            {
                foreach (var item in values)
                {
                    for (int i=0;i<item.Count;i++)
                    {
                        if (list[j, i] == "")
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
