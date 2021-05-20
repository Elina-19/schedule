using System;
using System.IO;
using ExcelDataReader;

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
                    Console.WriteLine(cells[2, 2]);
                    Console.WriteLine(cells[2, 13]);
                    Console.WriteLine(cells[2, 6]);
                    Console.WriteLine(cells[2, 7]);
                    Console.WriteLine(cells[6, 17]);
                }
            }
        }
    }
}